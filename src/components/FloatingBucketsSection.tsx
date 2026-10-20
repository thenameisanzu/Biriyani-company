"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Award, Flame, Sparkles, Zap, UtensilsCrossed, ArrowDown, Play, Pause, RotateCcw } from "lucide-react";

const TOTAL_FRAMES = 28;

export default function FloatingBucketsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [playMode, setPlayMode] = useState<"scroll" | "video">("scroll");
  const [autoFrame, setAutoFrame] = useState(0);

  // Track scroll progress through this pinned 220vh section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  // Preload all 28 HD explosion frames for instant scroll scrubbing
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      const numStr = i.toString().padStart(2, "0");
      img.src = `/images/burst-frames/frame_${numStr}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= TOTAL_FRAMES) {
          imagesRef.current = loadedImages;
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  // Draw frame on canvas based on smooth scroll or auto play
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || imagesRef.current.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = (progressVal: number) => {
      // Map progress (0.05 to 0.85) to frame 0 to 27
      const normalized = Math.min(Math.max((progressVal - 0.05) / 0.8, 0), 1);
      const frameIndex = Math.min(Math.floor(normalized * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
      const img = imagesRef.current[frameIndex];

      if (img && img.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Aspect ratio cover calculation
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShiftX = (canvas.width - img.width * ratio) / 2;
        const centerShiftY = (canvas.height - img.height * ratio) / 2;

        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShiftX,
          centerShiftY,
          img.width * ratio,
          img.height * ratio
        );
      }
    };

    if (playMode === "scroll") {
      const unsubscribe = smoothProgress.on("change", (latest) => {
        render(latest);
      });
      render(smoothProgress.get());
      return () => unsubscribe();
    } else {
      // In video auto-loop mode
      render(autoFrame / (TOTAL_FRAMES - 1));
    }
  }, [imagesLoaded, playMode, autoFrame, smoothProgress]);

  // Handle Video Auto Loop Mode Timer
  useEffect(() => {
    if (playMode !== "video") return;
    const interval = setInterval(() => {
      setAutoFrame((prev) => (prev + 1) % TOTAL_FRAMES);
    }, 65);
    return () => clearInterval(interval);
  }, [playMode]);

  // Framer Motion transforms tied to scroll progress
  const shockwaveScale = useTransform(smoothProgress, [0.15, 0.45], [0.2, 2.8]);
  const shockwaveOpacity = useTransform(smoothProgress, [0.15, 0.28, 0.48], [0, 0.85, 0]);

  const badgesOpacity = useTransform(smoothProgress, [0.25, 0.45], [0, 1]);
  const badgesY = useTransform(smoothProgress, [0.25, 0.45], [25, 0]);

  const promptOpacity = useTransform(smoothProgress, [0, 0.18], [1, 0]);

  const metricsOpacity = useTransform(smoothProgress, [0.65, 0.85], [0.3, 1]);
  const metricsY = useTransform(smoothProgress, [0.65, 0.85], [30, 0]);

  const metrics = [
    { num: "1,00,000+", label: "Black Tubs Delivered", desc: "Across Kottayam town & beyond" },
    { num: "4.9 ★", label: "Swiggy & Zomato Rating", desc: "Over 25,000+ happy foodies" },
    { num: "36", label: "Secret Heritage Spices", desc: "Hand-pounded Malabar aromatics" },
    { num: "28 MINS", label: "Express Doorstep Delivery", desc: "Direct from Kanjikuzhi kitchen" },
  ];

  return (
    <section
      ref={containerRef}
      id="best-in-kottayam"
      style={{
        position: "relative",
        height: "230vh", // Scroll track for scrollytelling explosion
        background: "#0D0A0A",
      }}
    >
      {/* Sticky Fullscreen Scrollytelling Stage */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "36px 32px 40px",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        {/* Background Ambient Glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(1200px, 95vw)",
            height: "600px",
            background: "radial-gradient(circle, rgba(255, 85, 0, 0.28) 0%, rgba(255, 117, 23, 0.1) 45%, rgba(0, 0, 0, 0) 70%)",
            filter: "blur(70px)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* ----------------------------------------------------------- */}
        {/* TOP BAR: Header Proclamation & Mode Switcher */}
        {/* ----------------------------------------------------------- */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "16px",
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "100px",
                background: "rgba(255, 85, 0, 0.16)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 85, 0, 0.35)",
                color: "#FF7517",
                fontSize: "0.78rem",
                fontWeight: 900,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              <Award size={14} color="#FF7517" />
              <span>KOTTAYAM&apos;S CULINARY PRIDE • ESTD 2025</span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4.6vw, 3.8rem)",
                fontWeight: 950,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                margin: 0,
                textShadow: "0 8px 30px rgba(0, 0, 0, 0.6)",
              }}
            >
              BEST BIRYANI IN KOTTAYAM.
            </h2>
          </div>

          {/* Interactive Play Mode Toggle: Scroll Scrub vs Looping Video */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(26, 23, 23, 0.85)",
              backdropFilter: "blur(14px)",
              padding: "6px 12px",
              borderRadius: "100px",
              border: "1px solid rgba(255, 85, 0, 0.3)",
            }}
          >
            <button
              onClick={() => setPlayMode("scroll")}
              style={{
                padding: "8px 16px",
                borderRadius: "100px",
                background: playMode === "scroll" ? "#FF5500" : "transparent",
                color: playMode === "scroll" ? "#FFFFFF" : "rgba(255, 255, 255, 0.7)",
                fontSize: "0.78rem",
                fontWeight: 900,
                fontFamily: "var(--font-display)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Scroll Scrub
            </button>

            <button
              onClick={() => setPlayMode("video")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "100px",
                background: playMode === "video" ? "#FF5500" : "transparent",
                color: playMode === "video" ? "#FFFFFF" : "rgba(255, 255, 255, 0.7)",
                fontSize: "0.78rem",
                fontWeight: 900,
                fontFamily: "var(--font-display)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <Play size={12} fill="currentColor" />
              <span>Video Loop</span>
            </button>
          </div>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* CENTER STAGE: Dynamic Canvas Video Burst & Shockwave Ring */}
        {/* ----------------------------------------------------------- */}
        <div
          style={{
            position: "relative",
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "1400px",
            margin: "0 auto",
            zIndex: 5,
          }}
        >
          {/* Expanding Shockwave Blast Wave */}
          <motion.div
            style={{
              position: "absolute",
              width: "min(600px, 80vw)",
              aspectRatio: "1/1",
              borderRadius: "50%",
              border: "3px solid #FF7517",
              boxShadow: "0 0 50px rgba(255, 85, 0, 0.6), inset 0 0 50px rgba(255, 85, 0, 0.4)",
              scale: shockwaveScale,
              opacity: shockwaveOpacity,
              pointerEvents: "none",
              zIndex: 3,
            }}
          />

          {/* HTML5 Canvas Rendering 60FPS Crisp Burst Frames */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1150px",
              aspectRatio: "16/9",
              maxHeight: "56vh",
              borderRadius: "32px",
              overflow: "hidden",
              boxShadow: "0 25px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(255, 85, 0, 0.25)",
              border: "2px solid rgba(255, 85, 0, 0.35)",
              background: "#161212",
            }}
          >
            {/* The Scrollytelling Interactive Canvas */}
            <canvas
              ref={canvasRef}
              width={1600}
              height={900}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />

            {/* Fallback image before frames load */}
            {!imagesLoaded && (
              <Image
                src="/images/biryani-buckets-burst-hd.jpg"
                alt="Biryani Buckets Burst in Kottayam"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            )}

            {/* Initial Scroll Prompt Callout */}
            <motion.div
              style={{
                opacity: promptOpacity,
                position: "absolute",
                bottom: "24px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(26, 23, 23, 0.9)",
                backdropFilter: "blur(12px)",
                padding: "10px 22px",
                borderRadius: "100px",
                border: "1px solid rgba(255, 85, 0, 0.5)",
                color: "#FFFFFF",
                fontSize: "0.82rem",
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              <ArrowDown size={15} color="#FF7517" />
              <span>SCROLL DOWN TO DETONATE BUCKET BURST</span>
            </motion.div>

            {/* DYNAMIC SATELLITE BURST TAGS (Appear during explosion) */}
            <motion.div
              style={{
                opacity: badgesOpacity,
                y: badgesY,
                position: "absolute",
                top: "14px",
                left: "16px",
                background: "rgba(26, 23, 23, 0.85)",
                backdropFilter: "blur(12px)",
                padding: "8px 16px",
                borderRadius: "100px",
                border: "1px solid rgba(255, 117, 23, 0.4)",
                color: "#FFFFFF",
                fontSize: "0.78rem",
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                zIndex: 8,
              }}
              className="burst-hotspot"
            >
              <Zap size={14} color="#FF7517" />
              <span>POPPED-OPEN LIDS</span>
            </motion.div>

            <motion.div
              style={{
                opacity: badgesOpacity,
                y: badgesY,
                position: "absolute",
                top: "14px",
                right: "16px",
                background: "rgba(26, 23, 23, 0.85)",
                backdropFilter: "blur(12px)",
                padding: "8px 16px",
                borderRadius: "100px",
                border: "1px solid rgba(255, 117, 23, 0.4)",
                color: "#FFFFFF",
                fontSize: "0.78rem",
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                zIndex: 8,
              }}
              className="burst-hotspot"
            >
              <Sparkles size={14} color="#FFD700" />
              <span>SAFFRON BASMATI SPLASH</span>
            </motion.div>

            <motion.div
              style={{
                opacity: badgesOpacity,
                y: badgesY,
                position: "absolute",
                bottom: "14px",
                left: "16px",
                background: "rgba(26, 23, 23, 0.85)",
                backdropFilter: "blur(12px)",
                padding: "8px 16px",
                borderRadius: "100px",
                border: "1px solid rgba(255, 85, 0, 0.4)",
                color: "#FFFFFF",
                fontSize: "0.78rem",
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                zIndex: 8,
              }}
              className="burst-hotspot"
            >
              <Flame size={14} color="#FF5500" />
              <span>CHARRED MEAT CUTS</span>
            </motion.div>

            <motion.div
              style={{
                opacity: badgesOpacity,
                y: badgesY,
                position: "absolute",
                bottom: "14px",
                right: "16px",
                background: "#FF5500",
                padding: "8px 18px",
                borderRadius: "100px",
                color: "#FFFFFF",
                fontSize: "0.82rem",
                fontWeight: 950,
                fontFamily: "var(--font-display)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 8px 24px rgba(255, 85, 0, 0.4)",
                zIndex: 8,
              }}
              className="burst-hotspot"
            >
              <UtensilsCrossed size={14} />
              <span>1,00,000+ KOTTAYAM FOODIES</span>
            </motion.div>
          </div>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* BOTTOM METRICS STRIP & DIRECT MENU JUMP CTA */}
        {/* ----------------------------------------------------------- */}
        <motion.div
          style={{
            opacity: metricsOpacity,
            y: metricsY,
            position: "relative",
            zIndex: 10,
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            padding: "16px 28px",
            background: "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(16px)",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "36px",
            }}
            className="burst-metrics-row"
          >
            {metrics.map((m, idx) => (
              <div key={idx}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.45rem",
                    fontWeight: 950,
                    color: "#FF7517",
                    lineHeight: 1,
                  }}
                >
                  {m.num}
                </div>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "rgba(255,255,255,0.8)", textTransform: "uppercase" }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <a
            href="#menu"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 28px",
              borderRadius: "100px",
              background: "#FF5500",
              color: "#FFFFFF",
              fontSize: "0.88rem",
              fontWeight: 950,
              fontFamily: "var(--font-display)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              textDecoration: "none",
              boxShadow: "0 10px 25px rgba(255, 85, 0, 0.4)",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <span>Book Your Bucket Now</span>
            <ArrowDown size={16} />
          </a>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .burst-hotspot {
            display: none !important;
          }
          .burst-metrics-row {
            gap: 18px !important;
          }
        }
      `}</style>
    </section>
  );
}

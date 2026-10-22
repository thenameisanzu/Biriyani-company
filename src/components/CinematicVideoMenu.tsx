"use client";

import React, { useRef, useEffect } from "react";
import {
  Sparkles,
  ChevronDown,
  Eye,
} from "lucide-react";
import MenuSection from "./MenuSection";
import { MenuItemType } from "./FoodDetailModal";

interface CinematicVideoMenuProps {
  onAddToTray: (item: MenuItemType) => void;
}

export default function CinematicVideoMenu({ onAddToTray }: CinematicVideoMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const blurVeilRef = useRef<HTMLDivElement>(null);
  const floatingBtnRef = useRef<HTMLDivElement>(null);

  const scrollToVideo = () => {
    if (containerRef.current) {
      window.scrollTo({
        top: containerRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  // Ensure video autoplays smoothly
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, []);

  // 120 FPS Buttery-Smooth Scroll Controller (Direct DOM Updates, Zero Rerenders)
  // 1. 50% square card expands to full screen on scroll entrance.
  // 2. Video plays in crystal-clear slow-motion (NO scroll scrub - natural playback!).
  // 3. Scrolling down to menu smoothly blurs video into glassmorphism backdrop.
  // 4. Menu cards stack over the blurred live video.
  useEffect(() => {
    let ticking = false;
    let lastRawExpand = -1;
    let lastBlurT = -1;

    const updateFrame = () => {
      if (!containerRef.current || !videoWrapperRef.current || !videoRef.current) {
        ticking = false;
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // 1. Expanding Cinema Frame:
      const enterDistance = windowH - rect.top;
      const enterThreshold = windowH * 0.75;
      const rawExpand = Math.min(Math.max(enterDistance / enterThreshold, 0), 1);

      if (Math.abs(rawExpand - lastRawExpand) > 0.005) {
        lastRawExpand = rawExpand;
        const screenW = window.innerWidth;
        const initialSize =
          screenW < 768
            ? "min(86vw, 360px)"
            : screenW < 1024
            ? "min(68vw, 460px)"
            : "min(50vw, 520px)";

        const wrapper = videoWrapperRef.current;
        if (rawExpand >= 0.98) {
          wrapper.style.width = "100%";
          wrapper.style.height = "100vh";
          wrapper.style.borderRadius = "0px";
          wrapper.style.boxShadow = "none";
        } else {
          wrapper.style.width = `calc(${initialSize} + (100vw - ${initialSize}) * ${rawExpand})`;
          wrapper.style.height = `calc(${initialSize} + (100vh - ${initialSize}) * ${rawExpand})`;
          wrapper.style.borderRadius = `${(1 - rawExpand) * 44}px`;
          wrapper.style.boxShadow =
            "0 30px 80px rgba(0, 0, 0, 0.18), 0 10px 35px rgba(255, 85, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)";
        }
      }

      // 2. Dynamic Blur as user scrolls towards Menu:
      const scrolledPast = -rect.top;
      const blurStart = windowH * 0.2;
      const blurEnd = windowH * 0.85;

      let blurT = 0;
      if (scrolledPast > blurStart) {
        blurT = Math.min(Math.max((scrolledPast - blurStart) / (blurEnd - blurStart), 0), 1);
      }

      if (Math.abs(blurT - lastBlurT) > 0.005) {
        lastBlurT = blurT;
        const video = videoRef.current;
        const blurPx = blurT * 22;
        const brightness = 1 - blurT * 0.22;
        const saturate = 135 + blurT * 20;
        const scale = 1.02 + blurT * 0.06;

        video.style.filter = `blur(${blurPx.toFixed(1)}px) brightness(${brightness.toFixed(2)}) saturate(${saturate.toFixed(0)}%)`;
        video.style.transform = `scale(${scale.toFixed(3)})`;

        if (blurVeilRef.current) {
          blurVeilRef.current.style.opacity = blurT.toFixed(2);
        }

        if (heroOverlayRef.current) {
          const overlayOpacity = Math.max(1 - blurT * 1.5, 0);
          heroOverlayRef.current.style.opacity = overlayOpacity.toFixed(2);
          heroOverlayRef.current.style.transform = `translateY(${(-blurT * 35).toFixed(1)}px)`;
          heroOverlayRef.current.style.pointerEvents = overlayOpacity < 0.1 ? "none" : "auto";
        }

        if (floatingBtnRef.current) {
          floatingBtnRef.current.style.display = blurT >= 0.7 ? "flex" : "none";
        }
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateFrame);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateFrame();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="cinematic-experience"
      style={{
        position: "relative",
        width: "100%",
        background: "#FFFFFF",
      }}
    >
      {/* ============================================================ */}
      {/* 1. STICKY EXPANDING & BLURRING VIDEO BACKGROUND               */}
      {/* Pinned at top: 0 while showcase and menu are scrolled         */}
      {/* ============================================================ */}
      <div
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          overflow: "hidden",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          ref={videoWrapperRef}
          style={{
            position: "relative",
            width: "min(50vw, 520px)",
            height: "min(50vw, 520px)",
            borderRadius: "44px",
            overflow: "hidden",
            boxShadow:
              "0 30px 80px rgba(0, 0, 0, 0.18), 0 10px 35px rgba(255, 85, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)",
            backgroundColor: "#120F0F",
            willChange: "width, height, border-radius",
            transform: "translateZ(0)",
          }}
        >
          {/* Slow-Motion Video Element (Continuous Smooth Autoplay) */}
          <video
            ref={videoRef}
            src="/video/Create_slow_motion_motion_video_20261020132803.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(0px) brightness(1) saturate(135%)",
              transform: "scale(1.02)",
              willChange: "filter, transform",
            }}
          />

          {/* Ambient Dark Grain & Vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.06) 0%, rgba(15,12,12,0.48) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Frosted Glass Amber Ambient Veil (Dynamic opacity on scroll) */}
          <div
            ref={blurVeilRef}
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 35%, rgba(255, 255, 255, 0.06) 0%, rgba(20, 16, 14, 0.35) 100%)",
              opacity: 0,
              pointerEvents: "none",
              zIndex: 4,
              willChange: "opacity",
            }}
          />
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. SCROLLING FOREGROUND: Video Showcase + Liquid Glass Menu    */}
      {/* Positioned directly on top of the sticky video canvas        */}
      {/* ============================================================ */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          marginTop: "-100vh", // Aligns showcase over sticky video
        }}
      >
        {/* 2A. Fullscreen Video Hero Showcase */}
        <div
          ref={heroOverlayRef}
          className="cinema-hero-overlay"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "clamp(24px, 5vw, 64px)",
            paddingTop: "clamp(90px, 12vh, 120px)",
            paddingBottom: "36px",
            zIndex: 10,
            willChange: "opacity, transform",
          }}
        >
          {/* Top Bar removed per user request */}

          {/* Center Editorial Typography */}
          <div className="cinema-text-wrapper" style={{ maxWidth: "880px", margin: "auto 0 20px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#FF7517",
                fontSize: "0.85rem",
                fontWeight: 900,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontFamily: "var(--font-display)",
                marginBottom: "12px",
              }}
            >
              <Sparkles size={16} />
              <span>THE ART OF HARDWOOD DUM</span>
            </div>

            <h2
              className="cinema-hero-title"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)",
                fontWeight: 950,
                color: "#FFFFFF",
                letterSpacing: "-0.04em",
                lineHeight: 0.94,
                textTransform: "uppercase",
                margin: "0 0 16px",
                textShadow: "0 8px 30px rgba(0, 0, 0, 0.7)",
              }}
            >
              SLOW FIRE. <br />
              <span
                style={{
                  color: "#FF7517",
                  textShadow: "0 4px 25px rgba(255, 117, 23, 0.5), 0 8px 30px rgba(0, 0, 0, 0.85)",
                  display: "inline-block",
                }}
              >
                PURE AROMA.
              </span>
            </h2>

            <p
              className="cinema-hero-subtext"
              style={{
                fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
                color: "rgba(255, 255, 255, 0.88)",
                lineHeight: 1.55,
                maxWidth: "600px",
                margin: 0,
                textShadow: "0 4px 16px rgba(0, 0, 0, 0.6)",
              }}
            >
              Layered basmati infused with Kashmiri saffron &amp; slow-braised cuts over glowing coal embers in Kanjikuzhi.
            </p>
          </div>

          {/* Bottom Bar: Explore Menu prompt button */}
          <div
            className="cinema-bottom-bar"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
              borderTop: "1px solid rgba(255, 255, 255, 0.15)",
              paddingTop: "18px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ChevronDown size={18} color="#FF7517" />
              <span
                style={{
                  fontSize: "0.85rem",
                  fontFamily: "var(--font-display)",
                  color: "rgba(255, 255, 255, 0.85)",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Scroll down for menu
              </span>
            </div>
          </div>
        </div>

        {/* 2B. Menu Section directly on top of blurred video */}
        <div id="menu-overlay-wrapper">
          <MenuSection onAddToTray={onAddToTray} />
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. FLOATING BUTTON: Jump back to Video anytime                */}
      {/* ============================================================ */}
      <div
        ref={floatingBtnRef}
        className="cinema-watch-btn-floating"
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 80,
          display: "none",
        }}
      >
        <button
          onClick={scrollToVideo}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "9px",
            padding: "10px 20px",
            borderRadius: "100px",
            background: "rgba(22, 19, 19, 0.85)",
            backdropFilter: "blur(24px) saturate(200%)",
            WebkitBackdropFilter: "blur(24px) saturate(200%)",
            border: "1.5px solid rgba(255, 117, 23, 0.5)",
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.35)",
            color: "#FFFFFF",
            fontSize: "0.78rem",
            fontWeight: 850,
            fontFamily: "var(--font-display)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#FF5500";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(22, 19, 19, 0.85)";
          }}
        >
          <Eye size={15} color="#FF7517" />
          <span>WATCH VIDEO ↑</span>
        </button>
      </div>

      {/* Keyframe animations and 100% Mobile & iPad Responsiveness */}
      <style jsx global>{`
        @keyframes equalizerBar {
          0%, 100% {
            height: 30%;
          }
          50% {
            height: 100%;
          }
        }

        /* Mobile Phone Optimization (< 768px) */
        @media (max-width: 768px) {
          .cinema-hero-overlay {
            padding: 76px 18px 24px 18px !important;
          }
          .cinema-top-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .cinema-hero-title {
            font-size: clamp(1.85rem, 8vw, 2.9rem) !important;
            line-height: 1.0 !important;
            margin-bottom: 10px !important;
          }
          .cinema-hero-subtext {
            font-size: 0.88rem !important;
            line-height: 1.5 !important;
          }
          .cinema-bottom-bar {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          .cinema-bottom-bar > button {
            width: 100% !important;
            justify-content: center !important;
            padding: 12px 20px !important;
          }
          .cinema-watch-btn-floating {
            display: none !important;
          }
        }

        /* iPad & Tablet Optimization (768px to 1024px) */
        @media (min-width: 769px) and (max-width: 1024px) {
          .cinema-hero-overlay {
            padding: 96px 28px 28px 28px !important;
          }
          .cinema-hero-title {
            font-size: clamp(2.6rem, 5.5vw, 4rem) !important;
          }
          .cinema-watch-btn-floating {
            bottom: calc(88px + env(safe-area-inset-bottom, 0px)) !important;
            right: 22px !important;
          }
        }
      `}</style>
    </section>
  );
}

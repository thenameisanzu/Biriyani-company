"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ChevronDown,
  UtensilsCrossed,
  Eye,
  ArrowRight,
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
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const floatingBtnRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);

  // Time update: handle video progress bar
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration > 0) {
      setVideoProgress((currentTime / duration) * 100);
    }
  };

  // Toggle Play/Pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Toggle Sound
  const toggleSound = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Replay Video from start
  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  // Smooth scroll jumps
  const scrollToMenu = () => {
    const menuEl = document.getElementById("menu");
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToVideo = () => {
    if (containerRef.current) {
      const targetTop = containerRef.current.offsetTop;
      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    }
  };

  // 1. Intersection Observer for Auto-play when section enters view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {
                video.muted = true;
                setIsMuted(true);
                video.play().then(() => setIsPlaying(true)).catch(() => {});
              });
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // 2. High-performance scroll tracking: 100% direct DOM manipulation via requestAnimationFrame
  // ZERO React re-renders on scroll! Guarantees 120 FPS buttery smooth scrolling.
  // 1. Video Expands on entrance.
  // 2. Video stays crisp & unblurred during runway ("adyam video sherikk kanan patanam").
  // 3. Scrolling further smoothly blurs video ("veendum scroll cheyumbol venam blur aakan").
  // 4. Liquid Glass Menu scrolls directly over blurred video ("blurred aayit venam menu ellam athilekk varan").
  // 5. Menu cards stack on scroll ("veendum scroll cheyyumbol ath stack aavanam").
  useEffect(() => {
    let ticking = false;

    const updateFrame = () => {
      if (!containerRef.current || !videoWrapperRef.current) {
        ticking = false;
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Expansion calculation:
      const enterDistance = windowH - rect.top;
      const enterThreshold = windowH * 0.75;
      const rawExpand = Math.min(Math.max(enterDistance / enterThreshold, 0), 1);

      // Responsive initial card sizing: 86vw on phone, 68vw on iPad, 50vw on desktop
      const screenW = window.innerWidth;
      const initialSize =
        screenW < 768
          ? "min(86vw, 360px)"
          : screenW < 1024
          ? "min(68vw, 460px)"
          : "min(50vw, 520px)";

      // Direct DOM update on video wrapper
      const el = videoWrapperRef.current;
      if (rawExpand >= 0.98) {
        el.style.width = "100%";
        el.style.height = "100vh";
        el.style.borderRadius = "0px";
        el.style.boxShadow = "none";
      } else {
        el.style.width = `calc(${initialSize} + (100vw - ${initialSize}) * ${rawExpand})`;
        el.style.height = `calc(${initialSize} + (100vh - ${initialSize}) * ${rawExpand})`;
        el.style.borderRadius = `${(1 - rawExpand) * 44}px`;
        el.style.boxShadow =
          "0 30px 80px rgba(0, 0, 0, 0.18), 0 10px 35px rgba(255, 85, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)";
      }

      // Scroll Runway and Blur calculation:
      // When rect.top <= 0, user is scrolling inside the cinematic experience section
      const scrolledPast = -rect.top;
      const blurStart = windowH * 0.55; // First ~55vh is crisp HD video watching!
      const blurEnd = windowH * 1.15;   // Blur transitions smoothly as menu arrives

      let blurProgress = 0;
      if (scrolledPast > blurStart) {
        blurProgress = Math.min(Math.max((scrolledPast - blurStart) / (blurEnd - blurStart), 0), 1);
      }

      // Direct DOM filter update on video element
      if (videoRef.current) {
        const blurPx = blurProgress * 22;
        const brightness = 1 - blurProgress * 0.22;
        const saturate = 135 + blurProgress * 20;
        const scale = 1.02 + blurProgress * 0.06;
        videoRef.current.style.filter = `blur(${blurPx.toFixed(1)}px) brightness(${brightness.toFixed(2)}) saturate(${saturate.toFixed(0)}%)`;
        videoRef.current.style.transform = `scale(${scale.toFixed(3)})`;
      }

      // Ambient blur veil
      if (blurVeilRef.current) {
        blurVeilRef.current.style.opacity = blurProgress.toFixed(2);
      }

      // Hero overlay (Process Pill, Sound Toggle, Editorial Title)
      if (heroOverlayRef.current) {
        const overlayOpacity = Math.max(1 - blurProgress * 1.6, 0);
        heroOverlayRef.current.style.opacity = overlayOpacity.toFixed(2);
        heroOverlayRef.current.style.transform = `translateY(${(-blurProgress * 40).toFixed(1)}px)`;
        heroOverlayRef.current.style.pointerEvents = overlayOpacity < 0.15 ? "none" : "auto";
      }

      // Scroll hint pill
      if (scrollHintRef.current) {
        const hintOpacity = Math.max(1 - blurProgress * 2.2, 0);
        scrollHintRef.current.style.opacity = hintOpacity.toFixed(2);
      }

      // Floating switcher button (show when menu is in view)
      if (floatingBtnRef.current) {
        if (blurProgress >= 0.75) {
          floatingBtnRef.current.style.display = "flex";
        } else {
          floatingBtnRef.current.style.display = "none";
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
    <div
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
      {/* Pinned at top: 0 while scrolling runway and menu section      */}
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
          {/* Slow-Motion Video Element */}
          <video
            ref={videoRef}
            src="/video/Create_slow_motion_motion_video_20261020132803.mp4"
            playsInline
            loop
            muted={isMuted}
            autoPlay
            onTimeUpdate={handleTimeUpdate}
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
                "radial-gradient(ellipse at center, rgba(0,0,0,0.08) 0%, rgba(15,12,12,0.5) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Frosted Glass Subtle Amber Ambient Veil (Dynamic opacity on scroll) */}
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

          {/* ============================================================ */}
          {/* CRISP FULLSCREEN VIDEO HERO OVERLAYS (STAGE 1)                */}
          {/* Fades out smoothly as user scrolls towards the menu          */}
          {/* ============================================================ */}
          <div
            ref={heroOverlayRef}
            className="cinema-hero-overlay"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "clamp(24px, 5vw, 64px)",
              paddingTop: "clamp(90px, 12vh, 120px)",
              zIndex: 10,
              willChange: "opacity, transform",
            }}
          >
            {/* Top Bar: Process Badge + Audio/Playback Controls */}
            <div
              className="cinema-top-row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              {/* Live Process Pill */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 18px",
                  borderRadius: "100px",
                  background: "rgba(22, 19, 19, 0.65)",
                  backdropFilter: "blur(24px) saturate(200%)",
                  WebkitBackdropFilter: "blur(24px) saturate(200%)",
                  border: "1.5px solid rgba(255, 117, 23, 0.45)",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.35)",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#FF5500",
                    boxShadow: "0 0 12px #FF5500",
                    animation: "pulseSaffronGlow 2s infinite ease-in-out",
                  }}
                />
                <span
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 900,
                    letterSpacing: "0.16em",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-display)",
                    textTransform: "uppercase",
                  }}
                >
                  SLOW-MOTION DUM • HARDWOOD COAL
                </span>
              </div>

              {/* Right: Sound, Play, and Replay Controls */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 8px",
                  borderRadius: "100px",
                  background: "rgba(22, 19, 19, 0.72)",
                  backdropFilter: "blur(28px) saturate(210%)",
                  WebkitBackdropFilter: "blur(28px) saturate(210%)",
                  border: "1.5px solid rgba(255, 255, 255, 0.18)",
                  boxShadow: "0 14px 35px rgba(0, 0, 0, 0.4)",
                }}
              >
                {/* Sound Toggle */}
                <button
                  onClick={toggleSound}
                  aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: isMuted ? "rgba(255, 255, 255, 0.1)" : "#FF5500",
                    color: "#FFFFFF",
                    padding: "8px 14px",
                    borderRadius: "100px",
                    fontSize: "0.74rem",
                    fontWeight: 900,
                    letterSpacing: "0.08em",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {!isMuted ? (
                    <>
                      <Volume2 size={16} />
                      <span style={{ display: "inline-flex", gap: "2px", alignItems: "center", height: "12px" }}>
                        <span
                          style={{
                            width: "2px",
                            height: "60%",
                            background: "#FFFFFF",
                            animation: "equalizerBar 0.8s infinite ease-in-out",
                          }}
                        />
                        <span
                          style={{
                            width: "2px",
                            height: "100%",
                            background: "#FFFFFF",
                            animation: "equalizerBar 0.6s infinite 0.2s ease-in-out",
                          }}
                        />
                        <span
                          style={{
                            width: "2px",
                            height: "40%",
                            background: "#FFFFFF",
                            animation: "equalizerBar 0.9s infinite 0.4s ease-in-out",
                          }}
                        />
                      </span>
                    </>
                  ) : (
                    <>
                      <VolumeX size={16} />
                      <span>TAP FOR SOUND</span>
                    </>
                  )}
                </button>

                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255, 255, 255, 0.12)",
                    color: "#FFFFFF",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {isPlaying ? <Pause size={15} /> : <Play size={15} style={{ marginLeft: "2px" }} />}
                </button>

                {/* Replay */}
                <button
                  onClick={restartVideo}
                  aria-label="Restart video"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255, 255, 255, 0.08)",
                    color: "#FFFFFF",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

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
                <span className="saffron-gradient-text">PURE AROMA.</span>
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

            {/* Bottom Bar: Progress & Direct Scroll to Menu Button */}
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
              {/* Progress line */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: "200px" }}>
                <div
                  style={{
                    flex: 1,
                    height: "3px",
                    borderRadius: "4px",
                    background: "rgba(255, 255, 255, 0.2)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${videoProgress}%`,
                      background: "linear-gradient(90deg, #FF7517, #FF5500)",
                      borderRadius: "4px",
                      transition: "width 0.1s linear",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontFamily: "var(--font-display)",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                  }}
                >
                  4K SLOW-MO
                </span>
              </div>

              {/* Jump to Menu Button */}
              <button
                onClick={scrollToMenu}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 26px",
                  borderRadius: "100px",
                  background: "linear-gradient(135deg, #FF5500 0%, #D44400 100%)",
                  boxShadow: "0 10px 30px rgba(255, 85, 0, 0.45)",
                  border: "1.5px solid rgba(255, 255, 255, 0.35)",
                  color: "#FFFFFF",
                  fontSize: "0.85rem",
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-display)",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <UtensilsCrossed size={16} />
                <span>EXPLORE GLASS MENU</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. SCROLLABLE TRACK (Runway + Menu) OVER STICKY VIDEO        */}
      {/* "adyam video sherikk kanan patanam -> veendum scroll cheyumbol*/}
      {/* blur aakan -> menu varan -> cards stack aavanam"              */}
      {/* ============================================================ */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          marginTop: "-100vh", // Aligns top of runway with top of sticky video
        }}
      >
        {/* 2A. Pure Video Watching Runway */}
        {/* User scrolls through this distance watching the crystal clear HD video! */}
        <div
          className="video-scroll-runway"
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: "32px",
            pointerEvents: "none",
          }}
        >
          {/* Animated Pill Prompting to Scroll Down */}
          <div
            ref={scrollHintRef}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 22px",
              borderRadius: "100px",
              background: "rgba(22, 19, 19, 0.65)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 117, 23, 0.45)",
              color: "#FFFFFF",
              fontSize: "0.78rem",
              fontWeight: 850,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontFamily: "var(--font-display)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
              animation: "pulseSaffronGlow 2.4s infinite ease-in-out",
            }}
          >
            <ChevronDown size={14} color="#FF7517" />
            <span>SCROLL DOWN FOR MENU</span>
            <ChevronDown size={14} color="#FF7517" />
          </div>
        </div>

        {/* 2B. Menu Section directly on top of the blurred video */}
        <div id="menu-overlay-wrapper">
          <MenuSection onAddToTray={onAddToTray} />
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. FLOATING BUTTON: Jump back to Full Video anytime           */}
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
          <span>WATCH VIDEO FULLSCREEN ↑</span>
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
            bottom: calc(84px + env(safe-area-inset-bottom, 0px)) !important;
            right: 16px !important;
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
    </div>
  );
}

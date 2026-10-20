"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Flame,
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

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [hasCompletedFirstPlay, setHasCompletedFirstPlay] = useState(false);
  const [isMenuRevealed, setIsMenuRevealed] = useState(false);


  // Time update: handle video progress bar and auto-blur after first complete playback
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration > 0) {
      setVideoProgress((currentTime / duration) * 100);

      // Auto-trigger menu reveal when the video completes its first playback cycle
      if (currentTime >= duration - 0.4 && !hasCompletedFirstPlay) {
        setHasCompletedFirstPlay(true);
        setIsMenuRevealed(true);
      }
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

  // Toggle between Fullscreen Video Mode & Glass Menu Overlay Mode
  const toggleMenuReveal = (showMenu: boolean) => {
    setIsMenuRevealed(showMenu);
    if (!showMenu) {
      // If returning to video, ensure it continues playing
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
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
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // 2. High-performance scroll tracking: 100% direct DOM manipulation via requestAnimationFrame
  // ZERO React re-renders on scroll! Guarantees 120 FPS buttery smooth scrolling.
  useEffect(() => {
    let ticking = false;
    let autoRevealed = false;

    const updateFrame = () => {
      if (!containerRef.current || !videoWrapperRef.current) {
        ticking = false;
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Expanding Cinema Frame progress:
      const enterDistance = windowH - rect.top;
      const enterThreshold = windowH * 0.75;
      const rawExpand = Math.min(Math.max(enterDistance / enterThreshold, 0), 1);

      // Responsive initial card sizing: 86vw on phone, 68vw on iPad, 50vw on desktop
      const screenW = window.innerWidth;
      const initialSize = screenW < 768 ? "min(86vw, 360px)" : screenW < 1024 ? "min(68vw, 460px)" : "min(50vw, 520px)";

      // Direct DOM update (ZERO React re-renders!)
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

      // Auto-reveal menu when user scrolls down past -120px
      if (rect.top < -120 && !autoRevealed) {
        autoRevealed = true;
        setIsMenuRevealed(true);
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

  // 3. Auto-reveal menu when user clicks navbar "Menu" (#menu) or hash changes
  useEffect(() => {
    const handleHashCheck = () => {
      if (typeof window !== "undefined" && window.location.hash === "#menu") {
        setIsMenuRevealed(true);
      }
    };

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href*="#menu"]');
      if (anchor) {
        setIsMenuRevealed(true);
      }
    };

    window.addEventListener("hashchange", handleHashCheck);
    document.addEventListener("click", handleAnchorClick);
    handleHashCheck();

    return () => {
      window.removeEventListener("hashchange", handleHashCheck);
      document.removeEventListener("click", handleAnchorClick);
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
        overflow: "visible",
      }}
    >
      {/* ============================================================ */}
      {/* 1. EXPANDING CINEMA FRAME CONTAINER                           */}
      {/* Starts as 50% square card on white bg, expands to 100% full   */}
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
          pointerEvents: isMenuRevealed ? "none" : "auto",
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
              filter: isMenuRevealed
                ? "blur(20px) brightness(0.82) saturate(155%)"
                : "blur(0px) brightness(1) saturate(135%)",
              transform: isMenuRevealed ? "scale(1.08)" : "scale(1.02)",
              transition:
                "filter 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
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

          {/* Frosted Glass Subtle Amber Ambient Veil (Transparent, NO milky wash) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 35%, rgba(255, 255, 255, 0.06) 0%, rgba(20, 16, 14, 0.32) 100%)",
              opacity: isMenuRevealed ? 1 : 0,
              transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
              pointerEvents: "none",
              zIndex: 4,
            }}
          />

          {/* ============================================================ */}
          {/* STAGE A: CRISP FULLSCREEN VIDEO HERO OVERLAYS                 */}
          {/* Shown while viewing video before the menu reveal             */}
          {/* ============================================================ */}
        <div
          className="cinema-hero-overlay"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "clamp(24px, 5vw, 64px)",
            paddingTop: "clamp(90px, 12vh, 120px)",
            opacity: isMenuRevealed ? 0 : 1,
            transform: isMenuRevealed ? "translateY(-30px)" : "translateY(0px)",
            pointerEvents: isMenuRevealed ? "none" : "auto",
            transition: "opacity 0.5s ease, transform 0.5s ease",
            zIndex: 10,
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
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "100px",
                  background: !isMuted
                    ? "linear-gradient(135deg, #FF5500 0%, #D44400 100%)"
                    : "rgba(255, 255, 255, 0.1)",
                  color: "#FFFFFF",
                  border: !isMuted
                    ? "1px solid rgba(255, 255, 255, 0.3)"
                    : "1px solid rgba(255, 255, 255, 0.08)",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              >
                {!isMuted ? (
                  <>
                    <Volume2 size={16} />
                    <span>AUDIO ON</span>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "flex-end",
                        gap: "2px",
                        height: "12px",
                      }}
                    >
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
              Layered basmati infused with Kashmiri saffron & slow-braised cuts over glowing coal embers in Kanjikuzhi.
            </p>
          </div>

          {/* Bottom Bar: Progress & Instant View Menu Button */}
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

            {/* In-Place View Menu Button */}
            <button
              onClick={() => toggleMenuReveal(true)}
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
      {/* 2. FLOATING MODE SWITCHER (Always reachable)                  */}
      {/* Allows instant switching between Full Video & Glass Menu      */}
      {/* ============================================================ */}
      <div
        className="cinema-watch-btn-floating"
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 80,
          display: isMenuRevealed ? "flex" : "none",
        }}
      >
        <button
          onClick={() => toggleMenuReveal(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "9px",
            padding: "10px 20px",
            borderRadius: "100px",
            background: "rgba(22, 19, 19, 0.82)",
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
            e.currentTarget.style.background = "rgba(22, 19, 19, 0.82)";
          }}
        >
          <Eye size={15} color="#FF7517" />
          <span>WATCH VIDEO FULLSCREEN</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* 3. GLASSMORPHISM MENU DIRECTLY ON TOP OF BLURRED VIDEO        */}
      {/* "mandakk transparent aayitt glassmorphism pole menu"           */}
      {/* ============================================================ */}
      <div
        style={{
          position: "relative",
          zIndex: 15,
          marginTop: "-100vh", // Positioned directly over the video canvas
          pointerEvents: isMenuRevealed ? "auto" : "none",
          opacity: isMenuRevealed ? 1 : 0,
          transform: isMenuRevealed ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Menu Section with Liquid Glassmorphism */}
        <MenuSection onAddToTray={onAddToTray} />
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

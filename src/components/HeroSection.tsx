"use client";

import React from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import SteamCanvas from "./SteamCanvas";
import { ArrowUpRight, Flame, ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  // Smooth subtle mouse parallax for the bowl
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 90 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-250, 250], [6, -6]);
  const rotateY = useTransform(smoothMouseX, [-250, 250], [-6, 6]);
  const floatY = useTransform(smoothMouseY, [-250, 250], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(145deg, #FF6F00 0%, #FF5500 50%, #FF4500 100%)",
        color: "#FFFFFF",
        paddingTop: "140px",
        paddingBottom: "80px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Subtle Awwwards Background Watermark */}
      <div
        style={{
          position: "absolute",
          top: "14%",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(5rem, 16vw, 15rem)",
          fontWeight: 950,
          color: "rgba(255, 255, 255, 0.07)",
          letterSpacing: "-0.04em",
          whiteSpace: "nowrap",
          userSelect: "none",
          pointerEvents: "none",
          textTransform: "uppercase",
        }}
      >
        BIRYANI CO.
      </div>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 32px",
          width: "100%",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Minimalist 2-Column Grid: Big Typography on Left, Steaming Bowl on Right (NO card/NO box) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "50px",
            alignItems: "center",
          }}
          className="hero-minimal-grid"
        >
          {/* Left Column: Big, Bold, Clean Typography */}
          <div>
            {/* Minimal Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255, 255, 255, 0.18)",
                backdropFilter: "blur(12px)",
                padding: "8px 20px",
                borderRadius: "100px",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                marginBottom: "28px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#FFFFFF",
                  boxShadow: "0 0 10px #FFFFFF",
                }}
              />
              <span
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                SLOW DUM PUKHT • ESTD 2025
              </span>
            </motion.div>

            {/* Giant Clean Headline */}
            <motion.h1
              className="hero-main-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3.8rem, 8.5vw, 7.8rem)",
                fontWeight: 950,
                lineHeight: 0.94,
                letterSpacing: "-0.04em",
                color: "#FFFFFF",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              REAL DUM. <br />
              FRESH BOWL. <br />
              NO COMPROMISE.
            </motion.h1>

            {/* Clean Minimalist Subtitle */}
            <motion.p
              className="hero-subtext"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
                color: "rgba(255, 255, 255, 0.92)",
                lineHeight: 1.6,
                maxWidth: "520px",
                fontWeight: 500,
                marginBottom: "40px",
              }}
            >
              Slow coal-cooked in traditional clay handis with pure cow ghee and 36 secret spices. Served steaming hot in every single bowl.
            </motion.p>

            {/* Minimalist Action Buttons */}
            <motion.div
              className="hero-cta-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <a
                href="#menu"
                className="hero-cta-btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "18px 40px",
                  borderRadius: "100px",
                  background: "#FFFFFF",
                  color: "#FF5500",
                  fontWeight: 900,
                  fontSize: "1.05rem",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.18)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 22px 45px rgba(0, 0, 0, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.18)";
                }}
              >
                <span>Order Online</span>
                <ArrowRight size={18} />
              </a>

              <a
                href="#menu"
                className="hero-cta-btn-secondary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "18px 34px",
                  borderRadius: "100px",
                  background: "transparent",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "1rem",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  border: "2px solid rgba(255, 255, 255, 0.65)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                  e.currentTarget.style.borderColor = "#FFFFFF";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.65)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span>View Menu</span>
                <ArrowUpRight size={18} />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Bowl of Steaming Biryani (NO card, NO box, seamless on orange) */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              perspective: "1000px",
            }}
          >
            {/* Floating Bowl Container with Subtle 3D Mouse Parallax */}
            <motion.div
              className="hero-bowl-wrapper"
              style={{
                rotateX,
                rotateY,
                y: floatY,
                position: "relative",
                width: "100%",
                maxWidth: "520px",
                aspectRatio: "1/1",
              }}
            >
              {/* Biryani Bowl Image directly on background */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  overflow: "visible",
                }}
              >
                <Image
                  src="/images/hero-bowl-biryani.jpg"
                  alt="Hot Steaming Bowl of Dum Biryani - the Biryani Co."
                  fill
                  style={{
                    objectFit: "cover",
                    borderRadius: "50%",
                    boxShadow: "0 35px 80px rgba(0, 0, 0, 0.32)",
                  }}
                  priority
                />

                {/* HEAVILY ANIMATED BILLOWING STEAM WAFTING FROM THE BOWL */}
                <div
                  style={{
                    position: "absolute",
                    top: "-35%",
                    left: "-10%",
                    right: "-10%",
                    height: "140%",
                    pointerEvents: "none",
                  }}
                >
                  <SteamCanvas />
                </div>
              </div>

              {/* Floating Liquid Glass Badges Around Bowl */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="hero-floating-glass-badge left-badge"
                style={{
                  position: "absolute",
                  top: "12%",
                  left: "-30px",
                  background: "rgba(255, 255, 255, 0.22)",
                  backdropFilter: "blur(24px) saturate(200%)",
                  WebkitBackdropFilter: "blur(24px) saturate(200%)",
                  border: "1.5px solid rgba(255, 255, 255, 0.65)",
                  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.16), inset 0 1px 1px rgba(255, 255, 255, 0.7)",
                  borderRadius: "100px",
                  padding: "8px 18px",
                  fontSize: "0.78rem",
                  fontWeight: 900,
                  color: "#FFFFFF",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  zIndex: 21,
                }}
              >
                <Sparkles size={14} />
                <span>Wood-Fired Dum Every 45 Mins</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="hero-floating-glass-badge right-badge"
                style={{
                  position: "absolute",
                  top: "24%",
                  right: "-25px",
                  background: "rgba(255, 255, 255, 0.22)",
                  backdropFilter: "blur(24px) saturate(200%)",
                  WebkitBackdropFilter: "blur(24px) saturate(200%)",
                  border: "1.5px solid rgba(255, 255, 255, 0.65)",
                  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.16), inset 0 1px 1px rgba(255, 255, 255, 0.7)",
                  borderRadius: "100px",
                  padding: "8px 18px",
                  fontSize: "0.78rem",
                  fontWeight: 900,
                  color: "#FFFFFF",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  zIndex: 21,
                }}
              >
                <Flame size={14} />
                <span>100% Pure Cow Ghee</span>
              </motion.div>

              {/* Minimal floating pill at bottom of bowl with Liquid Glass */}
              <motion.div
                className="hero-bowl-bottom-pill"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  position: "absolute",
                  bottom: "-15px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(255, 255, 255, 0.92)",
                  backdropFilter: "blur(28px) saturate(210%)",
                  WebkitBackdropFilter: "blur(28px) saturate(210%)",
                  color: "#FF5500",
                  padding: "10px 24px",
                  borderRadius: "100px",
                  fontSize: "0.85rem",
                  fontWeight: 900,
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  border: "1.5px solid rgba(255, 255, 255, 0.95)",
                  boxShadow: "0 15px 40px rgba(0, 0, 0, 0.22), inset 0 1px 1px #FFFFFF",
                  whiteSpace: "nowrap",
                  zIndex: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Flame size={16} color="#FF5500" />
                <span>HOT STEAMING DUM BOWL • ₹290</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          #hero {
            padding-top: 100px !important;
            padding-bottom: 50px !important;
          }
          .hero-minimal-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 32px !important;
          }
          .hero-minimal-grid > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
        @media (max-width: 600px) {
          #hero {
            padding-top: 86px !important;
            padding-bottom: 36px !important;
            min-height: auto !important;
          }
          .hero-main-title {
            font-size: clamp(2.35rem, 8.8vw, 3.2rem) !important;
            line-height: 1.0 !important;
            margin-bottom: 14px !important;
            letter-spacing: -0.03em !important;
          }
          .hero-subtext {
            font-size: 0.94rem !important;
            line-height: 1.55 !important;
            max-width: 320px !important;
            margin-bottom: 22px !important;
          }
          .hero-cta-group {
            gap: 10px !important;
            justify-content: center !important;
          }
          .hero-cta-btn-primary {
            padding: 13px 26px !important;
            font-size: 0.88rem !important;
          }
          .hero-cta-btn-secondary {
            padding: 13px 22px !important;
            font-size: 0.85rem !important;
          }
          .hero-minimal-grid {
            gap: 24px !important;
          }
          .hero-bowl-wrapper {
            max-width: 250px !important;
            max-height: 250px !important;
            margin: 0 auto !important;
          }
          /* Hide side badges on mobile so bowl is clean and uncluttered */
          .hero-floating-glass-badge.left-badge,
          .hero-floating-glass-badge.right-badge {
            display: none !important;
          }
          .hero-bowl-bottom-pill {
            padding: 7px 16px !important;
            font-size: 0.72rem !important;
            bottom: -10px !important;
          }
        }
      `}</style>
    </section>
  );
}

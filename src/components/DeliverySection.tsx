"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Copy, Check, ShieldCheck, Flame, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "./QuickOrderDrawer";

export default function DeliverySection() {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("BIRYANI20");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section
      id="delivery"
      style={{
        padding: "140px 0",
        background: "linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)",
        color: "#2C2727",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="delivery-container"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 32px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Awwwards Header: Big Bold Headline & Direct Copy */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "40px",
            alignItems: "flex-end",
            marginBottom: "70px",
            paddingBottom: "36px",
            borderBottom: "1.5px solid rgba(62, 57, 57, 0.08)",
          }}
          className="delivery-header-grid"
        >
          <div>
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: 900,
                color: "#FF5500",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              PRIORITY DOORSTEP DELIVERY • ESTD 2025
            </div>
            <motion.h2
              initial={{ opacity: 0, scale: 0.82, y: 45, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 20,
                mass: 0.8,
              }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 6.5vw, 6rem)",
                fontWeight: 950,
                color: "#2C2727",
                lineHeight: 0.94,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
              }}
            >
              ORDER DIRECT. <br />
              <span style={{ color: "#FF5500" }}>SWIGGY &amp; ZOMATO.</span>
            </motion.h2>
          </div>

          <div>
            <p
              style={{
                fontSize: "1.15rem",
                color: "#595353",
                lineHeight: 1.65,
                marginBottom: "24px",
              }}
            >
              Fresh, piping hot Dum Biryani delivered straight to your home or desk in tamper-evident sealed packaging.
            </p>

            {/* Awwwards Liquid Glass Promo Bar */}
            <motion.div
              className="delivery-promo-bar"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "14px",
                background: "rgba(255, 255, 255, 0.82)",
                backdropFilter: "blur(24px) saturate(200%)",
                WebkitBackdropFilter: "blur(24px) saturate(200%)",
                padding: "8px 10px 8px 18px",
                borderRadius: "100px",
                border: "1.5px solid rgba(255, 255, 255, 0.95)",
                boxShadow: "0 10px 25px rgba(255, 85, 0, 0.1), inset 0 1px 2px #FFFFFF",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#FF5500",
                    boxShadow: "0 0 8px rgba(255, 85, 0, 0.6)",
                  }}
                />
                <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#2C2727" }}>
                  USE CODE:
                </span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontWeight: 900,
                    fontSize: "0.95rem",
                    color: "#FF5500",
                    letterSpacing: "0.08em",
                  }}
                >
                  BIRYANI20
                </span>
                <span style={{ fontSize: "0.78rem", color: "#8E8888" }}>(20% OFF)</span>
              </div>

              <button
                onClick={handleCopy}
                style={{
                  background: copiedCode ? "#27AE60" : "linear-gradient(135deg, #FF6F00 0%, #FF5500 100%)",
                  color: "#FFFFFF",
                  padding: "8px 16px",
                  borderRadius: "100px",
                  fontSize: "0.78rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  border: "none",
                  boxShadow: "0 4px 14px rgba(255, 85, 0, 0.3)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {copiedCode ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedCode ? "Copied" : "Copy"}</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Compact Liquid Glass Banners: Swiggy & Zomato */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            marginBottom: "50px",
          }}
          className="cards-duo-grid"
        >
          {/* Swiggy Compact Liquid Glass Banner */}
          <motion.a
            href="https://www.swiggy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="delivery-brand-banner"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, scale: 1.012 }}
            whileTap={{ scale: 0.985 }}
            style={{
              position: "relative",
              borderRadius: "26px",
              padding: "24px 30px",
              minHeight: "124px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "18px",
              overflow: "hidden",
              textDecoration: "none",
              border: "1.5px solid rgba(255, 255, 255, 0.65)",
              boxShadow:
                "0 20px 45px -10px rgba(255, 82, 0, 0.42), inset 0 1.5px 2px rgba(255, 255, 255, 0.85), inset 0 -1.5px 3px rgba(0, 0, 0, 0.2)",
              background: "linear-gradient(135deg, #FF6A00 0%, #FF5200 50%, #E64500 100%)",
              cursor: "pointer",
            }}
          >
            {/* Specular Liquid Glass Overlay & Lights */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 0,
              }}
            >
              {/* Ambient radial glow */}
              <div
                style={{
                  position: "absolute",
                  top: "-50%",
                  right: "-20%",
                  width: "280px",
                  height: "280px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255, 200, 100, 0.55) 0%, rgba(255, 82, 0, 0) 70%)",
                  filter: "blur(30px)",
                }}
              />
              {/* Top glass reflection rim */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "50%",
                  background: "linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100%)",
                }}
              />
              {/* Diagonal glass gloss sheen */}
              <div
                style={{
                  position: "absolute",
                  top: "-30%",
                  left: "-20%",
                  width: "140%",
                  height: "160%",
                  background: "linear-gradient(115deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.06) 35%, transparent 60%)",
                  transform: "rotate(-8deg)",
                }}
              />
            </div>

            {/* Left: Brand Logo from user */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="/images/swiggy-white.png"
                alt="Swiggy"
                style={{
                  height: "44px",
                  width: "auto",
                  maxWidth: "180px",
                  objectFit: "contain",
                  filter: "drop-shadow(0 3px 8px rgba(0, 0, 0, 0.18))",
                  display: "block",
                }}
              />
            </div>

            {/* Right: Floating Liquid Glass Action Capsule */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                flexShrink: 0,
              }}
            >
              <div
                className="banner-cta-pill"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 20px",
                  borderRadius: "100px",
                  background: "rgba(255, 255, 255, 0.94)",
                  backdropFilter: "blur(20px) saturate(190%)",
                  WebkitBackdropFilter: "blur(20px) saturate(190%)",
                  color: "#2C2727",
                  fontFamily: "var(--font-display)",
                  fontWeight: 950,
                  fontSize: "0.85rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  border: "1.5px solid rgba(255, 255, 255, 0.98)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.16), inset 0 1px 2px #FFFFFF",
                  transition: "all 0.25s ease",
                }}
              >
                <span>ORDER ON SWIGGY</span>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "#FF5200",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 3px 8px rgba(255, 82, 0, 0.4)",
                  }}
                >
                  <ArrowUpRight size={15} strokeWidth={2.6} />
                </div>
              </div>
            </div>
          </motion.a>

          {/* Zomato Compact Liquid Glass Banner */}
          <motion.a
            href="https://www.zomato.com"
            target="_blank"
            rel="noopener noreferrer"
            className="delivery-brand-banner"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, scale: 1.012 }}
            whileTap={{ scale: 0.985 }}
            style={{
              position: "relative",
              borderRadius: "26px",
              padding: "24px 30px",
              minHeight: "124px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "18px",
              overflow: "hidden",
              textDecoration: "none",
              border: "1.5px solid rgba(255, 255, 255, 0.65)",
              boxShadow:
                "0 20px 45px -10px rgba(226, 55, 68, 0.42), inset 0 1.5px 2px rgba(255, 255, 255, 0.85), inset 0 -1.5px 3px rgba(0, 0, 0, 0.2)",
              background: "linear-gradient(135deg, #F03D4C 0%, #E23744 50%, #CB2A37 100%)",
              cursor: "pointer",
            }}
          >
            {/* Specular Liquid Glass Overlay & Lights */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 0,
              }}
            >
              {/* Ambient radial glow */}
              <div
                style={{
                  position: "absolute",
                  top: "-50%",
                  right: "-20%",
                  width: "280px",
                  height: "280px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255, 120, 140, 0.55) 0%, rgba(226, 55, 68, 0) 70%)",
                  filter: "blur(30px)",
                }}
              />
              {/* Top glass reflection rim */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "50%",
                  background: "linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100%)",
                }}
              />
              {/* Diagonal glass gloss sheen */}
              <div
                style={{
                  position: "absolute",
                  top: "-30%",
                  left: "-20%",
                  width: "140%",
                  height: "160%",
                  background: "linear-gradient(115deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.06) 35%, transparent 60%)",
                  transform: "rotate(-8deg)",
                }}
              />
            </div>

            {/* Left: Brand Logo from user */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="/images/zomato-white.svg"
                alt="Zomato"
                style={{
                  height: "38px",
                  width: "auto",
                  maxWidth: "180px",
                  objectFit: "contain",
                  filter: "drop-shadow(0 3px 8px rgba(0, 0, 0, 0.18))",
                  display: "block",
                }}
              />
            </div>

            {/* Right: Floating Liquid Glass Action Capsule */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                flexShrink: 0,
              }}
            >
              <div
                className="banner-cta-pill"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 20px",
                  borderRadius: "100px",
                  background: "rgba(255, 255, 255, 0.94)",
                  backdropFilter: "blur(20px) saturate(190%)",
                  WebkitBackdropFilter: "blur(20px) saturate(190%)",
                  color: "#2C2727",
                  fontFamily: "var(--font-display)",
                  fontWeight: 950,
                  fontSize: "0.85rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  border: "1.5px solid rgba(255, 255, 255, 0.98)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.16), inset 0 1px 2px #FFFFFF",
                  transition: "all 0.25s ease",
                }}
              >
                <span>ORDER ON ZOMATO</span>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "#E23744",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 3px 8px rgba(226, 55, 68, 0.4)",
                  }}
                >
                  <ArrowUpRight size={15} strokeWidth={2.6} />
                </div>
              </div>
            </div>
          </motion.a>
        </div>

        {/* WhatsApp Direct Ordering Liquid Glass Banner */}
        <motion.div
          className="delivery-whatsapp-banner"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          style={{
            background: "rgba(255, 255, 255, 0.82)",
            backdropFilter: "blur(32px) saturate(210%)",
            WebkitBackdropFilter: "blur(32px) saturate(210%)",
            border: "1.5px solid rgba(255, 255, 255, 0.95)",
            borderRadius: "28px",
            padding: "28px 36px",
            marginBottom: "60px",
            boxShadow:
              "0 20px 50px rgba(0, 0, 0, 0.05), inset 0 1px 2px #FFFFFF, 0 0 0 1px rgba(37, 211, 102, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #25D366 0%, #1EBE5B 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px rgba(37, 211, 102, 0.4)",
                flexShrink: 0,
              }}
            >
              <WhatsAppIcon size={28} color="#FFFFFF" />
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.35rem",
                    fontWeight: 950,
                    textTransform: "uppercase",
                    letterSpacing: "-0.02em",
                    color: "#2C2727",
                  }}
                >
                  Direct WhatsApp Ordering
                </span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 900,
                    background: "rgba(37, 211, 102, 0.15)",
                    color: "#1EBE5B",
                    padding: "3px 10px",
                    borderRadius: "100px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  0% Commission • Best Price
                </span>
              </div>
              <p style={{ margin: "4px 0 0", fontSize: "0.92rem", color: "#6B6565" }}>
                Skip platform fees. Order directly from our Kanjikuzhi kitchen counter via WhatsApp for instant preparation &amp; dispatch.
              </p>
            </div>
          </div>

          <motion.a
            href="https://wa.me/918089080342?text=Hi%20the%20BIRYANI%20CO.%2C%20I%20would%20like%20to%20order%20biryani%20buckets."
            target="_blank"
            rel="noopener noreferrer"
            className="delivery-whatsapp-btn"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            style={{
              padding: "14px 28px",
              borderRadius: "100px",
              background: "linear-gradient(135deg, #25D366 0%, #1EBE5B 100%)",
              color: "#FFFFFF",
              fontSize: "0.92rem",
              fontWeight: 950,
              fontFamily: "var(--font-display)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 10px 25px rgba(37, 211, 102, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.5)",
              border: "1.5px solid rgba(255, 255, 255, 0.4)",
            }}
          >
            <WhatsAppIcon size={18} color="#FFFFFF" />
            <span>Chat &amp; Order (8089080342)</span>
          </motion.a>
        </motion.div>

        {/* Minimalist Packaging Guarantees Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            paddingTop: "40px",
            borderTop: "1px solid rgba(62, 57, 57, 0.08)",
          }}
          className="guarantee-row"
        >
          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.6rem",
                fontWeight: 950,
                color: "#FF5500",
              }}
            >
              01
            </span>
            <div>
              <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#2C2727" }}>
                90-Minute Thermal Lock
              </div>
              <div style={{ fontSize: "0.82rem", color: "#787272" }}>
                Arrives piping hot at your doorstep
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.6rem",
                fontWeight: 950,
                color: "#FF5500",
              }}
            >
              02
            </span>
            <div>
              <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#2C2727" }}>
                Tamper-Evident Seal
              </div>
              <div style={{ fontSize: "0.82rem", color: "#787272" }}>
                Guaranteed 100% untouched hygiene
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.6rem",
                fontWeight: 950,
                color: "#FF5500",
              }}
            >
              03
            </span>
            <div>
              <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#2C2727" }}>
                Royal Accompaniments
              </div>
              <div style={{ fontSize: "0.82rem", color: "#787272" }}>
                Packed with Salan, Raita &amp; Pickle
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          #delivery {
            padding: 80px 0 !important;
          }
          .delivery-header-grid,
          .cards-duo-grid,
          .guarantee-row {
            grid-template-columns: 1fr !important;
          }
          .delivery-brand-card {
            padding: 36px 30px !important;
          }
        }
        @media (max-width: 600px) {
          #delivery {
            padding: 60px 0 !important;
          }
          .delivery-container {
            padding: 0 16px !important;
          }
          .delivery-promo-bar {
            display: flex !important;
            flex-wrap: wrap !important;
            border-radius: 18px !important;
            padding: 10px 14px !important;
            gap: 8px !important;
            width: 100% !important;
            justifyContent: space-between !important;
          }
          .delivery-brand-banner {
            padding: 18px 20px !important;
            border-radius: 20px !important;
            min-height: 96px !important;
          }
          .banner-cta-pill {
            padding: 10px 14px !important;
            font-size: 0.78rem !important;
            gap: 8px !important;
          }
          .delivery-whatsapp-banner {
            padding: 22px 18px !important;
            border-radius: 22px !important;
            gap: 16px !important;
          }
          .delivery-whatsapp-btn {
            width: 100% !important;
            justify-content: center !important;
          }
          .delivery-action-btn {
            padding: 16px 20px !important;
            font-size: 0.92rem !important;
          }
        }
      `}</style>
    </section>
  );
}

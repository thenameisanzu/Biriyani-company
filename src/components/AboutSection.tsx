"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Flame, CheckCircle, ShieldCheck } from "lucide-react";

export default function AboutSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isHandiUnsealed, setIsHandiUnsealed] = useState(false);

  const steps = [
    {
      num: "01",
      title: "24-Hour Secret Marination",
      subtitle: "36 Handcrafted Botanicals Infusion",
      desc: "Prime tender cuts are lovingly massaged with cold-pressed mustard oil, green chillies, wild mountain cardamom, mace, stone-ground ginger-garlic, and artisanal curd to lock in deep flavours.",
      tag: "Deep Flavour Base",
    },
    {
      num: "02",
      title: "The Royal Rice Symphony",
      subtitle: "Aged Wayanadan Jeerakasala & 1121 Basmati",
      desc: "We use aged Wayanadan Jeerakasala (Kaima) for Malabar styles and extra-long 1121 Basmati for Hyderabadi Dum, parboiled to precisely 70% in whole spiced court-bouillon.",
      tag: "Fluffy & Aromatic",
    },
    {
      num: "03",
      title: "The Wheat Dough Seal (Purdah)",
      subtitle: "Airtight Dough-Sealed Clay Handi",
      desc: "The earthen handi is layered with golden fried onions (barista), saffron-infused milk, pure desi cow ghee, and fresh garden mint before being sealed airtight with handmade wheat dough.",
      tag: "Hermetic Seal",
    },
    {
      num: "04",
      title: "Slow Charcoal Ember Dum",
      subtitle: "Low & Gentle Hardwood Charcoal Simmer",
      desc: "No fierce direct flames. The handi rests atop gentle hardwood coal embers with hot coals placed over the lid. Internal pressure circulates steam, melting the rich marrow into every grain.",
      tag: "Authentic Dum Pukht",
    },
  ];

  return (
    <section
      id="about"
      style={{
        padding: "140px 0",
        background: "#FFFFFF",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Section Header with Big Awwwards Typography */}
        <div style={{ textAlign: "center", maxWidth: "960px", margin: "0 auto 80px auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 20px",
              borderRadius: "100px",
              background: "#FFF4ED",
              color: "#FF7517",
              fontSize: "0.88rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "20px",
              border: "1.5px solid rgba(255,117,23,0.35)",
            }}
          >
            <Sparkles size={16} />
            <span>The Heritage Of Biryani Company</span>
          </div>

          <h2
            className="huge-section-title"
            style={{
              color: "#2C2727",
              marginBottom: "20px",
            }}
          >
            WE DON&apos;T JUST COOK. <br />
            <span
              style={{
                background: "linear-gradient(135deg, #FF7517 0%, #E85900 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              WE PRACTICE SLOW DUM.
            </span>
          </h2>

          <p
            style={{
              fontSize: "1.2rem",
              color: "#3E3939",
              lineHeight: 1.7,
              maxWidth: "780px",
              margin: "0 auto",
            }}
          >
            Originating from royal Awadhi and Malabar kitchens, genuine Dum Biryani cannot be rushed. It demands hours of patience, glowing charcoal embers, and uncompromised ingredients.
          </p>
        </div>

        {/* 4-Step Interactive Ritual Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
            marginBottom: "80px",
          }}
          className="steps-grid"
        >
          {steps.map((step, idx) => {
            const isSelected = activeStep === idx;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                onClick={() => setActiveStep(idx)}
                style={{
                  background: isSelected ? "#2C2727" : "#FAF8F5",
                  color: isSelected ? "#FFFFFF" : "#2C2727",
                  padding: "36px 26px",
                  borderRadius: "28px",
                  border: isSelected
                    ? "2px solid #FF7517"
                    : "1.5px solid rgba(62, 57, 57, 0.08)",
                  cursor: "pointer",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: isSelected
                    ? "0 25px 50px rgba(44, 39, 39, 0.28)"
                    : "0 6px 18px rgba(0,0,0,0.02)",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "24px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "2.8rem",
                        fontWeight: 950,
                        color: isSelected ? "#FF7517" : "rgba(62, 57, 57, 0.22)",
                        lineHeight: 1,
                      }}
                    >
                      {step.num}
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        padding: "5px 12px",
                        borderRadius: "100px",
                        background: isSelected ? "#FF7517" : "#FFF4ED",
                        color: isSelected ? "#FFFFFF" : "#FF7517",
                        textTransform: "uppercase",
                      }}
                    >
                      {step.tag}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.32rem",
                      fontWeight: 900,
                      marginBottom: "8px",
                      fontFamily: "var(--font-display)",
                      lineHeight: 1.25,
                    }}
                  >
                    {step.title}
                  </h3>

                  <div
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: isSelected ? "#FF7517" : "#FF7517",
                      marginBottom: "14px",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {step.subtitle}
                  </div>

                  <p
                    style={{
                      fontSize: "0.95rem",
                      lineHeight: 1.65,
                      color: isSelected ? "rgba(255, 255, 255, 0.78)" : "#3E3939",
                    }}
                  >
                    {step.desc}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: "24px",
                    paddingTop: "16px",
                    borderTop: `1px solid ${isSelected ? "rgba(255,255,255,0.12)" : "rgba(62,57,57,0.08)"}`,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "0.82rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: isSelected ? "#FF7517" : "#3E3939",
                  }}
                >
                  <Flame size={15} />
                  <span>{isSelected ? "Active Stage Selected" : "Click to view ritual"}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive "Unseal The Dum Handi" Feature */}
        <div
          className="unseal-interactive-card"
          style={{
            background: "linear-gradient(135deg, #2C2727 0%, #3E3939 100%)",
            borderRadius: "36px",
            padding: "54px",
            color: "#FFFFFF",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 30px 70px rgba(44, 39, 39, 0.3)",
            border: "1.5px solid rgba(255, 117, 23, 0.35)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              gap: "40px",
              alignItems: "center",
              position: "relative",
              zIndex: 10,
            }}
            className="unseal-grid"
          >
            <div>
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 900,
                  letterSpacing: "0.18em",
                  color: "#FF7517",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "10px",
                  fontFamily: "var(--font-display)",
                }}
              >
                Interactive Culinary Ritual
              </span>

              <h3
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 950,
                  fontFamily: "var(--font-display)",
                  marginBottom: "16px",
                  lineHeight: 1.1,
                  textTransform: "uppercase",
                }}
              >
                Break The Dough Seal &amp; <br />
                <span style={{ color: "#FF7517" }}>Experience The Dum Release</span>
              </h3>

              <p
                style={{
                  fontSize: "1.08rem",
                  color: "rgba(255, 255, 255, 0.82)",
                  lineHeight: 1.7,
                  marginBottom: "30px",
                  maxWidth: "540px",
                }}
              >
                In our kitchen, the most sacred moment is the unsealing of the clay handi. When the wheat dough seal cracks, the trapped cloud of pure saffron, wild cardamom, and succulent meat juices rushes out. Click to simulate the ritual!
              </p>

              {/* Unseal Trigger Button */}
              <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
                <button
                  onClick={() => setIsHandiUnsealed(!isHandiUnsealed)}
                  style={{
                    padding: "18px 36px",
                    borderRadius: "100px",
                    background: isHandiUnsealed ? "#FFFFFF" : "#FF7517",
                    color: isHandiUnsealed ? "#2C2727" : "#FFFFFF",
                    fontWeight: 900,
                    fontSize: "1.05rem",
                    fontFamily: "var(--font-display)",
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    boxShadow: "0 12px 30px rgba(255, 117, 23, 0.45)",
                    transition: "all 0.3s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <Flame size={22} color={isHandiUnsealed ? "#FF7517" : "#FFFFFF"} />
                  <span>{isHandiUnsealed ? "✓ Handi Unsealed! Reseal Handi" : "Break The Seal Now 🔥"}</span>
                </button>

                <span style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.65)", fontWeight: 600 }}>
                  {isHandiUnsealed ? "Aromatic Steam Released • 100% Aroma" : "Tap button to break dough seal"}
                </span>
              </div>
            </div>

            {/* Visual Handi Reveal State */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                backdropFilter: "blur(14px)",
                borderRadius: "28px",
                padding: "32px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                textAlign: "center",
                position: "relative",
              }}
            >
              <AnimatePresence mode="wait">
                {isHandiUnsealed ? (
                  <motion.div
                    key="unsealed"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        padding: "6px 16px",
                        background: "#FF7517",
                        borderRadius: "100px",
                        fontSize: "0.82rem",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: "18px",
                      }}
                    >
                      ✦ The Sacred Aroma Burst ✦
                    </div>

                    <div style={{ fontSize: "1.5rem", fontWeight: 900, marginBottom: "8px", fontFamily: "var(--font-display)" }}>
                      Handi Successfully Unsealed!
                    </div>

                    <p style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.8)", marginBottom: "24px" }}>
                      Golden saffron steam fills the air. Every grain of rice is glistening in pure cow ghee with melt-in-mouth tender meat.
                    </p>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "12px",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ background: "rgba(0,0,0,0.35)", padding: "14px", borderRadius: "14px" }}>
                        <div style={{ color: "#FF7517", fontWeight: 900, fontSize: "1.35rem", fontFamily: "var(--font-display)" }}>100%</div>
                        <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.75)", textTransform: "uppercase", fontWeight: 700 }}>Aroma Burst</div>
                      </div>
                      <div style={{ background: "rgba(0,0,0,0.35)", padding: "14px", borderRadius: "14px" }}>
                        <div style={{ color: "#FF7517", fontWeight: 900, fontSize: "1.35rem", fontFamily: "var(--font-display)" }}>36</div>
                        <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.75)", textTransform: "uppercase", fontWeight: 700 }}>Herbs Infused</div>
                      </div>
                      <div style={{ background: "rgba(0,0,0,0.35)", padding: "14px", borderRadius: "14px" }}>
                        <div style={{ color: "#FF7517", fontWeight: 900, fontSize: "1.35rem", fontFamily: "var(--font-display)" }}>0 Min</div>
                        <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.75)", textTransform: "uppercase", fontWeight: 700 }}>Ready to Eat</div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="sealed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div
                      style={{
                        width: "88px",
                        height: "88px",
                        borderRadius: "50%",
                        background: "rgba(255, 117, 23, 0.15)",
                        border: "2px dashed #FF7517",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 18px auto",
                      }}
                    >
                      <Flame size={42} color="#FF7517" />
                    </div>

                    <div style={{ fontSize: "1.35rem", fontWeight: 900, marginBottom: "8px", fontFamily: "var(--font-display)" }}>
                      Handi Sealed with Dough
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>
                      Slow embers are working their magic inside the clay walls. Trapped steam is infusing deep flavour into every single grain.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 980px) {
          #about {
            padding: 80px 0 !important;
          }
          .steps-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .unseal-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .unseal-interactive-card {
            padding: 36px 28px !important;
          }
        }
        @media (max-width: 640px) {
          #about {
            padding: 60px 0 !important;
          }
          .steps-grid {
            grid-template-columns: 1fr !important;
          }
          .unseal-interactive-card {
            padding: 24px 18px !important;
            border-radius: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}

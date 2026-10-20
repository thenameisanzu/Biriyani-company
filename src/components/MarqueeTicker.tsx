"use client";

import React from "react";

export default function MarqueeTicker() {
  const items = [
    "REAL SLOW DUM",
    "THE BIRYANI CO.",
    "36 FRESHLY GROUND SPICES",
    "ESTD 2025",
    "PURE COW GHEE",
    "SWIGGY & ZOMATO PRIORITY",
    "SERVED PIPING HOT",
  ];

  return (
    <div
      style={{
        background: "#FF5500",
        color: "#FFFFFF",
        padding: "16px 0",
        overflow: "hidden",
        borderTop: "1px solid rgba(255, 255, 255, 0.25)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.25)",
        position: "relative",
        userSelect: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "marqueeInfinite 22s linear infinite",
        }}
      >
        {[...items, ...items, ...items].map((text, idx) => (
          <div
            key={idx}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "28px",
              padding: "0 28px",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 950,
                fontSize: "1rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#FFFFFF",
              }}
            >
              {text}
            </span>
            <span
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "1rem",
                display: "inline-block",
              }}
            >
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

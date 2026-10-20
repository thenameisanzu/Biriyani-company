"use client";

import React from "react";

interface LogoProps {
  className?: string;
  variant?: "white" | "orange";
  layout?: "horizontal" | "stacked";
}

export default function Logo({
  className = "",
  variant = "white",
  layout = "horizontal",
}: LogoProps) {
  const isWhite = variant === "white";
  const color = isWhite ? "#FFFFFF" : "#FF6500";
  const subColor = isWhite ? "rgba(255, 255, 255, 0.85)" : "#3E3939";

  // Bucket with Sunglasses & Smile SVG Mark
  const BrandIcon = ({ size = 38 }: { size?: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", flexShrink: 0 }}
    >
      {/* Bucket top rim handles */}
      <path
        d="M13 22H51"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Bucket body */}
      <path
        d="M17 23L20 48C20.5 50.5 22.5 52 25 52H39C41.5 52 43.5 50.5 44 48L47 23"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Sunglasses on top */}
      {/* Left Lens */}
      <rect
        x="20"
        y="13"
        width="10"
        height="7.5"
        rx="2.5"
        stroke={color}
        strokeWidth="2.8"
        fill="none"
      />
      {/* Right Lens */}
      <rect
        x="34"
        y="13"
        width="10"
        height="7.5"
        rx="2.5"
        stroke={color}
        strokeWidth="2.8"
        fill="none"
      />
      {/* Sunglasses Bridge */}
      <path
        d="M30 16.5H34"
        stroke={color}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* Cheerful Smile */}
      <path
        d="M26 36C28 41 36 41 38 36"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );

  if (layout === "stacked") {
    return (
      <div
        className={`brand-logo-stacked ${className}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          userSelect: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
          <span style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.22em", color: subColor }}>
            ESTD
          </span>
          <BrandIcon size={44} />
          <span style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.22em", color: subColor }}>
            2025
          </span>
        </div>

        {/* — the — */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            justifyContent: "center",
            margin: "2px 0",
          }}
        >
          <div style={{ height: "1.5px", width: "24px", background: color }} />
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "1.05rem",
              fontWeight: 500,
              color,
              lineHeight: 1,
            }}
          >
            the
          </span>
          <div style={{ height: "1.5px", width: "24px", background: color }} />
        </div>

        {/* BIRYANI */}
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 950,
            fontSize: "1.85rem",
            letterSpacing: "0.18em",
            color,
            lineHeight: 1,
            marginTop: "2px",
          }}
        >
          BIRYANI
        </div>

        {/* CO. */}
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 950,
            fontSize: "1.55rem",
            letterSpacing: "0.28em",
            color,
            lineHeight: 1,
            marginTop: "4px",
          }}
        >
          CO.
        </div>
      </div>
    );
  }

  // Horizontal layout for clean header / navbar
  return (
    <div
      className={`brand-logo-horizontal ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        userSelect: "none",
        cursor: "pointer",
      }}
    >
      <BrandIcon size={38} />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "0.92rem",
              fontWeight: 600,
              color: subColor,
            }}
          >
            the
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 950,
              fontSize: "1.35rem",
              letterSpacing: "0.08em",
              color,
              lineHeight: 1,
            }}
          >
            BIRYANI CO.
          </span>
        </div>
        <span
          style={{
            fontSize: "0.62rem",
            fontWeight: 800,
            letterSpacing: "0.25em",
            color: subColor,
            textTransform: "uppercase",
            marginTop: "2px",
          }}
        >
          ESTD • 2025
        </span>
      </div>
    </div>
  );
}

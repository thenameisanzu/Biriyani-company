"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface BrandedBlackTubProps {
  sizeLabel?: string;
  isVeg?: boolean;
  dishName?: string;
  price?: number;
}

export default function BrandedBlackTub({
  sizeLabel = "Serves 1",
  isVeg = false,
  dishName,
  price,
}: BrandedBlackTubProps) {
  const accentColor = isVeg ? "#1B9C52" : "#FF5500";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "480px",
        aspectRatio: "1/1",
        borderRadius: "36px",
        overflow: "hidden",
        boxShadow: "0 30px 70px rgba(0, 0, 0, 0.18)",
        userSelect: "none",
      }}
    >
      {/* Photorealistic Black Bucket Studio Image (Veg or Non-Veg) */}
      <Image
        src={isVeg ? "/images/menu-tub-green.jpg" : "/images/realistic-black-bucket.jpg"}
        alt="the BIRYANI CO. Authentic Black Takeaway Bucket"
        fill
        style={{ objectFit: "cover" }}
        priority
      />

      {/* Floating Active Size Badge Top Right */}
      <motion.div
        key={sizeLabel}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "#FFFFFF",
          color: accentColor,
          padding: "7px 18px",
          borderRadius: "100px",
          fontSize: "0.85rem",
          fontWeight: 950,
          fontFamily: "var(--font-display)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
          zIndex: 10,
        }}
      >
        {sizeLabel}
      </motion.div>

      {/* Selected Dish & Price Badge Bottom Center */}
      {dishName && (
        <motion.div
          key={`${dishName}-${price}`}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            right: "20px",
            background: "rgba(26, 23, 23, 0.9)",
            backdropFilter: "blur(14px)",
            color: "#FFFFFF",
            padding: "14px 22px",
            borderRadius: "20px",
            border: "1.5px solid rgba(255, 85, 0, 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 10,
          }}
        >
          <div>
            <div style={{ fontSize: "0.75rem", color: "#FF5500", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Active Takeaway Tub
            </div>
            <div style={{ fontSize: "1.05rem", fontWeight: 950, fontFamily: "var(--font-display)", textTransform: "uppercase" }}>
              {dishName}
            </div>
          </div>

          {price && (
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 950,
                  color: "#FF5500",
                  lineHeight: 1,
                }}
              >
                ₹{price}
              </div>
              <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.7)", fontWeight: 700 }}>
                + GST
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

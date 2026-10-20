"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flame, Sparkles, Clock, Check, Utensils, ExternalLink } from "lucide-react";

export interface MenuItemType {
  id: string;
  name: string;
  regionalStyle: string;
  category: "biryani" | "malabar" | "kebab" | "veg";
  price: number;
  image: string;
  tag: string;
  spiceLevel: number;
  serves: string;
  calories: string;
  cookingTime: string;
  desc: string;
  story: string;
  spices: string[];
}

interface FoodDetailModalProps {
  item: MenuItemType | null;
  onClose: () => void;
  onAddToCart: (item: MenuItemType) => void;
}

export default function FoodDetailModal({
  item,
  onClose,
  onAddToCart,
}: FoodDetailModalProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div
        className="food-modal-overlay"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          background: "rgba(44, 39, 39, 0.78)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
        onClick={onClose}
      >
        <motion.div
          className="food-modal-card"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#FFFFFF",
            borderRadius: "36px",
            maxWidth: "780px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            position: "relative",
            boxShadow: "0 35px 90px rgba(0,0,0,0.45)",
            border: "1.5px solid rgba(255, 117, 23, 0.3)",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="food-modal-close-btn"
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              zIndex: 20,
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(62,57,57,0.15)",
              color: "#2C2727",
              cursor: "pointer",
            }}
          >
            <X size={22} />
          </button>

          {/* Modal Header Image */}
          <div
            className="food-modal-img-container"
            style={{
              position: "relative",
              width: "100%",
              height: "340px",
            }}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              style={{ objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(44, 39, 39, 0.92) 0%, rgba(44,39,39,0.3) 50%, transparent 80%)",
              }}
            />
            <div
              className="food-modal-header-text"
              style={{
                position: "absolute",
                bottom: "24px",
                left: "28px",
                right: "28px",
                color: "#FFFFFF",
              }}
            >
              <span
                style={{
                  background: "#FF7517",
                  color: "#FFFFFF",
                  fontSize: "0.78rem",
                  fontWeight: 900,
                  padding: "5px 14px",
                  borderRadius: "100px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  display: "inline-block",
                  marginBottom: "8px",
                }}
              >
                {item.tag}
              </span>
              <h3
                style={{
                  fontSize: "clamp(1.45rem, 4vw, 2.1rem)",
                  fontWeight: 950,
                  fontFamily: "var(--font-display)",
                  lineHeight: 1.1,
                  textTransform: "uppercase",
                }}
              >
                {item.name}
              </h3>
              <div style={{ color: "#FF7517", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.02em" }}>
                {item.regionalStyle}
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="food-modal-body" style={{ padding: "34px" }}>
            {/* Quick Metrics Bar */}
            <div
              className="food-modal-metrics-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "12px",
                background: "#FAF8F5",
                borderRadius: "18px",
                padding: "18px",
                marginBottom: "28px",
                border: "1px solid rgba(62, 57, 57, 0.08)",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.75rem", color: "#3E3939", fontWeight: 700, letterSpacing: "0.05em" }}>PRICE</div>
                <div style={{ fontSize: "1.35rem", fontWeight: 950, color: "#FF7517", fontFamily: "var(--font-display)" }}>₹{item.price}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.75rem", color: "#3E3939", fontWeight: 700, letterSpacing: "0.05em" }}>SERVES</div>
                <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#2C2727" }}>{item.serves}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.75rem", color: "#3E3939", fontWeight: 700, letterSpacing: "0.05em" }}>SPICE LEVEL</div>
                <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#2C2727" }}>
                  {"🌶️".repeat(item.spiceLevel)}
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.75rem", color: "#3E3939", fontWeight: 700, letterSpacing: "0.05em" }}>DUM TIME</div>
                <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#2C2727" }}>{item.cookingTime}</div>
              </div>
            </div>

            {/* Description & Story */}
            <div style={{ marginBottom: "26px" }}>
              <h4
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 900,
                  marginBottom: "8px",
                  fontFamily: "var(--font-display)",
                  textTransform: "uppercase",
                }}
              >
                The Culinary Heritage
              </h4>
              <p style={{ color: "#3E3939", lineHeight: 1.7, fontSize: "1rem", marginBottom: "14px" }}>
                {item.desc}
              </p>
              <p style={{ color: "#595353", fontSize: "0.95rem", lineHeight: 1.6, fontStyle: "italic" }}>
                &ldquo;{item.story}&rdquo;
              </p>
            </div>

            {/* Secret Spices Breakdown */}
            <div style={{ marginBottom: "32px" }}>
              <h4
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 900,
                  marginBottom: "14px",
                  fontFamily: "var(--font-display)",
                  textTransform: "uppercase",
                }}
              >
                Botanical Heritage Spices
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {item.spices.map((spice, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: "#FFF4ED",
                      color: "#FF7517",
                      padding: "8px 16px",
                      borderRadius: "100px",
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      border: "1.5px solid rgba(255, 117, 23, 0.3)",
                    }}
                  >
                    ✦ {spice}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions: Direct Swiggy / Zomato and Tray */}
            <div
              className="food-modal-actions-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 1fr 1fr",
                gap: "14px",
              }}
            >
              <button
                onClick={() => {
                  onAddToCart(item);
                  onClose();
                }}
                style={{
                  background: "#2C2727",
                  color: "#FFFFFF",
                  padding: "16px",
                  borderRadius: "16px",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  border: "1.5px solid rgba(255, 117, 23, 0.4)",
                  fontFamily: "var(--font-display)",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                <Utensils size={18} color="#FF7517" />
                <span>Add to My Tray</span>
              </button>

              <a
                href="https://www.swiggy.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#FC8019",
                  color: "#FFFFFF",
                  padding: "16px",
                  borderRadius: "16px",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  boxShadow: "0 10px 25px rgba(252, 128, 25, 0.35)",
                  textDecoration: "none",
                }}
              >
                <span>Order Swiggy</span>
                <ExternalLink size={16} />
              </a>

              <a
                href="https://www.zomato.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#E23744",
                  color: "#FFFFFF",
                  padding: "16px",
                  borderRadius: "16px",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  boxShadow: "0 10px 25px rgba(226, 55, 68, 0.35)",
                  textDecoration: "none",
                }}
              >
                <span>Order Zomato</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .food-modal-overlay {
            padding: 12px !important;
            align-items: flex-end !important;
          }
          .food-modal-card {
            border-radius: 26px 26px 18px 18px !important;
            max-height: 86vh !important;
          }
          .food-modal-img-container {
            height: 230px !important;
          }
          .food-modal-header-text {
            bottom: 16px !important;
            left: 18px !important;
            right: 18px !important;
          }
          .food-modal-body {
            padding: 22px 18px !important;
          }
          .food-modal-metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
            padding: 14px 10px !important;
            margin-bottom: 22px !important;
          }
          .food-modal-actions-grid {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .food-modal-card {
            max-width: 660px !important;
          }
          .food-modal-img-container {
            height: 280px !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
}

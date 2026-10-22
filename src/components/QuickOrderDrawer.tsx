"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItemType } from "./FoodDetailModal";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  ArrowRight,
  ExternalLink,
  Sparkles,
  MapPin,
  User,
  Trash2,
} from "lucide-react";

export function WhatsAppIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.78 14.07c-.24.68-1.2 1.26-1.68 1.34-.45.08-1.03.11-1.67-.1-.39-.12-.89-.29-1.54-.57-2.73-1.18-4.51-3.95-4.65-4.14-.14-.19-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.27.25-.27.55-.34.73-.34.18 0 .37 0 .53.01.17.01.4.07.61.57.23.55.78 1.91.85 2.05.07.14.12.31.02.5-.1.19-.15.31-.3.48-.15.17-.31.38-.45.51-.15.15-.31.31-.13.62.18.31.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.49 1.53.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.86.88 2.18 1.04.32.16.53.24.61.38.08.14.08.81-.16 1.49z" />
    </svg>
  );
}

interface QuickOrderDrawerProps {
  items: { item: MenuItemType; count: number }[];
  onUpdateCount: (itemId: string, delta: number) => void;
  onClear: () => void;
}

export default function QuickOrderDrawer({
  items,
  onUpdateCount,
  onClear,
}: QuickOrderDrawerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [orderType, setOrderType] = useState<"takeaway" | "delivery">("takeaway");
  const [customerName, setCustomerName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [specialNote, setSpecialNote] = useState("");

  const totalItems = items.reduce((acc, curr) => acc + curr.count, 0);
  const totalPrice = items.reduce(
    (acc, curr) => acc + curr.item.price * curr.count,
    0
  );

  // Generate WhatsApp Order URL
  const generateWhatsAppUrl = () => {
    const lines = [
      "🔥 *NEW ORDER - the BIRYANI CO. (Kottayam)*",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      ...items.map(
        ({ item, count }) =>
          `• *${count}x* ${item.name} - ₹${item.price * count}`
      ),
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      `💰 *Total Amount:* ₹${totalPrice} (+ GST)`,
      `📦 *Order Type:* ${
        orderType === "takeaway"
          ? "🥡 Takeaway Counter Pickup (Kanjikuzhi)"
          : "🚀 Doorstep Delivery"
      }`,
    ];

    if (customerName.trim()) {
      lines.push(`👤 *Customer:* ${customerName.trim()}`);
    }

    if (orderType === "delivery" && deliveryAddress.trim()) {
      lines.push(`📍 *Delivery Address:* ${deliveryAddress.trim()}`);
    }

    if (specialNote.trim()) {
      lines.push(`📝 *Note:* ${specialNote.trim()}`);
    }

    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push(
      "Please confirm my order and share preparation / delivery time. Thank you!"
    );

    const fullMessage = lines.join("\n");
    return `https://wa.me/918089080342?text=${encodeURIComponent(fullMessage)}`;
  };

  // If Tray is empty, show a persistent floating Liquid Glass WhatsApp Button
  if (totalItems === 0) {
    return (
      <div
        className="order-drawer-container"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 890,
        }}
      >
        <motion.a
          href="https://wa.me/918089080342?text=Hi%20the%20BIRYANI%20CO.%2C%20I%20would%20like%20to%20place%20an%20order."
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 22px",
            borderRadius: "100px",
            // THE LIQUID GLASS WHATSAPP CAPSULE
            background: "rgba(37, 211, 102, 0.92)",
            backdropFilter: "blur(24px) saturate(200%)",
            WebkitBackdropFilter: "blur(24px) saturate(200%)",
            color: "#FFFFFF",
            fontSize: "0.86rem",
            fontWeight: 900,
            fontFamily: "var(--font-display)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            textDecoration: "none",
            border: "1.5px solid rgba(255, 255, 255, 0.6)",
            boxShadow:
              "0 14px 35px rgba(37, 211, 102, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
            cursor: "pointer",
          }}
        >
          <WhatsAppIcon size={20} color="#FFFFFF" />
          <span>WhatsApp Order</span>
        </motion.a>

        <style jsx global>{`
          @media (max-width: 768px) {
            .order-drawer-container {
              display: none !important;
            }
          }
          @media (min-width: 769px) and (max-width: 1024px) {
            .order-drawer-container {
              bottom: calc(82px + env(safe-area-inset-bottom, 0px)) !important;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      className="order-drawer-container"
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 950,
        width: "92%",
        maxWidth: "680px",
      }}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="expanded-tray-card"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            style={{
              // LIQUID GLASS EXPANDED TRAY
              background: "rgba(35, 30, 30, 0.92)",
              backdropFilter: "blur(32px) saturate(210%)",
              WebkitBackdropFilter: "blur(32px) saturate(210%)",
              color: "#FFFFFF",
              borderRadius: "32px",
              padding: "24px",
              marginBottom: "12px",
              boxShadow:
                "0 30px 70px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.2)",
              border: "1.5px solid rgba(255, 255, 255, 0.2)",
              maxHeight: "75vh",
              overflowY: "auto",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
                paddingBottom: "14px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(255, 85, 0, 0.2)",
                    border: "1px solid rgba(255, 85, 0, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ShoppingBag size={18} color="#FF5500" />
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 900,
                      fontFamily: "var(--font-display)",
                      fontSize: "1.15rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.03em",
                    }}
                  >
                    Your Order Tray ({totalItems})
                  </div>
                  <div style={{ fontSize: "0.74rem", color: "rgba(255, 255, 255, 0.65)" }}>
                    Direct Kitchen Dispatch • Kanjikuzhi, Kottayam
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button
                  onClick={onClear}
                  title="Clear Tray"
                  style={{
                    color: "rgba(255, 255, 255, 0.6)",
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "none",
                    borderRadius: "100px",
                    padding: "6px 12px",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Trash2 size={12} />
                  <span>Clear</span>
                </button>

                <button
                  onClick={() => setIsExpanded(false)}
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    background: "rgba(255,255,255,0.1)",
                    border: "none",
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Item list */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              {items.map(({ item, count }) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "rgba(255, 255, 255, 0.06)",
                    backdropFilter: "blur(12px)",
                    padding: "12px 16px",
                    borderRadius: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "0.94rem" }}>
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.82rem",
                        color: "#FF5500",
                        fontWeight: 900,
                        marginTop: "2px",
                      }}
                    >
                      ₹{item.price} × {count} = ₹{item.price * count}
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button
                      onClick={() => onUpdateCount(item.id, -1)}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        background: "rgba(255, 255, 255, 0.12)",
                        color: "#FFFFFF",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Minus size={14} />
                    </button>
                    <span
                      style={{
                        fontWeight: 900,
                        minWidth: "22px",
                        textAlign: "center",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {count}
                    </span>
                    <button
                      onClick={() => onUpdateCount(item.id, 1)}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        background: "#FF5500",
                        color: "#FFFFFF",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ============================================================ */}
            {/* WHATSAPP ORDER DETAILS CONFIGURATION                         */}
            {/* ============================================================ */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "20px",
                padding: "16px",
                marginBottom: "20px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div
                style={{
                  fontSize: "0.74rem",
                  fontWeight: 900,
                  color: "#FF5500",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                Choose Order Method:
              </div>

              {/* Order Type Toggle */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                  marginBottom: "14px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOrderType("takeaway")}
                  style={{
                    padding: "9px 12px",
                    borderRadius: "12px",
                    background:
                      orderType === "takeaway"
                        ? "linear-gradient(135deg, #FF6F00 0%, #FF5500 100%)"
                        : "rgba(255, 255, 255, 0.08)",
                    color: "#FFFFFF",
                    border:
                      orderType === "takeaway"
                        ? "1.5px solid rgba(255, 255, 255, 0.5)"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                    fontSize: "0.8rem",
                    fontWeight: 850,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    transition: "all 0.15s ease",
                  }}
                >
                  <MapPin size={14} />
                  <span>Takeaway (Pickup)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType("delivery")}
                  style={{
                    padding: "9px 12px",
                    borderRadius: "12px",
                    background:
                      orderType === "delivery"
                        ? "linear-gradient(135deg, #FF6F00 0%, #FF5500 100%)"
                        : "rgba(255, 255, 255, 0.08)",
                    color: "#FFFFFF",
                    border:
                      orderType === "delivery"
                        ? "1.5px solid rgba(255, 255, 255, 0.5)"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                    fontSize: "0.8rem",
                    fontWeight: 850,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    transition: "all 0.15s ease",
                  }}
                >
                  <ShoppingBag size={14} />
                  <span>Doorstep Delivery</span>
                </button>
              </div>

              {/* Name Input */}
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.14)",
                    color: "#FFFFFF",
                    fontSize: "0.85rem",
                    outline: "none",
                  }}
                />
              </div>

              {/* Delivery Address if Delivery selected */}
              {orderType === "delivery" && (
                <div style={{ marginBottom: "10px" }}>
                  <input
                    type="text"
                    placeholder="Delivery Location / Landmark in Kottayam"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.14)",
                      color: "#FFFFFF",
                      fontSize: "0.85rem",
                      outline: "none",
                    }}
                  />
                </div>
              )}

              {/* Special Note */}
              <div>
                <input
                  type="text"
                  placeholder="Special instructions (e.g. Extra raita, less spicy)"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.14)",
                    color: "#FFFFFF",
                    fontSize: "0.85rem",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* PRIMARY ACTION: SEND ORDER ON WHATSAPP */}
            <motion.a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: "100%",
                padding: "16px 24px",
                borderRadius: "16px",
                // LIQUID GLASS WHATSAPP PRIMARY BUTTON
                background: "linear-gradient(135deg, #25D366 0%, #1EBE5B 100%)",
                color: "#FFFFFF",
                fontSize: "1rem",
                fontWeight: 950,
                fontFamily: "var(--font-display)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                boxShadow:
                  "0 14px 35px rgba(37, 211, 102, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.5)",
                border: "1.5px solid rgba(255, 255, 255, 0.4)",
                cursor: "pointer",
                marginBottom: "12px",
              }}
            >
              <WhatsAppIcon size={22} color="#FFFFFF" />
              <span>Send Order on WhatsApp (₹{totalPrice})</span>
              <ArrowRight size={18} />
            </motion.a>

            {/* Secondary: Swiggy & Zomato links */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              <a
                href="https://www.swiggy.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "rgba(252, 128, 25, 0.15)",
                  color: "#FC8019",
                  border: "1px solid rgba(252, 128, 25, 0.3)",
                  padding: "11px",
                  borderRadius: "14px",
                  fontWeight: 800,
                  fontSize: "0.82rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  textDecoration: "none",
                }}
              >
                <span>Checkout on Swiggy</span>
                <ExternalLink size={13} />
              </a>

              <a
                href="https://www.zomato.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "rgba(226, 55, 68, 0.15)",
                  color: "#E23744",
                  border: "1px solid rgba(226, 55, 68, 0.3)",
                  padding: "11px",
                  borderRadius: "14px",
                  fontWeight: 800,
                  fontSize: "0.82rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  textDecoration: "none",
                }}
              >
                <span>Checkout on Zomato</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pill Summary Bar with Liquid Glass */}
      <motion.div
        layout
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          // THE LIQUID GLASS PILL
          background: "rgba(35, 30, 30, 0.88)",
          backdropFilter: "blur(28px) saturate(210%)",
          WebkitBackdropFilter: "blur(28px) saturate(210%)",
          color: "#FFFFFF",
          borderRadius: "100px",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow:
            "0 18px 45px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
          border: "1.5px solid rgba(255, 255, 255, 0.2)",
          cursor: "pointer",
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FF6F00 0%, #FF5500 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 950,
              fontSize: "0.95rem",
              boxShadow: "0 4px 12px rgba(255, 85, 0, 0.4)",
            }}
          >
            {totalItems}
          </div>
          <div>
            <div
              style={{
                fontWeight: 900,
                fontSize: "0.92rem",
                fontFamily: "var(--font-display)",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
              }}
            >
              {totalItems} Item{totalItems > 1 ? "s" : ""} in Tray
            </div>
            <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}>
              Tap to WhatsApp Checkout
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              fontSize: "1.25rem",
              fontWeight: 950,
              color: "#FF5500",
              fontFamily: "var(--font-display)",
            }}
          >
            ₹{totalPrice}
          </div>

          <div
            style={{
              background: "#25D366",
              color: "#FFFFFF",
              padding: "8px 16px",
              borderRadius: "100px",
              fontSize: "0.82rem",
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 6px 18px rgba(37, 211, 102, 0.35)",
            }}
          >
            <WhatsAppIcon size={15} color="#FFFFFF" />
            <span>Order</span>
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .order-drawer-container {
            bottom: calc(82px + env(safe-area-inset-bottom, 0px)) !important;
          }
        }
        @media (max-width: 600px) {
          .order-drawer-container {
            width: 95% !important;
          }
          .expanded-tray-card {
            padding: 18px 14px !important;
            border-radius: 24px !important;
            max-height: 70vh !important;
          }
        }
      `}</style>
    </div>
  );
}

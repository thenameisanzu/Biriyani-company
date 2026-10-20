"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import { ArrowUpRight, Send, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer
      style={{
        background: "linear-gradient(145deg, #FF6500 0%, #FF5000 100%)",
        color: "#FFFFFF",
        paddingTop: "90px",
        paddingBottom: "40px",
        position: "relative",
      }}
    >
      <div
        className="footer-container"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 32px",
        }}
      >
        {/* Main Footer Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 0.8fr 0.8fr 1.2fr",
            gap: "50px",
            marginBottom: "70px",
          }}
          className="footer-grid"
        >
          {/* Brand Col */}
          <div>
            <div style={{ marginBottom: "24px" }}>
              <Logo variant="white" layout="stacked" />
            </div>

            <p
              style={{
                fontSize: "0.98rem",
                color: "rgba(255, 255, 255, 0.88)",
                lineHeight: 1.65,
                maxWidth: "360px",
                marginBottom: "20px",
                textAlign: "center",
                margin: "0 auto 20px auto",
              }}
            >
              Real slow dum cooking. Pure cow ghee, 36 handpicked spices, and steaming hot dum served fresh in every single bowl.
            </p>

            <div
              style={{
                fontSize: "0.82rem",
                color: "#FFFFFF",
                fontWeight: 900,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              PURE CRAFT • REAL DUM • ESTD 2025
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              style={{
                fontSize: "0.88rem",
                fontWeight: 900,
                color: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginBottom: "20px",
                fontFamily: "var(--font-display)",
              }}
            >
              Explore
            </h4>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li>
                <a
                  href="#menu"
                  style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.95rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                >
                  Signature Bowls
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.95rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                >
                  Takeaway Tubs
                </a>
              </li>
              <li>
                <a
                  href="tel:8089080342"
                  style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.95rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                >
                  Call 8089080342
                </a>
              </li>
            </ul>
          </div>

          {/* Online Order */}
          <div>
            <h4
              style={{
                fontSize: "0.88rem",
                fontWeight: 900,
                color: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginBottom: "20px",
                fontFamily: "var(--font-display)",
              }}
            >
              Order Online
            </h4>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li>
                <a
                  href="https://www.swiggy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#FFFFFF",
                    fontSize: "0.95rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontWeight: 700,
                  }}
                >
                  <span>Swiggy Delivery</span>
                  <ArrowUpRight size={14} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.zomato.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#FFFFFF",
                    fontSize: "0.95rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontWeight: 700,
                  }}
                >
                  <span>Zomato Delivery</span>
                  <ArrowUpRight size={14} />
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.95rem" }}
                >
                  Takeaway Counters
                </a>
              </li>
              <li>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>
                  Hours: 11:30 AM – 11:30 PM
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              style={{
                fontSize: "0.88rem",
                fontWeight: 900,
                color: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginBottom: "20px",
                fontFamily: "var(--font-display)",
              }}
            >
              Join The Circle
            </h4>

            <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "0.92rem", lineHeight: 1.5, marginBottom: "16px" }}>
              Receive exclusive vouchers, fresh batch announcements, and seasonal specials.
            </p>

            <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "8px" }}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  padding: "12px 18px",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  color: "#FFFFFF",
                  fontSize: "0.9rem",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#FFFFFF",
                  color: "#FF5500",
                  padding: "12px 20px",
                  borderRadius: "12px",
                  fontWeight: 900,
                  fontSize: "0.88rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  transition: "all 0.2s ease",
                }}
              >
                {subscribed ? <Check size={16} /> : <Send size={16} />}
              </button>
            </form>
            {subscribed && (
              <div style={{ color: "#FFFFFF", fontWeight: 700, fontSize: "0.82rem", marginTop: "8px" }}>
                ✓ Subscribed! Welcome to the Biryani Co. family!
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: "28px",
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "0.85rem",
            color: "rgba(255, 255, 255, 0.75)",
          }}
        >
          <div>
            &copy; 2025 <strong>the BIRYANI CO.</strong> All rights reserved.
          </div>

          <div style={{ display: "flex", gap: "24px" }}>
            <a href="#" style={{ color: "rgba(255,255,255,0.75)" }}>
              Privacy Policy
            </a>
            <a href="#" style={{ color: "rgba(255,255,255,0.75)" }}>
              Terms of Service
            </a>
            <a href="#location" style={{ color: "rgba(255,255,255,0.75)" }}>
              Store Locator
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          footer {
            padding-bottom: 110px !important;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 600px) {
          footer {
            padding-bottom: 120px !important;
          }
          .footer-container {
            padding: 0 16px !important;
          }
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </footer>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, Phone, Car, Sparkles, ExternalLink } from "lucide-react";

export default function MapSection() {
  // Google Maps Universal Link and Embed for Kanjikuzhi, Kottayam
  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=the+Biryani+Co+CSI+Shopping+Complex+Kanjikuzhi+Kottayam";

  return (
    <section
      id="location"
      style={{
        padding: "120px 0",
        background: "#FFFFFF",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 32px",
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 60px auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "100px",
              background: "#FFF4ED",
              color: "#FF5500",
              fontSize: "0.85rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "16px",
              border: "1px solid rgba(255,85,0,0.3)",
            }}
          >
            <MapPin size={15} />
            <span>Store Location</span>
          </div>

          <h2
            className="huge-section-title"
            style={{
              color: "#2C2727",
              marginBottom: "16px",
            }}
          >
            VISIT OUR COUNTER <br />
            <span style={{ color: "#FF5500" }}>KANJIKUZHI, KOTTAYAM</span>
          </h2>

          <p style={{ fontSize: "1.15rem", color: "#3E3939", lineHeight: 1.65 }}>
            Pick up your piping hot black takeaway bucket directly from our kitchen counter or order for express home delivery.
          </p>
        </div>

        {/* Map & Information Dual Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "36px",
            alignItems: "stretch",
          }}
          className="map-grid"
        >
          {/* Interactive Google Map Embed */}
          <div
            style={{
              position: "relative",
              borderRadius: "32px",
              overflow: "hidden",
              minHeight: "440px",
              boxShadow: "0 20px 50px rgba(44, 39, 39, 0.08)",
              border: "1px solid rgba(62, 57, 57, 0.12)",
              background: "#F5F3EF",
            }}
          >
            <iframe
              title="the Biryani Co. Location in Kanjikuzhi, Kottayam on Google Maps"
              width="100%"
              height="100%"
              style={{
                border: 0,
                minHeight: "440px",
              }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=CSI%20Shopping%20Complex,%20Kanjikuzhi,%20Kottayam,%20Kerala&t=&z=15&ie=UTF8&iwloc=&output=embed"
            />

            {/* Floating Map Pin Badge */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                background: "rgba(44, 39, 39, 0.92)",
                backdropFilter: "blur(12px)",
                color: "#FFFFFF",
                padding: "12px 20px",
                borderRadius: "16px",
                border: "1px solid rgba(255, 85, 0, 0.4)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#FF5500",
                  boxShadow: "0 0 10px #FF5500",
                }}
              />
              <span style={{ fontWeight: 800, fontSize: "0.88rem", fontFamily: "var(--font-display)" }}>
                the BIRYANI CO. • Kanjikuzhi Branch
              </span>
            </div>

            {/* Bottom Floating Directions Button */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
              }}
            >
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#FF5500",
                  color: "#FFFFFF",
                  padding: "12px 22px",
                  borderRadius: "100px",
                  fontWeight: 900,
                  fontSize: "0.88rem",
                  fontFamily: "var(--font-display)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 8px 24px rgba(255, 85, 0, 0.45)",
                  transition: "all 0.2s ease",
                }}
              >
                <Navigation size={16} />
                <span>Open in Maps</span>
              </a>
            </div>
          </div>

          {/* Location & Visiting Details Card in Liquid Glass */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            style={{
              background: "rgba(255, 255, 255, 0.82)",
              backdropFilter: "blur(32px) saturate(210%)",
              WebkitBackdropFilter: "blur(32px) saturate(210%)",
              borderRadius: "32px",
              padding: "40px",
              border: "1.5px solid rgba(255, 255, 255, 0.95)",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.06), inset 0 1px 2px #FFFFFF",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* Address */}
              <div style={{ marginBottom: "28px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#FF5500",
                    fontSize: "0.82rem",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "8px",
                  }}
                >
                  <MapPin size={16} />
                  <span>Takeaway Counter Address</span>
                </div>
                <h3
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: 950,
                    color: "#2C2727",
                    fontFamily: "var(--font-display)",
                    marginBottom: "8px",
                  }}
                >
                  the BIRYANI CO. Takeaway Hub
                </h3>
                <p style={{ color: "#3E3939", fontSize: "1rem", lineHeight: 1.6 }}>
                  CSI Shopping Complex, Muttambalam Road, Kanjikuzhi, Kottayam, Kerala 686004
                </p>
              </div>

              {/* Operating Hours */}
              <div style={{ marginBottom: "28px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#FF5500",
                    fontSize: "0.82rem",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "8px",
                  }}
                >
                  <Clock size={16} />
                  <span>Kitchen Timings</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontWeight: 700, color: "#2C2727", fontSize: "0.95rem" }}>
                    Daily:
                  </span>
                  <span style={{ fontWeight: 900, color: "#FF5500", fontSize: "0.95rem" }}>
                    11:30 AM – 11:30 PM
                  </span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "#595353" }}>
                  Hot takeaway buckets packed fresh for pickup and delivery.
                </p>
              </div>
            </div>

            {/* Direct Calls & Action */}
            <div style={{ display: "flex", gap: "12px" }}>
              <a
                href="tel:8089080342"
                style={{
                  flex: 1,
                  background: "#2C2727",
                  color: "#FFFFFF",
                  padding: "16px",
                  borderRadius: "16px",
                  fontWeight: 900,
                  fontSize: "0.95rem",
                  fontFamily: "var(--font-display)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                }}
              >
                <Phone size={18} color="#FF5500" />
                <span>Call 8089080342</span>
              </a>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#FF5500",
                  color: "#FFFFFF",
                  padding: "16px 24px",
                  borderRadius: "16px",
                  fontWeight: 900,
                  fontSize: "0.95rem",
                  fontFamily: "var(--font-display)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  boxShadow: "0 6px 18px rgba(255, 85, 0, 0.35)",
                }}
              >
                <span>Maps</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Responsive Map Grid */}
      <style jsx global>{`
        @media (max-width: 1024px) {
          #location {
            padding: 80px 0 !important;
          }
          .map-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          #location {
            padding: 60px 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

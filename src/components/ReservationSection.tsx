"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, Clock, Sparkles, Send, CheckCircle, MessageSquare, Phone, Mail } from "lucide-react";

export default function ReservationSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "2 Guests",
    date: "",
    time: "07:30 PM",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello the Biryani Co.! I would like to order a Takeaway Bucket for ${formData.guests} on ${formData.date || "today"}.`
  );

  return (
    <section
      id="reservation"
      style={{
        padding: "120px 0",
        background: "linear-gradient(180deg, #FAF8F5 0%, #FFFFFF 100%)",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 24px",
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
              color: "#FF7517",
              fontSize: "0.85rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "16px",
              border: "1px solid rgba(255,117,23,0.3)",
            }}
          >
            <Calendar size={15} />
            <span>Table Booking &amp; Enquiries</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
              fontWeight: 900,
              color: "#2C2727",
              fontFamily: "var(--font-display)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "16px",
            }}
          >
            Reserve Your Royal Seat <br />
            <span
              style={{
                background: "linear-gradient(135deg, #FF7517 0%, #E85900 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Or Reach Out To Us
            </span>
          </h2>

          <p style={{ fontSize: "1.1rem", color: "#3E3939", lineHeight: 1.65 }}>
            Booking in advance guarantees that your Dum Handi is unsealed fresh as you take your seat. We also take bulk wedding, party, and corporate catering orders.
          </p>
        </div>

        {/* Dual Layout: Reservation Form & Contact Channel */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 0.7fr",
            gap: "36px",
          }}
          className="reservation-grid"
        >
          {/* Reservation Form Card */}
          <div
            className="reservation-form-card"
            style={{
              background: "#FFFFFF",
              borderRadius: "32px",
              padding: "44px",
              boxShadow: "0 20px 50px rgba(44, 39, 39, 0.06)",
              border: "1px solid rgba(62, 57, 57, 0.1)",
            }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    textAlign: "center",
                    padding: "40px 20px",
                  }}
                >
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      background: "#FFF4ED",
                      border: "2px solid #FF7517",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px auto",
                    }}
                  >
                    <CheckCircle size={36} color="#FF7517" />
                  </div>

                  <h3
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 900,
                      color: "#2C2727",
                      fontFamily: "var(--font-display)",
                      marginBottom: "10px",
                    }}
                  >
                    Table Reservation Confirmed!
                  </h3>

                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#3E3939",
                      lineHeight: 1.6,
                      maxWidth: "480px",
                      margin: "0 auto 24px auto",
                    }}
                  >
                    Thank you, <strong>{formData.name}</strong>. We have allocated a prime dining table for <strong>{formData.guests}</strong>. A confirmation SMS and WhatsApp message have been dispatched to your mobile.
                  </p>

                  <button
                    onClick={() => setSubmitted(false)}
                    style={{
                      background: "#2C2727",
                      color: "#FFFFFF",
                      padding: "12px 28px",
                      borderRadius: "100px",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                    }}
                  >
                    Book Another Table
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "22px" }}
                >
                  <h3
                    style={{
                      fontSize: "1.45rem",
                      fontWeight: 800,
                      color: "#2C2727",
                      fontFamily: "var(--font-display)",
                      marginBottom: "4px",
                    }}
                  >
                    Quick Table Reservation
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "#595353", marginTop: "-14px" }}>
                    No advance payment required. Instant confirmation via SMS.
                  </p>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "18px",
                    }}
                    className="form-row"
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          color: "#2C2727",
                          marginBottom: "8px",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Nambiar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "14px 18px",
                          borderRadius: "14px",
                          border: "1px solid rgba(62, 57, 57, 0.15)",
                          outline: "none",
                          fontSize: "0.95rem",
                          background: "#FDFCF9",
                          color: "#2C2727",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          color: "#2C2727",
                          marginBottom: "8px",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "14px 18px",
                          borderRadius: "14px",
                          border: "1px solid rgba(62, 57, 57, 0.15)",
                          outline: "none",
                          fontSize: "0.95rem",
                          background: "#FDFCF9",
                          color: "#2C2727",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: "18px",
                    }}
                    className="form-row-three"
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          color: "#2C2727",
                          marginBottom: "8px",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        Number of Guests
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "14px 18px",
                          borderRadius: "14px",
                          border: "1px solid rgba(62, 57, 57, 0.15)",
                          outline: "none",
                          fontSize: "0.95rem",
                          background: "#FDFCF9",
                          color: "#2C2727",
                        }}
                      >
                        <option value="1 Guest">1 Guest</option>
                        <option value="2 Guests">2 Guests (Couple)</option>
                        <option value="3-4 Guests">3 - 4 Guests (Family)</option>
                        <option value="5-8 Guests">5 - 8 Guests (Group)</option>
                        <option value="10+ Party">10+ Guests (Celebration)</option>
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          color: "#2C2727",
                          marginBottom: "8px",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "14px 18px",
                          borderRadius: "14px",
                          border: "1px solid rgba(62, 57, 57, 0.15)",
                          outline: "none",
                          fontSize: "0.95rem",
                          background: "#FDFCF9",
                          color: "#2C2727",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          color: "#2C2727",
                          marginBottom: "8px",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        Time Slot
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "14px 18px",
                          borderRadius: "14px",
                          border: "1px solid rgba(62, 57, 57, 0.15)",
                          outline: "none",
                          fontSize: "0.95rem",
                          background: "#FDFCF9",
                          color: "#2C2727",
                        }}
                      >
                        <option value="12:30 PM">12:30 PM (Lunch Dum)</option>
                        <option value="01:30 PM">01:30 PM (Lunch Dum)</option>
                        <option value="02:30 PM">02:30 PM (Late Lunch)</option>
                        <option value="07:30 PM">07:30 PM (Royal Dinner)</option>
                        <option value="08:30 PM">08:30 PM (Prime Dinner)</option>
                        <option value="09:30 PM">09:30 PM (Late Dinner)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        color: "#2C2727",
                        marginBottom: "8px",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      Special Requests / Dietary Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Please arrange live handi unsealing at table, extra Mirchi Ka Salan, birthday setup"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "14px 18px",
                        borderRadius: "14px",
                        border: "1px solid rgba(62, 57, 57, 0.15)",
                        outline: "none",
                        fontSize: "0.95rem",
                        background: "#FDFCF9",
                        color: "#2C2727",
                        resize: "vertical",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      background: "#FF7517",
                      color: "#FFFFFF",
                      padding: "16px 32px",
                      borderRadius: "14px",
                      fontWeight: 800,
                      fontSize: "1rem",
                      boxShadow: "0 10px 25px rgba(255, 117, 23, 0.38)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      transition: "all 0.25s ease",
                      marginTop: "6px",
                    }}
                  >
                    {isSubmitting ? (
                      <span>Reserving Table...</span>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Confirm Table Reservation</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Direct Contact & WhatsApp Card */}
          <div
            className="reservation-contact-card"
            style={{
              background: "linear-gradient(135deg, #FF6500 0%, #FF5000 100%)",
              color: "#FFFFFF",
              borderRadius: "32px",
              padding: "40px",
              border: "1.5px solid rgba(255, 255, 255, 0.25)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 900,
                  letterSpacing: "0.15em",
                  color: "#FFFFFF",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Instant Connect
              </span>

              <h3
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 900,
                  fontFamily: "var(--font-display)",
                  marginBottom: "16px",
                  lineHeight: 1.2,
                }}
              >
                Direct Kitchen Helpdesk
              </h3>

              <p
                style={{
                  color: "rgba(255, 255, 255, 0.75)",
                  fontSize: "0.92rem",
                  lineHeight: 1.6,
                  marginBottom: "30px",
                }}
              >
                Planning a large wedding banquet, corporate lunch box order, or have questions about spice customization? We are available 7 days a week.
              </p>

              {/* Direct WhatsApp Chat Trigger */}
              <a
                href={`https://wa.me/918089080342?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#25D366",
                  color: "#FFFFFF",
                  padding: "16px 24px",
                  borderRadius: "16px",
                  fontWeight: 900,
                  fontSize: "0.95rem",
                  fontFamily: "var(--font-display)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow: "0 10px 25px rgba(37, 211, 102, 0.35)",
                  marginBottom: "24px",
                  transition: "all 0.2s ease",
                }}
              >
                <MessageSquare size={20} />
                <span>WhatsApp Order (8089080342)</span>
              </a>

              {/* Direct channels */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <a
                  href="tel:8089080342"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    color: "#FFFFFF",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      background: "rgba(255, 255, 255, 0.22)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Phone size={18} color="#FFFFFF" />
                  </div>
                  <span>+91 80890 80342</span>
                </a>

                <a
                  href="mailto:orders@biryanico.com"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    color: "#FFFFFF",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      background: "rgba(255, 255, 255, 0.22)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Mail size={18} color="#FFFFFF" />
                  </div>
                  <span>orders@biryanico.com</span>
                </a>
              </div>
            </div>

            {/* Bulk Catering Banner */}
            <div
              style={{
                marginTop: "30px",
                padding: "18px",
                borderRadius: "18px",
                background: "rgba(255, 255, 255, 0.18)",
                border: "1.5px dashed rgba(255, 255, 255, 0.5)",
              }}
            >
              <div style={{ fontWeight: 900, fontSize: "0.9rem", color: "#FFFFFF", marginBottom: "4px" }}>
                BULK DUM BOWL CATERING (25 - 2000 PAX)
              </div>
              <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.9)" }}>
                Authentic coal-fired dum handis cooked on-site and served piping hot.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive adjustments */}
      <style jsx global>{`
        @media (max-width: 900px) {
          #reservation {
            padding: 80px 0 !important;
          }
          .reservation-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row,
          .form-row-three {
            grid-template-columns: 1fr !important;
          }
          .reservation-form-card,
          .reservation-contact-card {
            padding: 32px 24px !important;
          }
        }
        @media (max-width: 600px) {
          #reservation {
            padding: 60px 0 !important;
          }
          .reservation-form-card,
          .reservation-contact-card {
            padding: 24px 18px !important;
            border-radius: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}

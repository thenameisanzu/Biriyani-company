"use client";

import React, { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  UtensilsCrossed,
  ShoppingBag,
  MapPin,
  Phone,
  Sparkles,
  Menu as MenuIcon,
  X as CloseIcon,
  ArrowRight,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  isAction?: boolean;
}

const navItems: NavItem[] = [
  { id: "hero", label: "Home", href: "#hero", icon: Home },
  { id: "menu", label: "Menu", href: "#menu", icon: UtensilsCrossed },
  { id: "delivery", label: "Delivery", href: "#delivery", icon: ShoppingBag },
  { id: "location", label: "Location", href: "#location", icon: MapPin },
  { id: "call", label: "Call Us", href: "tel:8089080342", icon: Phone, isAction: true },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  // Detect scroll state and active section (Throttled with rAF & state guards to prevent scroll jank)
  useEffect(() => {
    let ticking = false;
    let lastScrolled = false;
    let currentTab = "hero";

    const updateScroll = () => {
      const scrolled = window.scrollY > 40;
      if (scrolled !== lastScrolled) {
        lastScrolled = scrolled;
        setIsScrolled(scrolled);
      }

      const sections = ["location", "delivery", "menu", "hero"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            if (sectionId !== currentTab) {
              currentTab = sectionId;
              setActiveTab(sectionId);
            }
            break;
          }
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Slide / Touch gesture on the bottom dock
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!dockRef.current || e.touches.length === 0) return;
    const touchX = e.touches[0].clientX;

    // Check which item the touch is currently over
    for (const item of navItems) {
      const el = itemRefs.current[item.id];
      if (el) {
        const rect = el.getBoundingClientRect();
        if (touchX >= rect.left && touchX <= rect.right) {
          if (activeTab !== item.id) {
            setActiveTab(item.id);
          }
          break;
        }
      }
    }
  };

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    setActiveTab(item.id);
    setMobileMenuOpen(false);
    if (item.href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(item.href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* ============================================================ */}
      {/* 1. TOP HEADER (WITH LIQUID GLASS MENU & ANIMATIONS)           */}
      {/* ============================================================ */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "all 0.35s ease",
          background: isScrolled
            ? "rgba(255, 255, 255, 0.88)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(24px) saturate(200%)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(24px) saturate(200%)" : "none",
          borderBottom: isScrolled
            ? "1px solid rgba(44, 39, 39, 0.08)"
            : "none",
          boxShadow: isScrolled
            ? "0 10px 30px rgba(0, 0, 0, 0.06)"
            : "none",
          padding: isScrolled ? "12px 0" : "20px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand Logo */}
          <a href="#" style={{ display: "inline-block", textDecoration: "none" }}>
            <Logo variant={isScrolled ? "orange" : "white"} />
          </a>

          {/* ============================================================ */}
          {/* DESKTOP LIQUID GLASS NAVIGATION CAPSULE (WITH ANIMATIONS)    */}
          {/* ============================================================ */}
          <nav
            className="desktop-only-nav"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "5px 6px",
              borderRadius: "100px",
              // LIQUID GLASS SHELL
              background: isScrolled
                ? "rgba(255, 255, 255, 0.72)"
                : "rgba(255, 255, 255, 0.18)",
              backdropFilter: "blur(28px) saturate(210%)",
              WebkitBackdropFilter: "blur(28px) saturate(210%)",
              border: isScrolled
                ? "1.5px solid rgba(255, 85, 0, 0.16)"
                : "1.5px solid rgba(255, 255, 255, 0.45)",
              boxShadow: isScrolled
                ? "0 12px 35px rgba(0, 0, 0, 0.07), inset 0 1px 1px rgba(255, 255, 255, 0.95)"
                : "0 12px 35px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.7)",
            }}
            onMouseLeave={() => setHoveredTab(null)}
          >
            {navItems
              .filter((item) => !item.isAction)
              .map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const isHovered = hoveredTab === item.id;

                // Color calculations based on scroll & active state
                let textColor = isScrolled ? "#3E3939" : "#FFFFFF";
                if (isActive) {
                  textColor = isScrolled ? "#FFFFFF" : "#FF5500";
                }

                return (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleTabClick(e, item)}
                    onMouseEnter={() => setHoveredTab(item.id)}
                    whileHover={{ y: -1, scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      position: "relative",
                      padding: "8px 18px",
                      borderRadius: "100px",
                      fontSize: "0.82rem",
                      fontWeight: 550,
                      fontFamily: "var(--font-display)",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      color: textColor,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "7px",
                      cursor: "pointer",
                      zIndex: 2,
                      userSelect: "none",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {/* Active Sliding Liquid Pill Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="top-nav-liquid-active"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 30,
                        }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "100px",
                          background: isScrolled
                            ? "linear-gradient(135deg, #FF6F00 0%, #FF5500 50%, #FF3D00 100%)"
                            : "#FFFFFF",
                          boxShadow: isScrolled
                            ? "0 6px 20px rgba(255, 85, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.5)"
                            : "0 8px 22px rgba(0, 0, 0, 0.16)",
                          zIndex: -1,
                        }}
                      />
                    )}

                    {/* Hover Liquid Glass Highlight (when not active) */}
                    {!isActive && isHovered && (
                      <motion.div
                        layoutId="top-nav-liquid-hover"
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 32,
                        }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "100px",
                          background: isScrolled
                            ? "rgba(44, 39, 39, 0.06)"
                            : "rgba(255, 255, 255, 0.22)",
                          backdropFilter: "blur(8px)",
                          zIndex: -1,
                        }}
                      />
                    )}

                    <motion.span
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        rotate: isActive ? [0, -6, 6, 0] : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ display: "inline-flex", alignItems: "center" }}
                    >
                      <Icon
                        size={15}
                        color={
                          isActive
                            ? isScrolled
                              ? "#FFFFFF"
                              : "#FF5500"
                            : isScrolled
                            ? "#FF5500"
                            : "#FFFFFF"
                        }
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                    </motion.span>
                    <span>{item.label}</span>
                  </motion.a>
                );
              })}
          </nav>

          {/* Desktop Right Side Quick Actions: Liquid Glass Call & Order */}
          <div
            className="desktop-only-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* Liquid Glass Hotline Pill */}
            <motion.a
              href="tel:8089080342"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "8px 18px",
                borderRadius: "100px",
                background: isScrolled
                  ? "rgba(44, 39, 39, 0.05)"
                  : "rgba(255, 255, 255, 0.18)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                color: isScrolled ? "#2C2727" : "#FFFFFF",
                fontSize: "0.82rem",
                fontWeight: 600,
                fontFamily: "var(--font-display)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: isScrolled
                  ? "1px solid rgba(44, 39, 39, 0.1)"
                  : "1.5px solid rgba(255, 255, 255, 0.45)",
                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.06)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <Phone size={14} />
              <span>8089080342</span>
            </motion.a>

            {/* Liquid Glass Primary Order Button */}
            <motion.a
              href="#menu"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "9px 22px",
                borderRadius: "100px",
                background: isScrolled
                  ? "linear-gradient(135deg, #FF6F00 0%, #FF5500 100%)"
                  : "#FFFFFF",
                color: isScrolled ? "#FFFFFF" : "#FF5500",
                fontSize: "0.84rem",
                fontWeight: 650,
                fontFamily: "var(--font-display)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                boxShadow: isScrolled
                  ? "0 8px 24px rgba(255, 85, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4)"
                  : "0 8px 24px rgba(0, 0, 0, 0.16)",
                border: "none",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              <UtensilsCrossed size={14} />
              <span>Order Now</span>
            </motion.a>
          </div>

          {/* ============================================================ */}
          {/* MOBILE & IPAD TOP HEADER CONTROLS                            */}
          {/* ============================================================ */}
          <div
            className="mobile-header-actions"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {/* Phone Quick Pill */}
            <a
              href="tel:8089080342"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "7px 14px",
                borderRadius: "100px",
                background: isScrolled
                  ? "#FF5500"
                  : "rgba(255, 255, 255, 0.22)",
                backdropFilter: "blur(16px)",
                color: "#FFFFFF",
                fontSize: "0.78rem",
                fontWeight: 900,
                fontFamily: "var(--font-display)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: isScrolled ? "none" : "1px solid rgba(255, 255, 255, 0.45)",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
              }}
            >
              <Phone size={13} />
              <span>Call</span>
            </a>

            {/* Liquid Glass Mobile Menu Toggle Button */}
            <motion.button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              whileTap={{ scale: 0.9 }}
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: isScrolled
                  ? "rgba(44, 39, 39, 0.08)"
                  : "rgba(255, 255, 255, 0.22)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: isScrolled
                  ? "1px solid rgba(44, 39, 39, 0.12)"
                  : "1.5px solid rgba(255, 255, 255, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isScrolled ? "#2C2727" : "#FFFFFF",
                cursor: "pointer",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
              }}
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <CloseIcon size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <MenuIcon size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* MOBILE & IPAD TOP LIQUID GLASS DROP-DOWN DRAWER              */}
        {/* ============================================================ */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              style={{
                position: "absolute",
                top: "100%",
                left: "16px",
                right: "16px",
                marginTop: "8px",
                // THE LIQUID GLASS EFFECT
                background: "rgba(255, 255, 255, 0.88)",
                backdropFilter: "blur(36px) saturate(220%)",
                WebkitBackdropFilter: "blur(36px) saturate(220%)",
                border: "1.5px solid rgba(255, 255, 255, 0.95)",
                borderRadius: "24px",
                padding: "16px",
                boxShadow:
                  "0 25px 55px rgba(0, 0, 0, 0.22), inset 0 1px 2px rgba(255, 255, 255, 0.95)",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                zIndex: 101,
              }}
            >
              {navItems.map((item, idx) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleTabClick(e, item)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      borderRadius: "14px",
                      background: isActive
                        ? "linear-gradient(135deg, #FF6F00 0%, #FF5500 100%)"
                        : "rgba(44, 39, 39, 0.04)",
                      color: isActive ? "#FFFFFF" : "#2C2727",
                      textDecoration: "none",
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: "0.92rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      boxShadow: isActive
                        ? "0 6px 18px rgba(255, 85, 0, 0.35)"
                        : "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Icon
                        size={17}
                        color={isActive ? "#FFFFFF" : "#FF5500"}
                        strokeWidth={2.4}
                      />
                      <span>{item.label}</span>
                    </div>

                    <ArrowRight
                      size={15}
                      color={isActive ? "#FFFFFF" : "#A39E9E"}
                    />
                  </motion.a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ============================================================ */}
      {/* 2. LIQUID GLASS BOTTOM APP DOCK (Mobile & iPad Exclusive)   */}
      {/* ============================================================ */}
      <div
        className="mobile-bottom-dock-wrapper"
        style={{
          position: "fixed",
          bottom: "max(14px, env(safe-area-inset-bottom))",
          left: 0,
          right: 0,
          zIndex: 899,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
          padding: "0 16px",
        }}
      >
        <motion.div
          ref={dockRef}
          onTouchMove={handleTouchMove}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          style={{
            pointerEvents: "auto",
            position: "relative",
            width: "100%",
            maxWidth: "520px",
            // THE LIQUID GLASS EFFECT
            background: "rgba(255, 255, 255, 0.78)",
            backdropFilter: "blur(32px) saturate(210%)",
            WebkitBackdropFilter: "blur(32px) saturate(210%)",
            border: "1.5px solid rgba(255, 255, 255, 0.9)",
            borderRadius: "100px",
            padding: "6px 8px",
            boxShadow:
              "0 20px 50px rgba(0, 0, 0, 0.18), inset 0 1px 1px rgba(255, 255, 255, 0.95), 0 8px 25px rgba(255, 85, 0, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            touchAction: "pan-x",
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <motion.a
                key={item.id}
                ref={(el) => {
                  itemRefs.current[item.id] = el;
                }}
                href={item.href}
                onClick={(e) => handleTabClick(e, item)}
                whileTap={{ scale: 0.88 }}
                style={{
                  position: "relative",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "9px 4px",
                  borderRadius: "100px",
                  textDecoration: "none",
                  cursor: "pointer",
                  userSelect: "none",
                  WebkitTapHighlightColor: "transparent",
                  zIndex: 2,
                }}
              >
                {/* Sliding Liquid Active Indicator Pill */}
                {isActive && (
                  <motion.div
                    layoutId="liquid-active-pill"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 32,
                    }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "100px",
                      background:
                        "linear-gradient(135deg, #FF6F00 0%, #FF5500 50%, #FF3D00 100%)",
                      boxShadow:
                        "0 8px 22px rgba(255, 85, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.4)",
                      zIndex: -1,
                    }}
                  />
                )}

                {/* Animated Tab Icon */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.08 : 1,
                    y: isActive ? -1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "3px",
                  }}
                >
                  <Icon
                    size={20}
                    color={isActive ? "#FFFFFF" : "#595353"}
                    strokeWidth={isActive ? 2.6 : 2.1}
                  />
                </motion.div>

                {/* Tab Label */}
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: isActive ? 650 : 500,
                    fontFamily: "var(--font-display)",
                    letterSpacing: "0.03em",
                    textTransform: "uppercase",
                    color: isActive ? "#FFFFFF" : "#595353",
                    lineHeight: 1,
                    transition: "color 0.2s ease",
                  }}
                >
                  {item.label}
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      {/* Responsive Breakpoints CSS */}
      <style jsx global>{`
        /* Desktop: >= 1025px */
        @media (min-width: 1025px) {
          .mobile-bottom-dock-wrapper {
            display: none !important;
          }
          .mobile-header-actions {
            display: none !important;
          }
        }

        /* Mobile & iPad: <= 1024px */
        @media (max-width: 1024px) {
          .desktop-only-nav {
            display: none !important;
          }
          .mobile-bottom-dock-wrapper {
            display: flex !important;
          }
          .mobile-header-actions {
            display: flex !important;
          }
          body {
            padding-bottom: 90px !important;
          }
        }
      `}</style>
    </>
  );
}

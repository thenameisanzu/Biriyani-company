"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MenuItemType } from "./FoodDetailModal";
import { Plus, Check, ArrowUpRight, Phone, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "./QuickOrderDrawer";

export interface PortionOption {
  label: string;
  shortLabel: string;
  price: number;
}

export interface MenuItem {
  id: string;
  number: string;
  name: string;
  tag: string;
  category: "all" | "chicken" | "beef" | "nizami" | "veg";
  isVeg: boolean;
  desc: string;
  story: string;
  image: string;
  portions: PortionOption[];
}

export const menuDishes: MenuItem[] = [
  {
    id: "chicken-dum-biryani",
    number: "01",
    name: "Chicken Dum Biryani",
    tag: "Chef's Special Signature",
    category: "chicken",
    isVeg: false,
    desc: "Layered with pure cow ghee, long basmati grains, and 36 secret spices sealed in our iconic black tub.",
    story: "Hardwood coal dum every 45 mins. Includes boiled egg, spicy mirchi ka salan, and onion-curd raita.",
    image: "/images/realistic-black-bucket.jpg",
    portions: [
      { label: "Lite (Small Hunger)", shortLabel: "Lite", price: 139 },
      { label: "Serves 1 (Regular)", shortLabel: "Serves 1", price: 189 },
      { label: "Serves 3 (Trio Bucket)", shortLabel: "Serves 3", price: 530 },
      { label: "Serves 4 (Family Bucket)", shortLabel: "Serves 4", price: 699 },
      { label: "Serves 5 (Royal Pack)", shortLabel: "Serves 5", price: 869 },
    ],
  },
  {
    id: "buff-beef-biryani",
    number: "02",
    name: "Buff Beef Biryani",
    tag: "Chef's Sensation",
    category: "beef",
    isVeg: false,
    desc: "Tender buff cuts slow-braised in whole ground spices and coal embers for maximum aroma lock.",
    story: "Slow cooked for 4 hours until the meat melts. Packed hot in heat-locked takeaway tubs.",
    image: "/images/realistic-black-bucket.jpg",
    portions: [
      { label: "Serves 1 (Regular)", shortLabel: "Serves 1", price: 239 },
      { label: "Serves 3 (Trio Bucket)", shortLabel: "Serves 3", price: 640 },
      { label: "Serves 4 (Family Bucket)", shortLabel: "Serves 4", price: 880 },
      { label: "Serves 5 (Royal Pack)", shortLabel: "Serves 5", price: 1090 },
    ],
  },
  {
    id: "nizami-chicken-biryani",
    number: "03",
    name: "Nizami Chicken Dum",
    tag: "Hyderabadi Deccan Style",
    category: "chicken",
    isVeg: false,
    desc: "Deccan royal recipe on hardwood coal dum with saffron court-bouillon and caramelized barista.",
    story: "Layered with Kashmiri saffron milk, royal mace, and golden fried barista in a black bucket.",
    image: "/images/realistic-black-bucket.jpg",
    portions: [
      { label: "Lite (Small Hunger)", shortLabel: "Lite", price: 149 },
      { label: "Serves 1 (Regular)", shortLabel: "Serves 1", price: 199 },
      { label: "Serves 3 (Trio Bucket)", shortLabel: "Serves 3", price: 559 },
      { label: "Serves 4 (Family Bucket)", shortLabel: "Serves 4", price: 739 },
      { label: "Serves 5 (Royal Pack)", shortLabel: "Serves 5", price: 919 },
    ],
  },
  {
    id: "soya-chaap-biryani",
    number: "04",
    name: "Soya Chaap Dum Biryani",
    tag: "The Veggie Delight",
    category: "veg",
    isVeg: true,
    desc: "Juicy marinated soya chaap charred in tandoori spices over fragrant saffron basmati rice.",
    story: "Packed in our green-label takeaway tub with fresh mint raita and vegetarian salan.",
    image: "/images/menu-tub-green.jpg",
    portions: [
      { label: "Serves 1 (Takeaway Tub)", shortLabel: "Serves 1", price: 169 },
    ],
  },
  {
    id: "veg-supreme-biryani",
    number: "05",
    name: "Veg Supreme Dum Biryani",
    tag: "Chef's Masterpiece",
    category: "veg",
    isVeg: true,
    desc: "Tender cauliflower florets, crisp peas, paneer, and carrots simmered in saffron milk and pure cow ghee.",
    story: "Gentle cardamom and saffron notes served steaming hot in our iconic takeaway tub.",
    image: "/images/menu-tub-green.jpg",
    portions: [
      { label: "Serves 1 (Takeaway Tub)", shortLabel: "Serves 1", price: 139 },
    ],
  },
];

interface MenuSectionProps {
  onAddToTray: (item: MenuItemType) => void;
}

function MenuSection({ onAddToTray }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPortions, setSelectedPortions] = useState<{ [dishId: string]: number }>({
    "chicken-dum-biryani": 1,
    "buff-beef-biryani": 0,
    "nizami-chicken-biryani": 1,
    "soya-chaap-biryani": 0,
    "veg-supreme-biryani": 0,
  });
  const [addedKey, setAddedKey] = useState<string | null>(null);

  const filteredDishes =
    activeCategory === "all"
      ? menuDishes
      : menuDishes.filter((d) =>
          activeCategory === "veg" ? d.isVeg : d.category === activeCategory
        );

  const handleSelectPortion = (dishId: string, portionIdx: number) => {
    setSelectedPortions((prev) => ({
      ...prev,
      [dishId]: portionIdx,
    }));
  };

  const handleAdd = (dish: MenuItem, portion: PortionOption) => {
    const modalItem: MenuItemType = {
      id: `${dish.id}-${portion.shortLabel}`,
      name: `${dish.name} (${portion.label})`,
      regionalStyle: dish.tag,
      category: dish.isVeg ? "veg" : "biryani",
      price: portion.price,
      image: dish.image,
      tag: dish.tag,
      spiceLevel: 2,
      serves: portion.label,
      calories: "650 - 950 kcal",
      cookingTime: "Fresh in Black Tub",
      desc: dish.desc,
      story: dish.story,
      spices: ["Kashmiri Saffron", "Green Cardamom", "Pure Cow Ghee", "36 Secret Spices"],
    };

    onAddToTray(modalItem);
    const key = `${dish.id}-${portion.shortLabel}`;
    setAddedKey(key);
    setTimeout(() => setAddedKey(null), 1800);
  };

  return (
    <section
      id="menu"
      style={{
        padding: "110px 0 100px",
        background: "transparent",
        color: "#2C2727",
        position: "relative",
      }}
    >
      {/* Liquid Glass Background Ambient Glow Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 85, 0, 0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          padding: "0 32px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* ============================================================ */}
        {/* 1. SCROLL-POP HEADING (SPRING BOUNCE / 3D ENTER ON SCROLL)    */}
        {/* ============================================================ */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "36px",
            paddingBottom: "24px",
            borderBottom: "1.5px solid rgba(255, 255, 255, 0.16)",
          }}
        >
          <div>
            {/* Pop-in Kicker */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 25 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "100px",
                background: "rgba(255, 117, 23, 0.18)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 140, 56, 0.45)",
                fontSize: "0.75rem",
                fontWeight: 900,
                color: "#FFA04D",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "12px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Sparkles size={12} />
              <span>TAKEAWAY TUBS • KANJIKUZHI, KOTTAYAM</span>
            </motion.div>

            {/* HIGH-IMPACT POP-IN TITLE */}
            <motion.h2
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)",
                fontWeight: 950,
                lineHeight: 0.95,
                letterSpacing: "-0.035em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                margin: 0,
                textShadow: "0 8px 30px rgba(0, 0, 0, 0.7)",
              }}
            >
              ORDER YOUR BUCKET
            </motion.h2>
          </div>

          {/* Subtitle with soft pop */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.1 }}
            style={{ maxWidth: "460px" }}
          >
            <p
              style={{
                fontSize: "0.98rem",
                color: "rgba(255, 255, 255, 0.88)",
                lineHeight: 1.6,
                margin: 0,
                textShadow: "0 2px 12px rgba(0, 0, 0, 0.6)",
              }}
            >
              Scroll through our signature hardwood coal dum roster. Sealed piping
              hot in iconic food-grade black takeaway tubs.
            </p>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* 2. LIQUID GLASS FLOATING CATEGORY FILTER BAR                 */}
        {/* ============================================================ */}
        <motion.div
          className="menu-category-bar"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          style={{
            position: "sticky",
            top: "84px",
            zIndex: 30,
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 8px",
            borderRadius: "100px",
            background: "rgba(22, 18, 18, 0.68)",
            backdropFilter: "blur(32px) saturate(210%)",
            WebkitBackdropFilter: "blur(32px) saturate(210%)",
            border: "1.5px solid rgba(255, 255, 255, 0.22)",
            boxShadow:
              "0 14px 40px rgba(0, 0, 0, 0.35), inset 0 1.5px 2px rgba(255, 255, 255, 0.16)",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          {[
            { id: "all", label: "All Items", count: 5 },
            { id: "chicken", label: "Chicken", count: 2 },
            { id: "beef", label: "Beef", count: 1 },
            { id: "veg", label: "Pure Veg", count: 2 },
          ].map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  position: "relative",
                  padding: "8px 20px",
                  borderRadius: "100px",
                  background: isSelected
                    ? "linear-gradient(135deg, #FF5500 0%, #D44400 100%)"
                    : "transparent",
                  color: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.78)",
                  border: isSelected
                    ? "1.5px solid rgba(255, 255, 255, 0.45)"
                    : "1px solid transparent",
                  boxShadow: isSelected ? "0 6px 20px rgba(255, 85, 0, 0.4)" : "none",
                  fontSize: "0.82rem",
                  fontWeight: 850,
                  fontFamily: "var(--font-display)",
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  zIndex: 2,
                }}
              >
                <span>{cat.label}</span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    opacity: isSelected ? 0.95 : 0.75,
                    background: isSelected
                      ? "rgba(255, 255, 255, 0.25)"
                      : "rgba(255, 255, 255, 0.14)",
                    color: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.9)",
                    padding: "2px 7px",
                    borderRadius: "10px",
                    fontWeight: 900,
                  }}
                >
                  {cat.count}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ============================================================ */}
        {/* 3. SCROLL-STACKING CARDS SYSTEM (CARDS LAYER ON SCROLL)      */}
        {/* ============================================================ */}
        <div style={{ position: "relative", width: "100%" }}>
          {filteredDishes.map((dish, idx) => {
            const dishAccent = dish.isVeg ? "#1B9C52" : "#FF5500";
            const portionIdx = selectedPortions[dish.id] || 0;
            const chosenPortion = dish.portions[portionIdx] || dish.portions[0];

            return (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 50, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: idx * 0.03,
                }}
                style={{
                  // STICKY STACKING ENGINE
                  position: "sticky",
                  top: `calc(130px + ${idx * 22}px)`,
                  ["--card-top" as any]: `calc(68px + ${idx * 14}px)`,
                  zIndex: idx + 2,
                  marginBottom: idx === filteredDishes.length - 1 ? "40px" : "80px",
                  // THE APPLE LIQUID GLASS STACKED CARD (Hardware-Accelerated)
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.78) 100%)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  borderRadius: "32px",
                  padding: "32px 36px",
                  border: "1.5px solid rgba(255, 255, 255, 0.85)",
                  boxShadow: `0 25px 60px rgba(0, 0, 0, 0.18), inset 0 1.5px 2px rgba(255, 255, 255, 0.9), inset 0 -1px 1px rgba(0, 0, 0, 0.04)`,
                  willChange: "transform",
                  transform: "translateZ(0)",
                  contain: "paint layout",
                }}
                className="stacking-menu-card"
              >
                {/* Card Top Row: Number, Pop-in Name, Tag, Price */}
                <div
                  className="menu-card-top-row"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "20px",
                    marginBottom: "16px",
                    paddingBottom: "16px",
                    borderBottom: "1px solid rgba(44, 39, 39, 0.07)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "18px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.2rem",
                        fontWeight: 950,
                        color: dishAccent,
                        minWidth: "28px",
                      }}
                    >
                      {dish.number}
                    </span>

                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                        {/* HEADING ANIMATION ON SCROLL (Pure GPU transform, zero blur filter) */}
                        <motion.h3
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                            fontWeight: 950,
                            letterSpacing: "-0.03em",
                            textTransform: "uppercase",
                            color: "#2C2727",
                            lineHeight: 1.1,
                            margin: 0,
                          }}
                        >
                          {dish.name}
                        </motion.h3>

                        {/* Dietary Badge */}
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            padding: "4px 10px",
                            borderRadius: "100px",
                            fontSize: "0.7rem",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            background: dish.isVeg
                              ? "rgba(27, 156, 82, 0.12)"
                              : "rgba(255, 85, 0, 0.12)",
                            color: dishAccent,
                            border: `1px solid ${dishAccent}33`,
                          }}
                        >
                          <span
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: dishAccent,
                            }}
                          />
                          {dish.isVeg ? "100% Veg" : "Dum Special"}
                        </span>
                      </div>

                      <div
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          color: "#8E8888",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          marginTop: "4px",
                        }}
                      >
                        {dish.tag}
                      </div>
                    </div>
                  </div>

                  {/* Active Price with Live Animation */}
                  <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <motion.div
                      key={chosenPortion.price}
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                        fontWeight: 950,
                        color: dishAccent,
                      }}
                    >
                      ₹{chosenPortion.price}
                      <span
                        style={{
                          fontSize: "0.72rem",
                          color: "#8E8888",
                          fontWeight: 700,
                          marginLeft: "5px",
                        }}
                      >
                        + GST
                      </span>
                    </motion.div>
                    <div style={{ fontSize: "0.72rem", color: "#8E8888", fontWeight: 700 }}>
                      {chosenPortion.label}
                    </div>
                  </div>
                </div>

                {/* Description & Story */}
                <p
                  style={{
                    fontSize: "0.98rem",
                    color: "#595353",
                    lineHeight: 1.65,
                    margin: "0 0 20px",
                    maxWidth: "920px",
                  }}
                >
                  {dish.desc}{" "}
                  <strong style={{ color: "#2C2727", fontWeight: 700 }}>
                    {dish.story}
                  </strong>
                </p>

                {/* Portion Size Selection Line */}
                <div style={{ marginBottom: "22px" }}>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 900,
                      color: "#8E8888",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: "10px",
                    }}
                  >
                    Select Portion Size:
                  </div>

                  <div
                    className="menu-portions-container"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    {dish.portions.map((portion, pIdx) => {
                      const isChosen = portionIdx === pIdx;

                      return (
                        <motion.button
                          key={portion.shortLabel}
                          className="menu-portion-btn"
                          onClick={() => handleSelectPortion(dish.id, pIdx)}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          style={{
                            padding: "9px 20px",
                            borderRadius: "100px",
                            // PORTION PILL
                            background: isChosen
                              ? dish.isVeg
                                ? "linear-gradient(135deg, #1B9C52 0%, #157A40 100%)"
                                : "linear-gradient(135deg, #FF6F00 0%, #FF5500 50%, #FF3D00 100%)"
                              : "rgba(44, 39, 39, 0.05)",
                            color: isChosen ? "#FFFFFF" : "#2C2727",
                            border: isChosen
                              ? "1.5px solid rgba(255, 255, 255, 0.6)"
                              : "1.2px solid rgba(44, 39, 39, 0.12)",
                            boxShadow: isChosen
                              ? `0 8px 24px ${
                                  dish.isVeg
                                    ? "rgba(27, 156, 82, 0.4)"
                                    : "rgba(255, 85, 0, 0.4)"
                                }, inset 0 1px 1px rgba(255, 255, 255, 0.6)`
                              : "0 2px 8px rgba(0, 0, 0, 0.04)",
                            fontSize: "0.82rem",
                            fontWeight: 800,
                            fontFamily: "var(--font-display)",
                            letterSpacing: "0.025em",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                          }}
                        >
                          <span className="desktop-portion-text">{portion.label}</span>
                          <span className="mobile-portion-text">{portion.shortLabel}</span>
                          <span
                            style={{
                              marginLeft: "6px",
                              fontWeight: 950,
                              color: isChosen ? "#FFFFFF" : dishAccent,
                            }}
                          >
                            ₹{portion.price}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Actions: Add to Tray (Primary) + WhatsApp & Delivery (Secondary) */}
                <div
                  className="menu-actions-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Primary Add to Tray */}
                  <motion.button
                    className="menu-action-add-btn"
                    onClick={() => handleAdd(dish, chosenPortion)}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      padding: "13px 30px",
                      borderRadius: "100px",
                      background:
                        addedKey === `${dish.id}-${chosenPortion.shortLabel}`
                          ? "#27AE60"
                          : dish.isVeg
                          ? "linear-gradient(135deg, #1B9C52 0%, #157A40 100%)"
                          : "linear-gradient(135deg, #FF6F00 0%, #FF5500 50%, #FF3D00 100%)",
                      color: "#FFFFFF",
                      fontSize: "0.88rem",
                      fontWeight: 950,
                      fontFamily: "var(--font-display)",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: `0 10px 25px ${
                        dish.isVeg
                          ? "rgba(27, 156, 82, 0.35)"
                          : "rgba(255, 85, 0, 0.38)"
                      }, inset 0 1px 1px rgba(255, 255, 255, 0.45)`,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {addedKey === `${dish.id}-${chosenPortion.shortLabel}` ? (
                      <>
                        <Check size={16} />
                        <span>Added {chosenPortion.shortLabel}!</span>
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        <span>Add {chosenPortion.shortLabel} to Tray (₹{chosenPortion.price})</span>
                      </>
                    )}
                  </motion.button>

                  {/* Secondary Quick Delivery & Order Bar */}
                  <div
                    className="menu-secondary-actions"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* 1-Click WhatsApp Quick Order for this Dish */}
                    <motion.a
                      className="menu-action-wa"
                      href={`https://wa.me/918089080342?text=${encodeURIComponent(
                        `🔥 *ORDER - the BIRYANI CO. (Kanjikuzhi, Kottayam)*\n• 1x *${dish.name}* (${chosenPortion.label}) - ₹${chosenPortion.price}\n\nPlease confirm availability and preparation time. Thank you!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        fontSize: "0.84rem",
                        fontWeight: 900,
                        color: "#FFFFFF",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "7px",
                        textDecoration: "none",
                        padding: "11px 22px",
                        borderRadius: "100px",
                        background: "linear-gradient(135deg, #25D366 0%, #1EBE5B 100%)",
                        boxShadow:
                          "0 8px 20px rgba(37, 211, 102, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      <WhatsAppIcon size={17} color="#FFFFFF" />
                      <span className="desktop-btn-text">WhatsApp Order</span>
                      <span className="mobile-btn-text">WhatsApp</span>
                    </motion.a>

                    {/* Swiggy Link */}
                    <motion.a
                      className="menu-action-swiggy"
                      href="https://www.swiggy.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 800,
                        color: "#FC8019",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        textDecoration: "none",
                        padding: "10px 18px",
                        borderRadius: "100px",
                        background: "#FFF4ED",
                        border: "1.5px solid rgba(252, 128, 25, 0.35)",
                        boxShadow: "0 4px 14px rgba(252, 128, 25, 0.12)",
                      }}
                    >
                      <span className="desktop-btn-text">Order on Swiggy</span>
                      <span className="mobile-btn-text">Swiggy</span>
                      <ArrowUpRight size={13} />
                    </motion.a>

                    {/* Zomato Link */}
                    <motion.a
                      className="menu-action-zomato"
                      href="https://www.zomato.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 800,
                        color: "#E23744",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        textDecoration: "none",
                        padding: "10px 18px",
                        borderRadius: "100px",
                        background: "#FFF1F2",
                        border: "1.5px solid rgba(226, 55, 68, 0.35)",
                        boxShadow: "0 4px 14px rgba(226, 55, 68, 0.12)",
                      }}
                    >
                      <span className="desktop-btn-text">Order on Zomato</span>
                      <span className="mobile-btn-text">Zomato</span>
                      <ArrowUpRight size={13} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* 4. LIQUID GLASS FLOATING FOOTER STRIP                        */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          style={{
            marginTop: "60px",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.90) 100%)",
            border: "1.5px solid rgba(255, 255, 255, 0.95)",
            borderRadius: "24px",
            padding: "18px 28px",
            boxShadow:
              "0 15px 40px rgba(0, 0, 0, 0.05), inset 0 1px 2px #FFFFFF",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "0.88rem",
            color: "#6B6565",
          }}
          className="liquid-menu-footer"
        >
          <div>
            <strong style={{ color: "#2C2727" }}>the BIRYANI CO. Takeaway Hub:</strong> CSI Shopping Complex, Muttambalam Road, Kanjikuzhi, Kottayam
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <a
              href="https://wa.me/918089080342?text=Hi%20the%20BIRYANI%20CO.%2C%20I%20would%20like%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#25D366",
                fontWeight: 900,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
                fontSize: "0.88rem",
              }}
            >
              <WhatsAppIcon size={16} color="#25D366" />
              <span>WhatsApp: 8089080342</span>
            </a>

            <a
              href="tel:8089080342"
              style={{
                color: "#FF5500",
                fontWeight: 900,
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
                fontSize: "0.88rem",
              }}
            >
              <Phone size={15} />
              <span>Call to Order: 8089080342</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* 100% Mobile & iPad Responsive Engine */}
      <style jsx global>{`
        .mobile-portion-text,
        .mobile-btn-text {
          display: none;
        }
        @media (max-width: 768px) {
          .desktop-portion-text,
          .desktop-btn-text {
            display: none !important;
          }
          .mobile-portion-text,
          .mobile-btn-text {
            display: inline !important;
          }
          #menu {
            padding: 40px 0 80px !important;
          }
          /* On mobile, cards flow naturally with beautiful breathing room instead of cramped stacking */
          .stacking-menu-card {
            position: relative !important;
            top: auto !important;
            margin-bottom: 22px !important;
            padding: 20px 16px !important;
            border-radius: 24px !important;
          }
          .menu-category-bar {
            display: flex !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            white-space: nowrap !important;
            scrollbar-width: none !important;
            -webkit-overflow-scrolling: touch !important;
            width: max-content !important;
            max-width: calc(100vw - 32px) !important;
            margin: 0 auto 22px auto !important;
            padding: 5px 8px !important;
            top: 66px !important;
            background: rgba(18, 14, 14, 0.88) !important;
            backdrop-filter: blur(28px) saturate(210%) !important;
            -webkit-backdrop-filter: blur(28px) saturate(210%) !important;
          }
          .menu-category-bar::-webkit-scrollbar {
            display: none !important;
          }
          .menu-category-bar button {
            flex-shrink: 0 !important;
            padding: 7px 14px !important;
            font-size: 0.78rem !important;
          }
          .menu-card-top-row {
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: flex-start !important;
            gap: 12px !important;
            margin-bottom: 12px !important;
            padding-bottom: 12px !important;
          }
          .menu-portions-container {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 6px !important;
          }
          .menu-portion-btn {
            padding: 7px 12px !important;
            font-size: 0.76rem !important;
            border-radius: 100px !important;
          }
          .menu-actions-row {
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 8px !important;
            width: 100% !important;
          }
          .menu-action-add-btn {
            width: 100% !important;
            justify-content: center !important;
            padding: 13px 18px !important;
            font-size: 0.86rem !important;
          }
          .menu-secondary-actions {
            display: grid !important;
            grid-template-columns: 1.25fr 1fr 1fr !important;
            gap: 7px !important;
            width: 100% !important;
          }
          .menu-action-wa,
          .menu-action-swiggy,
          .menu-action-zomato {
            width: 100% !important;
            justify-content: center !important;
            padding: 10px 6px !important;
            font-size: 0.74rem !important;
            white-space: nowrap !important;
          }
          .liquid-menu-footer {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 16px !important;
            padding: 24px 18px !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          #menu {
            padding: 70px 0 90px !important;
          }
          .stacking-menu-card {
            padding: 28px 24px !important;
            border-radius: 28px !important;
          }
          .menu-category-bar {
            top: 78px !important;
          }
        }
      `}</style>
    </section>
  );
}

const MemoizedMenuSection = React.memo(MenuSection);
export default MemoizedMenuSection;

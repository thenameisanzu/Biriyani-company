"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItemType } from "./FoodDetailModal";
import { Plus, Check, ArrowUpRight, Phone, ChevronDown, Sparkles } from "lucide-react";
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

export default function MenuSection({ onAddToTray }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedDishId, setExpandedDishId] = useState<string>("chicken-dum-biryani");
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
    setExpandedDishId(dishId);
    setSelectedPortions((prev) => ({
      ...prev,
      [dishId]: portionIdx,
    }));
  };

  const handleToggleDish = (dishId: string) => {
    setExpandedDishId((prev) => (prev === dishId ? "" : dishId));
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
        padding: "100px 0 90px",
        background: "#FFFFFF",
        color: "#2C2727",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Liquid Glass Background Refraction Orbs (Dynamic Ambience) */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35],
          x: [0, 25, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "15%",
          right: "5%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 85, 0, 0.12) 0%, rgba(255, 117, 23, 0.04) 50%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.25, 0.45, 0.25],
          x: [0, -30, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "10%",
          left: "2%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 140, 0, 0.1) 0%, rgba(255, 85, 0, 0.03) 50%, transparent 70%)",
          filter: "blur(70px)",
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
        {/* 1. SCROLL-ANIMATED EDITORIAL HEADER WITH LIQUID ACCENTS      */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "36px",
            paddingBottom: "24px",
            borderBottom: "1.5px solid rgba(44, 39, 39, 0.09)",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "100px",
                background: "rgba(255, 85, 0, 0.08)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 85, 0, 0.22)",
                fontSize: "0.75rem",
                fontWeight: 900,
                color: "#FF5500",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              <Sparkles size={12} />
              <span>TAKEAWAY TUBS • KANJIKUZHI, KOTTAYAM</span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5.2vw, 4.4rem)",
                fontWeight: 950,
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                textTransform: "uppercase",
                color: "#2C2727",
                margin: 0,
              }}
            >
              ORDER YOUR BUCKET
            </h2>
          </div>

          <div style={{ maxWidth: "460px" }}>
            <p
              style={{
                fontSize: "0.98rem",
                color: "#6B6565",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Pure cow ghee. 36 secret spices. Sealed piping hot inside our
              iconic food-grade takeaway tubs with genuine hardwood coal dum.
            </p>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* 2. LIQUID GLASS FLOATING CATEGORY FILTER CAPSULE             */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 8px",
            borderRadius: "100px",
            // THE LIQUID GLASS SHELL
            background: "rgba(255, 255, 255, 0.72)",
            backdropFilter: "blur(28px) saturate(210%)",
            WebkitBackdropFilter: "blur(28px) saturate(210%)",
            border: "1.5px solid rgba(255, 255, 255, 0.95)",
            boxShadow:
              "0 12px 35px rgba(0, 0, 0, 0.05), inset 0 1px 2px rgba(255, 255, 255, 0.95), 0 0 0 1px rgba(44, 39, 39, 0.06)",
            flexWrap: "wrap",
            marginBottom: "36px",
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
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  position: "relative",
                  padding: "8px 20px",
                  borderRadius: "100px",
                  background: isSelected ? "#2C2727" : "transparent",
                  color: isSelected ? "#FFFFFF" : "#595353",
                  border: isSelected
                    ? "1.5px solid #2C2727"
                    : "1px solid transparent",
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
                    opacity: isSelected ? 0.9 : 0.6,
                    background: isSelected
                      ? "rgba(255, 255, 255, 0.22)"
                      : "rgba(44, 39, 39, 0.08)",
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
        {/* 3. SCROLL-ANIMATED TYPOGRAPHIC ROSTER WITH LIQUID GLASS SLAB */}
        {/* ============================================================ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filteredDishes.map((dish, idx) => {
            const isExpanded = expandedDishId === dish.id;
            const dishAccent = dish.isVeg ? "#1B9C52" : "#FF5500";
            const portionIdx = selectedPortions[dish.id] || 0;
            const chosenPortion = dish.portions[portionIdx] || dish.portions[0];

            return (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                whileHover={!isExpanded ? { x: 3 } : {}}
                style={{
                  borderRadius: "26px",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  // EXPANDED LIQUID GLASS FLOATING PANEL
                  background: isExpanded
                    ? "rgba(255, 255, 255, 0.82)"
                    : "transparent",
                  backdropFilter: isExpanded
                    ? "blur(32px) saturate(210%)"
                    : "none",
                  WebkitBackdropFilter: isExpanded
                    ? "blur(32px) saturate(210%)"
                    : "none",
                  border: isExpanded
                    ? "1.5px solid rgba(255, 255, 255, 0.95)"
                    : "1px solid rgba(44, 39, 39, 0.08)",
                  boxShadow: isExpanded
                    ? "0 22px 60px rgba(0, 0, 0, 0.07), inset 0 1px 2px rgba(255, 255, 255, 0.95), 0 0 0 1.5px rgba(255, 85, 0, 0.12)"
                    : "none",
                  padding: isExpanded ? "26px 30px" : "22px 16px",
                }}
              >
                {/* Header Row: Wide, balanced, generous spacing */}
                <div
                  onClick={() => handleToggleDish(dish.id)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "24px",
                  }}
                >
                  {/* Left: Number + Title + Dietary Pill */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1rem",
                        fontWeight: 900,
                        color: isExpanded ? dishAccent : "#9B9595",
                        transition: "color 0.2s ease",
                        minWidth: "28px",
                      }}
                    >
                      {dish.number}
                    </span>

                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(1.35rem, 2.5vw, 1.95rem)",
                            fontWeight: 950,
                            letterSpacing: "-0.025em",
                            textTransform: "uppercase",
                            color: isExpanded ? dishAccent : "#2C2727",
                            lineHeight: 1.15,
                            margin: 0,
                            transition: "color 0.2s ease",
                          }}
                        >
                          {dish.name}
                        </h3>

                        {/* Dietary Pill with Liquid Glass Sheen */}
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            padding: "3px 10px",
                            borderRadius: "100px",
                            fontSize: "0.68rem",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            background: dish.isVeg
                              ? "rgba(27, 156, 82, 0.1)"
                              : "rgba(255, 85, 0, 0.1)",
                            backdropFilter: "blur(10px)",
                            color: dishAccent,
                            border: `1px solid ${dishAccent}33`,
                            boxShadow: `0 2px 8px ${dish.isVeg ? "rgba(27, 156, 82, 0.15)" : "rgba(255, 85, 0, 0.15)"}`,
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
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          color: "#8E8888",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {dish.tag}
                      </div>
                    </div>
                  </div>

                  {/* Right: Price + Chevron with Liquid Circle */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      textAlign: "right",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(1.25rem, 2.1vw, 1.65rem)",
                          fontWeight: 950,
                          color: isExpanded ? dishAccent : "#2C2727",
                          transition: "color 0.2s ease",
                        }}
                      >
                        ₹{chosenPortion.price}
                      </span>
                      <span style={{ fontSize: "0.68rem", color: "#8E8888", fontWeight: 700, marginLeft: "4px" }}>
                        + GST
                      </span>
                    </div>

                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        background: isExpanded
                          ? "rgba(255, 85, 0, 0.12)"
                          : "rgba(44, 39, 39, 0.05)",
                        backdropFilter: "blur(12px)",
                        border: isExpanded
                          ? "1px solid rgba(255, 85, 0, 0.25)"
                          : "1px solid rgba(44, 39, 39, 0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isExpanded ? dishAccent : "#8E8888",
                      }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </div>
                </div>

                {/* Expanded Details: Liquid Glass Content Layer */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      style={{
                        paddingLeft: "clamp(0px, 3.5vw, 48px)",
                        marginTop: "18px",
                        overflow: "hidden",
                      }}
                    >
                      {/* Description & Dum Story */}
                      <p
                        style={{
                          fontSize: "0.96rem",
                          color: "#595353",
                          lineHeight: 1.65,
                          margin: "0 0 18px",
                          maxWidth: "860px",
                        }}
                      >
                        {dish.desc}{" "}
                        <span style={{ color: "#2C2727", fontWeight: 600 }}>
                          {dish.story}
                        </span>
                      </p>

                      {/* Portion Selection Header */}
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

                      {/* Liquid Glass Portion Selector Pills */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: "10px",
                          marginBottom: "22px",
                        }}
                      >
                        {dish.portions.map((portion, pIdx) => {
                          const isChosen = portionIdx === pIdx;

                          return (
                            <motion.button
                              key={portion.shortLabel}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectPortion(dish.id, pIdx);
                              }}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.96 }}
                              style={{
                                padding: "9px 18px",
                                borderRadius: "100px",
                                // LIQUID GLASS PORTION PILL
                                background: isChosen
                                  ? dish.isVeg
                                    ? "linear-gradient(135deg, #1B9C52 0%, #157A40 100%)"
                                    : "linear-gradient(135deg, #FF6F00 0%, #FF5500 50%, #FF3D00 100%)"
                                  : "rgba(255, 255, 255, 0.75)",
                                backdropFilter: "blur(16px)",
                                WebkitBackdropFilter: "blur(16px)",
                                color: isChosen ? "#FFFFFF" : "#2C2727",
                                border: isChosen
                                  ? "1.5px solid rgba(255, 255, 255, 0.6)"
                                  : "1.2px solid rgba(44, 39, 39, 0.12)",
                                boxShadow: isChosen
                                  ? `0 8px 24px ${dish.isVeg ? "rgba(27, 156, 82, 0.4)" : "rgba(255, 85, 0, 0.4)"}, inset 0 1px 1px rgba(255, 255, 255, 0.6)`
                                  : "0 4px 14px rgba(0, 0, 0, 0.04), inset 0 1px 1px #FFFFFF",
                                fontSize: "0.82rem",
                                fontWeight: 800,
                                fontFamily: "var(--font-display)",
                                letterSpacing: "0.025em",
                                cursor: "pointer",
                                transition: "all 0.15s ease",
                              }}
                            >
                              <span>{portion.label}</span>
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

                      {/* Action Bar: Glowing Liquid Glass Buttons */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          flexWrap: "wrap",
                        }}
                      >
                        {/* Primary Add to Tray Liquid Glass Button */}
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAdd(dish, chosenPortion);
                          }}
                          whileHover={{ scale: 1.03, y: -1 }}
                          whileTap={{ scale: 0.96 }}
                          style={{
                            padding: "12px 28px",
                            borderRadius: "100px",
                            background:
                              addedKey === `${dish.id}-${chosenPortion.shortLabel}`
                                ? "#27AE60"
                                : dish.isVeg
                                ? "linear-gradient(135deg, #1B9C52 0%, #157A40 100%)"
                                : "linear-gradient(135deg, #FF6F00 0%, #FF5500 50%, #FF3D00 100%)",
                            color: "#FFFFFF",
                            fontSize: "0.85rem",
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

                        {/* 1-Click WhatsApp Quick Order for this Dish */}
                        <motion.a
                          href={`https://wa.me/918089080342?text=${encodeURIComponent(
                            `🔥 *ORDER - the BIRYANI CO. (Kanjikuzhi, Kottayam)*\n• 1x *${dish.name}* (${chosenPortion.label}) - ₹${chosenPortion.price}\n\nPlease confirm availability and preparation time. Thank you!`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.03, y: -1 }}
                          whileTap={{ scale: 0.96 }}
                          style={{
                            fontSize: "0.82rem",
                            fontWeight: 900,
                            color: "#FFFFFF",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            textDecoration: "none",
                            padding: "10px 20px",
                            borderRadius: "100px",
                            background: "linear-gradient(135deg, #25D366 0%, #1EBE5B 100%)",
                            boxShadow: "0 6px 18px rgba(37, 211, 102, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.4)",
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                          }}
                        >
                          <WhatsAppIcon size={16} color="#FFFFFF" />
                          <span>WhatsApp Order</span>
                        </motion.a>

                        {/* Liquid Frosted Swiggy Link */}
                        <motion.a
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
                            padding: "9px 18px",
                            borderRadius: "100px",
                            background: "rgba(255, 244, 237, 0.75)",
                            backdropFilter: "blur(16px)",
                            border: "1.5px solid rgba(252, 128, 25, 0.35)",
                            boxShadow: "0 4px 14px rgba(252, 128, 25, 0.12)",
                          }}
                        >
                          <span>Order on Swiggy</span>
                          <ArrowUpRight size={13} />
                        </motion.a>

                        {/* Liquid Frosted Zomato Link */}
                        <motion.a
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
                            padding: "9px 18px",
                            borderRadius: "100px",
                            background: "rgba(255, 241, 242, 0.75)",
                            backdropFilter: "blur(16px)",
                            border: "1.5px solid rgba(226, 55, 68, 0.35)",
                            boxShadow: "0 4px 14px rgba(226, 55, 68, 0.12)",
                          }}
                        >
                          <span>Order on Zomato</span>
                          <ArrowUpRight size={13} />
                        </motion.a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* 4. LIQUID GLASS FLOATING FOOTER STRIP                        */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          style={{
            marginTop: "50px",
            // THE LIQUID GLASS RIBBON
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(28px) saturate(210%)",
            WebkitBackdropFilter: "blur(28px) saturate(210%)",
            border: "1.5px solid rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            padding: "16px 28px",
            boxShadow:
              "0 15px 40px rgba(0, 0, 0, 0.05), inset 0 1px 2px rgba(255, 255, 255, 0.95), 0 0 0 1px rgba(44, 39, 39, 0.06)",
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

      {/* Responsive Breakpoints */}
      <style jsx global>{`
        @media (max-width: 768px) {
          #menu {
            padding: 70px 0 60px !important;
          }
          .liquid-menu-footer {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}

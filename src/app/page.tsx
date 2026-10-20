"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeTicker from "@/components/MarqueeTicker";
import MenuSection from "@/components/MenuSection";
import DeliverySection from "@/components/DeliverySection";
import MapSection from "@/components/MapSection";
import QuickOrderDrawer from "@/components/QuickOrderDrawer";
import Footer from "@/components/Footer";
import { MenuItemType } from "@/components/FoodDetailModal";

export default function Home() {
  const [trayItems, setTrayItems] = useState<{ item: MenuItemType; count: number }[]>([]);

  const handleAddToTray = (item: MenuItemType) => {
    setTrayItems((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, count: i.count + 1 } : i
        );
      }
      return [...prev, { item, count: 1 }];
    });
  };

  const handleUpdateCount = (itemId: string, delta: number) => {
    setTrayItems((prev) => {
      return prev
        .map((i) => {
          if (i.item.id === itemId) {
            const newCount = i.count + delta;
            return newCount > 0 ? { ...i, count: newCount } : null;
          }
          return i;
        })
        .filter(Boolean) as { item: MenuItemType; count: number }[];
    });
  };

  const handleClearTray = () => {
    setTrayItems([]);
  };

  return (
    <main style={{ minHeight: "100vh", position: "relative", background: "#FFFFFF" }}>
      {/* Fixed Sticky Header Navigation */}
      <Navbar />

      {/* Vibrant Orange & Minimal Steaming Bowl Hero */}
      <HeroSection />

      {/* Seamless Marquee Ticker */}
      <MarqueeTicker />

      {/* Minimalist Awwwards Menu */}
      <MenuSection onAddToTray={handleAddToTray} />

      {/* Redesigned Awwwards Swiggy & Zomato Portal */}
      <DeliverySection />

      {/* Google Maps & Restaurant Location */}
      <MapSection />

      {/* Floating Interactive Order Tray */}
      <QuickOrderDrawer
        items={trayItems}
        onUpdateCount={handleUpdateCount}
        onClear={handleClearTray}
      />

      {/* Vibrant Orange Brand Footer */}
      <Footer />
    </main>
  );
}

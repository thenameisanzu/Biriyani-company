"use client";

import React, { useEffect, useRef } from "react";

interface SteamPuff {
  x: number;
  y: number;
  initialX: number;
  radius: number;
  maxRadius: number;
  vy: number;
  vx: number;
  opacity: number;
  maxOpacity: number;
  life: number;
  maxLife: number;
  rotation: number;
  rotSpeed: number;
  swaySpeed: number;
  swayDist: number;
  type: "steam" | "saffronSparkle";
}

export default function SteamCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || 550);
    let h = (canvas.height = canvas.parentElement?.clientHeight || 550);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      w = canvas.width = canvas.parentElement.clientWidth;
      h = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    let isVisible = true;
    const puffs: SteamPuff[] = [];
    const maxPuffs = 28; // Rich, appetizing, continuous plumes of hot steam

    // Emit plumes directly over the steaming hot biryani bowl
    const spawnPuff = (): SteamPuff => {
      const isSparkle = Math.random() < 0.12;
      const emitterOffset = (Math.random() - 0.5) * (w * 0.36);
      const startX = w * 0.5 + emitterOffset;
      const startY = h * 0.66 + (Math.random() - 0.5) * 18;

      const maxLife = isSparkle
        ? 140 + Math.random() * 60
        : 180 + Math.random() * 70;

      return {
        x: startX,
        y: startY,
        initialX: startX,
        radius: isSparkle ? Math.random() * 1.8 + 1.2 : Math.random() * 14 + 10,
        maxRadius: isSparkle ? 3 : Math.random() * 55 + 40,
        vy: isSparkle ? Math.random() * 0.6 + 0.5 : Math.random() * 0.55 + 0.45, // Appetizing, natural upward waft
        vx: (Math.random() - 0.5) * 0.25,
        opacity: 0,
        maxOpacity: isSparkle ? 0.75 : Math.random() * 0.22 + 0.32, // Clearly visible white steam against orange
        life: 0,
        maxLife,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        swaySpeed: Math.random() * 0.018 + 0.01,
        swayDist: Math.random() * 18 + 8,
        type: isSparkle ? "saffronSparkle" : "steam",
      };
    };

    // Pre-populate so steam is full and active immediately on page load
    for (let i = 0; i < maxPuffs; i++) {
      const p = spawnPuff();
      p.life = Math.floor(Math.random() * p.maxLife * 0.85) + 5;
      p.y -= (p.life * p.vy);
      puffs.push(p);
    }

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);

      // Continuously replenish rising steam puffs
      while (puffs.length < maxPuffs) {
        puffs.push(spawnPuff());
      }

      for (let i = puffs.length - 1; i >= 0; i--) {
        const p = puffs[i];
        p.life++;

        // Natural organic bell-curve opacity (smooth fade-in, rich peak, smooth fade-out)
        const progress = Math.min(1, p.life / p.maxLife);
        p.opacity = Math.sin(progress * Math.PI) * p.maxOpacity;

        // Float upwards with gentle, calming air turbulence
        p.y -= p.vy;
        p.x = p.initialX + Math.sin(frame * p.swaySpeed + p.life * 0.025) * p.swayDist + p.vx * p.life;
        p.rotation += p.rotSpeed;

        // Disperse and expand as it rises into cooler air
        const currentRadius = p.radius + (p.maxRadius - p.radius) * Math.pow(progress, 0.65);

        // Smooth boundary fade so no particle ever clips at the canvas border
        const topFade = Math.min(1, Math.max(0, p.y / (h * 0.2)));
        const sideFade = Math.min(1, Math.max(0, p.x / (w * 0.12)), Math.max(0, (w - p.x) / (w * 0.12)));
        const finalOpacity = Math.max(0, p.opacity * topFade * sideFade);

        // Lifecycle check: ONLY splice when life expires or particle ascends past top
        if (p.life >= p.maxLife || p.y < -currentRadius) {
          puffs.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === "saffronSparkle") {
          // Delicate floating saffron / gold ember fleck
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 175, 40, ${finalOpacity})`;
          ctx.shadowColor = "#FFA800";
          ctx.shadowBlur = 8;
          ctx.fill();
        } else {
          // Luscious, multi-stop radial steam cloud
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, currentRadius);
          grad.addColorStop(0, `rgba(255, 255, 255, ${finalOpacity * 0.95})`);
          grad.addColorStop(0.32, `rgba(255, 252, 244, ${finalOpacity * 0.65})`);
          grad.addColorStop(0.68, `rgba(255, 246, 236, ${finalOpacity * 0.22})`);
          grad.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.beginPath();
          ctx.scale(1.15, 0.92);
          ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        ctx.restore();
      }

      if (isVisible) {
        animId = requestAnimationFrame(render);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(animId);
          animId = requestAnimationFrame(render);
        }
      });
    }, { threshold: 0.05 });

    observer.observe(canvas);
    render();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 15,
        overflow: "visible",
      }}
    >
      {/* Dynamic HTML5 Canvas Fluid Steam */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

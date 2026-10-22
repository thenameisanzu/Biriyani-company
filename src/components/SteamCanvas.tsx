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
    const maxPuffs = 14; // Subtle, realistic hot steam wisps

    // Gentle emitters focused directly over the hot dum rice
    const spawnPuff = (): SteamPuff => {
      const isSparkle = Math.random() < 0.08;
      // Emit tightly from the center handi bowl zone
      const emitterOffset = (Math.random() - 0.5) * (w * 0.32);
      const startX = w * 0.5 + emitterOffset;
      const startY = h * 0.62 + (Math.random() - 0.5) * 16;

      const maxLife = isSparkle
        ? 180 + Math.random() * 80
        : 220 + Math.random() * 140;

      return {
        x: startX,
        y: startY,
        initialX: startX,
        radius: isSparkle ? Math.random() * 1.5 + 1 : Math.random() * 8 + 8,
        maxRadius: isSparkle ? 2.5 : Math.random() * 32 + 24,
        vy: isSparkle ? Math.random() * 0.4 + 0.3 : Math.random() * 0.38 + 0.28, // Gentle, slow lazy waft
        vx: (Math.random() - 0.5) * 0.2,
        opacity: 0,
        maxOpacity: isSparkle ? 0.45 : Math.random() * 0.13 + 0.08, // Translucent, soft, natural steam
        life: 0,
        maxLife,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.012,
        swaySpeed: Math.random() * 0.015 + 0.008,
        swayDist: Math.random() * 12 + 6,
        type: isSparkle ? "saffronSparkle" : "steam",
      };
    };

    // Pre-populate so gentle steam is visible immediately
    for (let i = 0; i < maxPuffs; i++) {
      const p = spawnPuff();
      p.life = Math.random() * p.maxLife;
      p.y -= (p.life * p.vy);
      puffs.push(p);
    }

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);

      // Continuously maintain gentle rising plumes
      if (puffs.length < maxPuffs) {
        puffs.push(spawnPuff());
      }

      for (let i = puffs.length - 1; i >= 0; i--) {
        const p = puffs[i];
        p.life++;

        // Progress fraction (0 to 1)
        const progress = p.life / p.maxLife;

        // Curve opacity: gentle fade-in, smooth dissipation
        if (progress < 0.25) {
          p.opacity = (progress / 0.25) * p.maxOpacity;
        } else {
          p.opacity = (1 - (progress - 0.25) / 0.75) * p.maxOpacity;
        }

        // Float upwards with gentle, calming air drift
        p.y -= p.vy;
        p.x = p.initialX + Math.sin(frame * p.swaySpeed + p.life * 0.02) * p.swayDist + p.vx * p.life;
        p.rotation += p.rotSpeed;

        // Disperse and expand as it rises into cooler air
        const currentRadius = p.radius + (p.maxRadius - p.radius) * Math.pow(progress, 0.75);

        // Smoothly fade out before reaching top canvas boundary so there is never an edge artifact
        const topFade = Math.min(1, Math.max(0, (p.y - h * 0.12) / (h * 0.25)));
        const finalOpacity = p.opacity * topFade;

        if (p.life >= p.maxLife || p.y < -currentRadius || finalOpacity <= 0.001) {
          puffs.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === "saffronSparkle") {
          // Delicate floating saffron fleck
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 130, 40, ${finalOpacity * 1.2})`;
          ctx.shadowColor = "#FF8228";
          ctx.shadowBlur = 6;
          ctx.fill();
        } else {
          // Delicate, soft, translucent steam puff
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, currentRadius);
          grad.addColorStop(0, `rgba(255, 255, 255, ${finalOpacity * 0.85})`);
          grad.addColorStop(0.35, `rgba(255, 248, 238, ${finalOpacity * 0.45})`);
          grad.addColorStop(0.7, `rgba(255, 242, 230, ${finalOpacity * 0.12})`);
          grad.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.beginPath();
          ctx.scale(1.1, 0.94);
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

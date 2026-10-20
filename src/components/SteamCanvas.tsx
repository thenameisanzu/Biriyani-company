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
    const maxPuffs = 45; // Optimized from 95 to prevent CPU frame drops

    // Hot emitters along the rim of the biryani handi pot
    const spawnPuff = (): SteamPuff => {
      const isSparkle = Math.random() < 0.16;
      // Emit from the center-lower zone of the pot where rice is steaming hot
      const emitterOffset = (Math.random() - 0.5) * (w * 0.55);
      const startX = w * 0.5 + emitterOffset;
      const startY = h * 0.70 + (Math.random() - 0.5) * 30;

      const maxLife = isSparkle
        ? 140 + Math.random() * 80
        : 180 + Math.random() * 120;

      return {
        x: startX,
        y: startY,
        initialX: startX,
        radius: isSparkle ? Math.random() * 2 + 1.2 : Math.random() * 18 + 14,
        maxRadius: isSparkle ? 3 : Math.random() * 75 + 55,
        vy: isSparkle ? Math.random() * 1.6 + 0.8 : Math.random() * 1.35 + 0.75,
        vx: (Math.random() - 0.5) * 0.5,
        opacity: 0,
        maxOpacity: isSparkle ? 0.85 : Math.random() * 0.42 + 0.28,
        life: 0,
        maxLife,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.025,
        swaySpeed: Math.random() * 0.03 + 0.015,
        swayDist: Math.random() * 24 + 10,
        type: isSparkle ? "saffronSparkle" : "steam",
      };
    };

    // Pre-populate so steam is visible instantly on load
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

      // Continuously spawn fresh rising plumes
      if (puffs.length < maxPuffs) {
        puffs.push(spawnPuff());
      }

      for (let i = puffs.length - 1; i >= 0; i--) {
        const p = puffs[i];
        p.life++;

        // Progress fraction (0 to 1)
        const progress = p.life / p.maxLife;

        // Curve opacity: fade in rapidly, linger warmly, disperse smoothly
        if (progress < 0.22) {
          p.opacity = (progress / 0.22) * p.maxOpacity;
        } else {
          p.opacity = (1 - (progress - 0.22) / 0.78) * p.maxOpacity;
        }

        // Float upwards with organic swirling turbulence
        p.y -= p.vy;
        p.x = p.initialX + Math.sin(frame * p.swaySpeed + p.life * 0.03) * p.swayDist + p.vx * p.life;
        p.rotation += p.rotSpeed;

        // Steam puffs expand as they ascend into cooler air
        const currentRadius = p.radius + (p.maxRadius - p.radius) * Math.pow(progress, 0.7);

        if (p.life >= p.maxLife || p.y < -currentRadius) {
          puffs.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === "saffronSparkle") {
          // Floating saffron & warm ember sparkles
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 117, 23, ${p.opacity * 1.5})`;
          ctx.shadowColor = "#FF7517";
          ctx.shadowBlur = 8;
          ctx.fill();
        } else {
          // Voluminous, multi-stop radial gradient steam puff
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, currentRadius);
          grad.addColorStop(0, `rgba(255, 255, 255, ${p.opacity * 0.95})`);
          grad.addColorStop(0.35, `rgba(255, 248, 238, ${p.opacity * 0.6})`);
          grad.addColorStop(0.7, `rgba(255, 240, 225, ${p.opacity * 0.2})`);
          grad.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.beginPath();
          // Slightly distorted oval puff for natural smoke feel
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
        overflow: "hidden",
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
        }}
      />

      {/* CSS Multi-layer Billowing Smoke Plumes for Rich Visual Depth */}
      <div
        style={{
          position: "absolute",
          bottom: "22%",
          left: "22%",
          width: "180px",
          height: "220px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.7) 0%, rgba(255,248,235,0.3) 50%, transparent 75%)",
          filter: "blur(28px)",
          animation: "smokeBillow1 5.2s infinite ease-out",
          transformOrigin: "bottom center",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "24%",
          right: "22%",
          width: "190px",
          height: "240px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.75) 0%, rgba(255,245,230,0.35) 50%, transparent 75%)",
          filter: "blur(32px)",
          animation: "smokeBillow2 6s infinite ease-out 1.5s",
          transformOrigin: "bottom center",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "26%",
          left: "38%",
          width: "160px",
          height: "250px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, rgba(255,245,230,0.4) 45%, transparent 75%)",
          filter: "blur(30px)",
          animation: "smokeBillow1 4.8s infinite ease-out 2.7s",
          transformOrigin: "bottom center",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

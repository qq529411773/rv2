"use client";

import { useEffect, useState } from "react";

export function BackgroundEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const glow = document.getElementById("cursorGlow");
    const dot = document.getElementById("cursorDot");
    if (!glow || !dot) return;

    let rafId = 0;
    let idleTimer: ReturnType<typeof setTimeout>;
    let isRunning = false;
    let mouseX = -500;
    let mouseY = -500;
    let glowX = -500;
    let glowY = -500;

    const animate = () => {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.transform = `translate(${glowX}px, ${glowY}px)`;

      // Stop RAF when glow has settled near cursor position
      const dx = Math.abs(mouseX - glowX);
      const dy = Math.abs(mouseY - glowY);
      if (dx < 0.5 && dy < 0.5) {
        isRunning = false;
        return;
      }

      rafId = requestAnimationFrame(animate);
    };

    const startRaf = () => {
      if (!isRunning) {
        isRunning = true;
        glow.style.opacity = "1";
        rafId = requestAnimationFrame(animate);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.opacity = "1";
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      startRaf();

      // Stop RAF after 150ms of no mouse movement
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (isRunning) {
          cancelAnimationFrame(rafId);
          isRunning = false;
        }
      }, 150);
    };

    const onMouseLeave = () => {
      dot.style.opacity = "0";
      glow.style.opacity = "0";
      if (isRunning) {
        cancelAnimationFrame(rafId);
        isRunning = false;
      }
      clearTimeout(idleTimer);
    };

    const onMouseEnter = () => {
      dot.style.opacity = "1";
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
      clearTimeout(idleTimer);
    };
  }, [mounted]);

  return (
    <>
      {/* Cursor Glow */}
      <div
        id="cursorGlow"
        className="fixed pointer-events-none z-[9999] w-[300px] h-[300px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--brand-glow) 0%, transparent 70%)",
          opacity: 0,
          willChange: "transform",
        }}
      />
      {/* Cursor Dot */}
      <div
        id="cursorDot"
        className="fixed pointer-events-none z-[9999] w-[6px] h-[6px] rounded-full"
        style={{
          background: "var(--brand)",
          opacity: 0,
          willChange: "transform",
          boxShadow: "0 0 12px var(--brand-glow)",
        }}
      />

      {/* Floating Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="orb orb-1 absolute rounded-full"
          style={{
            width: "500px",
            height: "500px",
            background: "var(--orb-1)",
            top: "-10%",
            left: "-5%",
            filter: "blur(80px)",
          }}
        />
        <div
          className="orb orb-2 absolute rounded-full"
          style={{
            width: "400px",
            height: "400px",
            background: "var(--orb-2)",
            top: "40%",
            right: "-8%",
            filter: "blur(70px)",
          }}
        />
        <div
          className="orb orb-3 absolute rounded-full"
          style={{
            width: "350px",
            height: "350px",
            background: "var(--orb-3)",
            bottom: "10%",
            left: "20%",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Dark mode grid overlay — radial fade */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden dark-grid" />

      {/* Dark vignette */}
      <div className="fixed inset-0 z-0 pointer-events-none dark-vignette" />

      {/* Dark beams */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="dark-beam dark-beam-1" />
        <div className="dark-beam dark-beam-2" />
        <div className="dark-beam dark-beam-3" />
      </div>
    </>
  );
}

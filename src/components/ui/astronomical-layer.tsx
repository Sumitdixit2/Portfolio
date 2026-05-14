'use client';

import { useEffect, useRef, useState } from 'react';

export function AstronomicalLayer() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Fix High-DPI Blurriness
    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      width = window.innerWidth;
      height = window.innerHeight;
      
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // 1. Sparse, infrastructural starfield
    const STAR_COUNT = 150; 
    const stars = Array.from({ length: STAR_COUNT }).map(() => ({
      x: Math.random() * width, // Initial random spread
      y: Math.random() * height,
      size: Math.random() * 1.2 + 0.3,
      opacity: Math.random() * 0.3 + 0.05,
      speedY: (Math.random() * 0.03 + 0.01) * (prefersReduced ? 0 : 1),
      speedX: (Math.random() * 0.01 + 0.005) * (prefersReduced ? 0 : 1)
    }));

    // 2. Orbital Scan Events (Telemetry Streaks)
    interface Streak {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      angle: number; 
    }
    const streaks: Streak[] = [];
    let lastStreakTime = performance.now();
    let animationFrameId: number;

    const render = (time: number) => {
      // Pause completely if tab is hidden to save battery/CPU
      if (document.hidden) {
        lastStreakTime = time; // Prevent immediate burst on return
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Render ambient background depth
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.y -= star.speedY;
        star.x -= star.speedX;

        // Dynamic wrap checking (fixes resize edge clustering)
        if (star.y < 0) star.y = height + 10;
        else if (star.y > height + 10) star.y = 0;
        
        if (star.x < 0) star.x = width + 10;
        else if (star.x > width + 10) star.x = 0;

        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Spawn Orbital Telemetry Streaks infrequently
      if (!prefersReduced && time - lastStreakTime > 8000 + Math.random() * 7000) {
        streaks.push({
          x: Math.random() * (width + 200) - 100, // Can spawn slightly off-screen
          y: -50,
          length: Math.random() * 120 + 80, // Long, precise lines
          speed: Math.random() * 12 + 15, // Fast laser ping
          opacity: 0.5,
          angle: Math.PI / 4 // Strict 45-degree orthographic angle
        });
        lastStreakTime = time;
      }

      // Render Telemetry Streaks
      ctx.strokeStyle = '#64FFDA'; // Blueprint Accent
      for (let i = streaks.length - 1; i >= 0; i--) {
        const streak = streaks[i];
        streak.x += Math.cos(streak.angle) * streak.speed;
        streak.y += Math.sin(streak.angle) * streak.speed;

        ctx.globalAlpha = streak.opacity;
        ctx.lineWidth = 0.5; // Razor thin precision
        
        ctx.beginPath();
        ctx.moveTo(streak.x, streak.y);
        ctx.lineTo(streak.x - Math.cos(streak.angle) * streak.length, streak.y - Math.sin(streak.angle) * streak.length);
        ctx.stroke();

        // Garbage collection
        if (streak.y > height + streak.length || streak.x > width + streak.length) {
          streaks.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1; // Reset
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]); // Never tear down loop unless unmounting

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1] opacity-70"
    />
  );
}

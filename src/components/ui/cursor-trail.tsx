'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

function hexToRgba(color: string, alpha: number) {
  if (!color) return `rgba(0,0,0,${alpha})`;
  if (color.startsWith("rgba")) {
    return color.replace(/rgba\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*[^)]+\)/, (_, r, g, b) => `rgba(${r},${g},${b},${alpha})`);
  }
  if (color.startsWith("rgb(")) {
    const body = color.slice(4, -1);
    return `rgba(${body},${alpha})`;
  }
  if (color.startsWith("#")) {
    let r = 0, g = 0, b = 0;
    if (color.length === 4) {
      r = parseInt(color[1] + color[1], 16);
      g = parseInt(color[2] + color[2], 16);
      b = parseInt(color[3] + color[3], 16);
    } else if (color.length === 7) {
      r = parseInt(color.slice(1, 3), 16);
      g = parseInt(color.slice(3, 5), 16);
      b = parseInt(color.slice(5, 7), 16);
    }
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return `rgba(0,0,0,${alpha})`;
}

export function CursorTrail(props: any) {
  const [mounted, setMounted] = useState(false);
  
  // Props are safely stashed in a ref so they don't break the RAF lifecycle when React re-renders
  const propsRef = useRef({
    color: props.color || "rgba(100, 255, 218, 0.4)",
    size: props.size || 4,
    hoverSize: props.hoverSize || 30,
    borderWidth: props.borderWidth || 1,
    spring: props.spring || 0.15,
    friction: props.friction || 0.5,
    trailDuration: props.trailDuration || 300,
    transitionSpeed: props.transitionSpeed || 0.15
  });

  // Sync props to ref
  useEffect(() => {
    propsRef.current = {
      color: props.color || "rgba(100, 255, 218, 0.4)",
      size: props.size || 4,
      hoverSize: props.hoverSize || 30,
      borderWidth: props.borderWidth || 1,
      spring: props.spring || 0.15,
      friction: props.friction || 0.5,
      trailDuration: props.trailDuration || 300,
      transitionSpeed: props.transitionSpeed || 0.15
    };
  }, [props]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<{x: number, y: number, age: number}[]>([]);
  const cursorState = useRef({
    ball: { x: -100, y: -100 },
    target: { x: -100, y: -100 },
    velocity: { x: 0, y: 0 },
    isHovering: false,
    radius: propsRef.current.size / 2,
    fillOpacity: 1,
    strokeOpacity: 0
  });
  const lastTimeRef = useRef(0);
  const animRef = useRef<number>();

  useEffect(() => {
    if (!mounted) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    
    if (prefersReduced || isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    // Event-based interaction handling (Zero DOM reflows)
    const onMouseMove = (e: MouseEvent) => {
      cursorState.current.target = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as Element;
      // High-performance check for interactive elements without using document.elementFromPoint
      cursorState.current.isHovering = !!el?.closest("a, button, [role='button'], .drafting-border, input, textarea");
    };

    // Pauses extreme physics jumps when returning to a backgrounded tab
    const onVisibilityChange = () => {
      if (!document.hidden) {
        lastTimeRef.current = performance.now();
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    const lerp = (from: number, to: number, amt: number) => from + (to - from) * amt;

    const animate = (time: number) => {
      if (document.hidden) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }

      const p = propsRef.current;
      const state = cursorState.current;
      
      const dt = Math.min(time - lastTimeRef.current, 33);
      lastTimeRef.current = time;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Hide off-screen initially
      if (state.target.x === -100 && state.target.y === -100) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }

      // Physics interpolation
      const dx = state.target.x - state.ball.x;
      const dy = state.target.y - state.ball.y;
      state.velocity.x += dx * p.spring;
      state.velocity.y += dy * p.spring;
      state.velocity.x *= p.friction;
      state.velocity.y *= p.friction;
      state.ball.x += state.velocity.x;
      state.ball.y += state.velocity.y;

      // Trail age tracking
      pointsRef.current.push({ x: state.ball.x, y: state.ball.y, age: 0 });
      for (let i = 0; i < pointsRef.current.length; i++) {
        pointsRef.current[i].age += dt;
      }
      pointsRef.current = pointsRef.current.filter(point => point.age < p.trailDuration);

      // Trail Rendering
      if (pointsRef.current.length > 1) {
        ctx.beginPath();
        ctx.moveTo(pointsRef.current[0].x, pointsRef.current[0].y);
        for (let i = 1; i < pointsRef.current.length; i++) {
          const pt = pointsRef.current[i];
          ctx.lineTo(pt.x, pt.y);
        }
        
        const oldest = pointsRef.current[0];
        const newest = pointsRef.current[pointsRef.current.length - 1];
        const oldestOpacity = 1 - (oldest.age / p.trailDuration);
        
        const gradient = ctx.createLinearGradient(oldest.x, oldest.y, newest.x, newest.y);
        gradient.addColorStop(0, hexToRgba(p.color, Math.max(0, oldestOpacity * 0.3)));
        gradient.addColorStop(1, hexToRgba(p.color, 1));
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = Math.max(1, p.size / 2);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      // Radius / Opacities interpolation
      const targetRadius = state.isHovering ? p.hoverSize / 2 : p.size / 2;
      state.radius = lerp(state.radius, targetRadius, p.transitionSpeed);
      state.fillOpacity = lerp(state.fillOpacity, state.isHovering ? 0 : 1, p.transitionSpeed);
      state.strokeOpacity = lerp(state.strokeOpacity, state.isHovering ? 1 : 0, p.transitionSpeed);

      // Draw Main Dot/Ring
      ctx.beginPath();
      ctx.arc(state.ball.x, state.ball.y, state.radius, 0, Math.PI * 2);
      
      if (state.strokeOpacity > 0.01) {
        ctx.strokeStyle = hexToRgba(p.color, state.strokeOpacity);
        ctx.lineWidth = p.borderWidth;
        ctx.stroke();
      }
      if (state.fillOpacity > 0.01) {
        ctx.fillStyle = hexToRgba(p.color, state.fillOpacity);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [mounted]); // Only run once on mount! Props changes handled via ref.

  if (!mounted) return null;

  return createPortal(
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        display: "block",
        pointerEvents: "none",
        zIndex: 9999, // Safely guaranteed above floating nav and content
      }}
    />,
    document.body
  );
}

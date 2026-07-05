'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'SYS_ENTRY', shortName: 'ENTRY', href: '#sys-entry' },
  { name: 'TOPOLOGY', shortName: 'TOPO', href: '#skills' },
  { name: 'ARCHITECTURE', shortName: 'ARCH', href: '#architecture' },
  { name: 'OPERATIONS', shortName: 'OPS', href: '#operations' },
  { name: 'OPERATOR', shortName: 'USER', href: '#operator' },
];

export function FloatingNav() {
  const { scrollY } = useScroll();
  const [active, setActive] = useState('SYS_ENTRY');
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Soft environmental adaptation, no hiding
  useMotionValueEvent(scrollY, "change", (current) => {
    if (current > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  // Intersection observer to highlight active section
  useEffect(() => {
    if (!mounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) {
              const matchedItem = navItems.find(item => item.href === `#${id}`);
              if (matchedItem) setActive(matchedItem.name);
            }
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    navItems.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [mounted]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const offset = 120; // 8rem clear header buffer clearance
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (!mounted) return null;

  return (
    <nav aria-label="Main navigation" className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] px-4 pointer-events-none w-full max-w-fit">
      <motion.div
        className="pointer-events-auto"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // Soft, pressurized drop-in
      >
        {/* 
          Aerodynamic Floating Dock
          Using rounded-full for a true continuous curved capsule silhouette, 
          with tapering padding and micro gaps to fit mobile screen borders cleanly.
        */}
        <div className={cn(
          "flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-4 sm:py-2",
          "rounded-full backdrop-blur-xl border transition-all duration-700 ease-out",
          isScrolled 
            ? "bg-[#0A192F]/65 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.8)] border-white/10" 
            : "bg-[#0A192F]/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-white/5"  
        )}>
          {navItems.map((item) => {
            const isActive = active === item.name;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={cn(
                  "relative px-2 py-1.5 sm:px-5 sm:py-2.5 rounded-full transition-colors duration-300",
                  "font-mono text-[9px] sm:text-[10px] tracking-widest uppercase cursor-none",
                  isActive ? "text-accent" : "text-muted hover:text-foreground/90"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-accent/10 rounded-full border border-accent/20"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">
                  <span className="hidden sm:inline">{item.name}</span>
                  <span className="inline sm:hidden">{item.shortName}</span>
                </span>
              </a>
            );
          })}
        </div>
      </motion.div>
    </nav>
  );
}

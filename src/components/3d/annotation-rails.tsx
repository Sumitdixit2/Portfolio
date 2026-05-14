'use client';

import { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { MotionValue } from 'framer-motion';
export function AnnotationRails({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const [opacityShell, setOpacityShell] = useState(0);
  const [opacityRings, setOpacityRings] = useState(0);
  const [opacityCore, setOpacityCore] = useState(0);

  useFrame(() => {
    const p = scrollProgress.get();
    
    // Shell fades in at 0.2
    let sOpacity = 0;
    if (p > 0.2 && p < 0.95) sOpacity = Math.min(1, (p - 0.2) * 5);
    if (p > 0.9) sOpacity = Math.max(0, 1 - (p - 0.9) * 10);
    if (Math.abs(sOpacity - opacityShell) > 0.01) setOpacityShell(sOpacity);

    // Rings fade in at 0.4
    let rOpacity = 0;
    if (p > 0.4 && p < 0.95) rOpacity = Math.min(1, (p - 0.4) * 5);
    if (p > 0.9) rOpacity = Math.max(0, 1 - (p - 0.9) * 10);
    if (Math.abs(rOpacity - opacityRings) > 0.01) setOpacityRings(rOpacity);

    // Core fades in at 0.6
    let cOpacity = 0;
    if (p > 0.6 && p < 0.95) cOpacity = Math.min(1, (p - 0.6) * 5);
    if (p > 0.9) cOpacity = Math.max(0, 1 - (p - 0.9) * 10);
    if (Math.abs(cOpacity - opacityCore) > 0.01) setOpacityCore(cOpacity);
  });

  return (
    <group>
      {/* Upper Shell */}
      <Html position={[-3, 4, 0]} center style={{ opacity: opacityShell, transition: 'opacity 0.1s' }} className="pointer-events-none">
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-mono text-[10px] text-muted mb-1">[UPPER_SHELL]</div>
            <div className="font-mono text-xs text-accent whitespace-nowrap">CALIBRATION_RING_A</div>
          </div>
          <div className="w-16 h-[1px] bg-border/50 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-accent rounded-full" />
          </div>
        </div>
      </Html>

      {/* Core Module */}
      <Html position={[3.5, 0, 0]} center style={{ opacity: opacityCore, transition: 'opacity 0.1s' }} className="pointer-events-none">
        <div className="flex items-center gap-4">
          <div className="w-16 h-[1px] bg-border/50 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-accent rounded-full animate-pulse" />
          </div>
          <div className="text-left">
            <div className="font-mono text-[10px] text-muted mb-1">[CORE_MODULE]</div>
            <div className="font-mono text-xs text-accent whitespace-nowrap">AETHER_NUCLEUS</div>
          </div>
        </div>
      </Html>

      {/* Lower Shell */}
      <Html position={[-3.5, -3, 0]} center style={{ opacity: opacityShell, transition: 'opacity 0.1s' }} className="pointer-events-none">
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-mono text-[10px] text-muted mb-1">[LOWER_SHELL]</div>
            <div className="font-mono text-xs text-accent whitespace-nowrap">ALIGNMENT_BASE</div>
          </div>
          <div className="w-16 h-[1px] bg-border/50 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-accent rounded-full" />
          </div>
        </div>
      </Html>
    </group>
  );
}

'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import { ObservatoryScene } from '../3d/observatory-scene';
import { ObservatoryOverlays } from './observatory-overlays';
import { ObservatoryHud } from './observatory-hud';
import { SystemAnnotation } from '@/components/ui/system-annotation';

export function AetherObservatory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  // Entry / exit fade — the viewport fades in gently from the hero, and fades out before the next section
  const viewportOpacity = useTransform(scrollYProgress, [0, 0.015, 0.97, 1.0], [0, 1, 1, 0]);

  // Scroll position indicator — a hairline progress bar along the top edge
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={containerRef} className="relative h-[1400vh] w-full">
      {/* Sticky Viewport */}
      <motion.div
        style={{ opacity: viewportOpacity }}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center bg-background"
      >
        {/* Progress hairline — top edge */}
        <div className="absolute top-0 left-0 right-0 z-30 h-[1px] bg-border/40">
          <motion.div
            style={{ width: progressWidth }}
            className="h-full bg-accent/60 transition-none"
          />
        </div>

        {/* Section boundary — top left section identifier */}
        <div className="absolute top-5 left-6 z-30 pointer-events-none flex flex-col gap-1">
          <SystemAnnotation label="SECTION" value="AETHER_CORE_ASSEMBLY" />
        </div>

        {/* Section boundary — top right exit annotation */}
        <div className="absolute top-5 right-6 z-30 pointer-events-none">
          <span className="font-mono text-[9px] text-accent/40 tracking-widest uppercase">
            SCROLL ↓ TO TRAVERSE
          </span>
        </div>

        {/* Drafting corner brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent/40 z-30" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent/40 z-30" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent/40 z-30" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent/40 z-30" />

        {/* Observatory HUD — passive instrumentation layer */}
        <ObservatoryHud />

        {/* Narrative Overlays — dossier text system */}
        <ObservatoryOverlays scrollProgress={scrollYProgress} />

        {/* 3D Canvas */}
        {isMounted && (
          <div className="absolute inset-0 z-10">
            <Canvas dpr={[1, 1.5]} className="cursor-crosshair">
              <color attach="background" args={['#020917']} />
              {/* Restrained peripheral fog: dissolves only extreme geometry edges */}
              <fog attach="fog" args={['#020917', 40, 90]} />

              <OrthographicCamera
                makeDefault
                position={[20, 20, 20]}
                zoom={50}
                near={-100}
                far={100}
                onUpdate={c => c.lookAt(0, 0, 0)}
              />

              {/* 3-light engineering photography rig */}
              {/* Key: crisp white from upper-right, reveals geometry edges */}
              <directionalLight position={[8, 14, 8]} intensity={5.0} color="#e6f1ff" />
              {/* Rim: teal from lower-back, carves silhouette from void */}
              <directionalLight position={[-10, -6, -12]} intensity={3.5} color="#64FFDA" />
              {/* Fill: warm-neutral from below, prevents crushed shadow reads */}
              <directionalLight position={[0, -8, 10]} intensity={1.8} color="#ccd6f6" />
              {/* Ambient: dark navy — barely hints at occluded geometry */}
              <ambientLight intensity={0.2} color="#0A192F" />

              <ObservatoryScene scrollProgress={scrollYProgress} />
            </Canvas>
          </div>
        )}

        {/* Bottom resolution state — fades in at end of traversal */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.90, 0.95], [0, 0.6]) }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center"
        >
          <div className="font-mono text-[9px] text-accent/70 tracking-widest uppercase flex items-center gap-3">
            <div className="w-8 h-[1px] bg-accent/40" />
            <span>ANALYSIS COMPLETE — RETURNING TO PORTFOLIO</span>
            <div className="w-8 h-[1px] bg-accent/40" />
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}

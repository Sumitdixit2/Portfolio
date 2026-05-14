'use client';

import { useRef, useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
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

  return (
    <section ref={containerRef} className="relative h-[800vh] w-full bg-background border-t border-border/50">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden drafting-border flex flex-col justify-center bg-surface/30">
        
        {/* Drafting Crosshairs */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/50 z-20" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent/50 z-20" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent/50 z-20" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent/50 z-20" />

        {/* Viewport UI */}
        <div className="absolute top-6 left-6 z-20 pointer-events-none">
          <SystemAnnotation label="SECTION" value="AETHER_CORE_ASSEMBLY" />
        </div>
        
        <ObservatoryHud />

        {/* Narrative HTML Overlays */}
        <ObservatoryOverlays scrollProgress={scrollYProgress} />

        {/* 3D Canvas */}
        {isMounted && (
          <div className="absolute inset-0 z-10">
            <Canvas dpr={[1, 1.5]} className="cursor-crosshair">
              <color attach="background" args={['#0A192F']} />
              {/* Very distant fog: just enough to dissolve extreme edges, not the assembly */}
              <fog attach="fog" args={['#0A192F', 35, 80]} />
              
              <OrthographicCamera 
                makeDefault 
                position={[20, 20, 20]} 
                zoom={50} 
                near={-100} 
                far={100}
                onUpdate={c => c.lookAt(0, 0, 0)}
              />
              {/* Key light — crisp white, strong enough to catch edges on near-void surfaces */}
              <directionalLight position={[8, 14, 8]} intensity={5.0} color="#e6f1ff" />
              {/* Rim light — teal from lower-back, carves silhouette from darkness */}
              <directionalLight position={[-10, -6, -12]} intensity={3.5} color="#64FFDA" />
              {/* Fill light — prevents total shadow crush */}
              <directionalLight position={[0, -8, 10]} intensity={1.8} color="#ccd6f6" />
              {/* Low ambient — barely enough to hint at deep geometry */}
              <ambientLight intensity={0.2} color="#0A192F" />
              
              <ObservatoryScene scrollProgress={scrollYProgress} />
            </Canvas>
          </div>
        )}
      </div>
    </section>
  );
}

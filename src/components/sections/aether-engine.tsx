'use client';

import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import { EngineAssembly } from '../3d/engine-nodes';

export function AetherEngine() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-surface/20 border border-border/50">
        <span className="font-mono text-xs text-muted uppercase tracking-widest animate-pulse">
          [INITIALIZING_OBSERVATORY...]
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-full bg-surface/10 border border-border/50 relative overflow-hidden group">
      {/* Drafting Crosshairs */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/50 -translate-x-[1px] -translate-y-[1px] z-20" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent/50 translate-x-[1px] -translate-y-[1px] z-20" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent/50 -translate-x-[1px] translate-y-[1px] z-20" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent/50 translate-x-[1px] translate-y-[1px] z-20" />

      {/* Viewport Metadata */}
      <div className="absolute top-4 left-4 z-20 flex justify-between items-center w-[calc(100%-2rem)] pointer-events-none">
        <span className="font-mono text-[9px] text-muted uppercase tracking-widest bg-background/80 px-2 py-1 drafting-border backdrop-blur-sm">
          OBSERVATORY_VIEWPORT
        </span>
        <span className="font-mono text-[9px] text-accent/80 uppercase tracking-widest bg-background/90 px-2 py-1 backdrop-blur-sm drafting-border">
          [LIVE_TELEMETRY]
        </span>
      </div>

      <div className="absolute inset-0 z-10">
        <Canvas 
          dpr={[1, 1.5]} 
          className="cursor-crosshair"
        >
          <OrthographicCamera 
            makeDefault 
            position={[10, 10, 10]} 
            zoom={40} 
            near={-100} 
            far={100} 
            onUpdate={(c) => c.lookAt(0, 0, 0)}
          />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#64FFDA" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8892B0" />
          <EngineAssembly />
        </Canvas>
      </div>

      {/* Bottom Metadata */}
      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
        <div className="font-mono text-[10px] text-muted flex flex-col gap-1.5 bg-background/80 backdrop-blur-sm p-3 drafting-border">
          <div className="flex justify-between border-b border-border/50 pb-1.5">
            <span>RENDER_MODE</span>
            <span className="text-foreground/80">ORTHOGRAPHIC_CAD</span>
          </div>
          <div className="flex justify-between pt-1">
            <span>SYSTEM_STATE</span>
            <span className="text-accent flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              NOMINAL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

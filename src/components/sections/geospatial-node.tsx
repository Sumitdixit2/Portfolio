'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { SystemAnnotation } from '@/components/ui/system-annotation';

const GeospatialScene = dynamic(
  () => import('@/components/3d/geospatial-scene').then((mod) => mod.GeospatialScene),
  { ssr: false }
);

export function GeospatialNode() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldLoadScene = useInView(containerRef, { once: true, margin: "1000px" });

  return (
    <div ref={containerRef} className="flex flex-col gap-4 h-full w-full">
      <SystemAnnotation label="SYS_NODE" value="GEO_OBSERVATORY" className="mb-2" />
      
      {/* Globe Container — restrained, instrument-scale */}
      <div className="relative w-full aspect-square drafting-border bg-surface/30 overflow-hidden group">
        
        {/* Precision Crosshairs */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent/50 -translate-x-[1px] -translate-y-[1px] z-20 transition-all duration-500 group-hover:border-accent" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent/50 translate-x-[1px] -translate-y-[1px] z-20 transition-all duration-500 group-hover:border-accent" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-accent/50 -translate-x-[1px] translate-y-[1px] z-20 transition-all duration-500 group-hover:border-accent" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent/50 translate-x-[1px] translate-y-[1px] z-20 transition-all duration-500 group-hover:border-accent" />

        {/* Top Left Metadata */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none flex flex-col gap-2">
          <div className="font-mono text-[9px] text-accent/80 uppercase tracking-widest bg-background/80 px-2 py-1 drafting-border backdrop-blur-sm">
            [GEO_SYNC_LOCKED]
          </div>
          <div className="font-mono text-[9px] text-muted uppercase tracking-widest bg-background/60 px-2 py-0.5 drafting-border border-border/30">
            OBSERVATORY_LOCK: TRUE
          </div>
        </div>

        {/* Bottom Right Metadata Panel */}
        <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
          <div className="font-mono text-[10px] text-muted flex flex-col gap-1.5 bg-background/90 backdrop-blur-md p-3 drafting-border">
            <div className="flex justify-between border-b border-border/50 pb-1.5 gap-8">
              <span>DEPLOYMENT_REGION</span>
              <span className="text-foreground/80">NCR/INDIA</span>
            </div>
            <div className="flex justify-between border-b border-border/50 py-1.5 gap-8">
              <span>NETWORK_STATUS</span>
              <span className="text-accent flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                STABLE
              </span>
            </div>
            <div className="flex justify-between pt-1.5 gap-8">
              <span>LATENCY_STATE</span>
              <span className="text-foreground/80">OPTIMAL</span>
            </div>
          </div>
        </div>

        {/* 3D Scene */}
        {shouldLoadScene ? (
          <GeospatialScene />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <SystemAnnotation label="STATUS" value="INITIALIZING_GEO_TOPOLOGY" className="animate-pulse opacity-50" />
          </div>
        )}

        {/* Ambient Overlay to integrate with section lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
}

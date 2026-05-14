'use client';

import { useEffect, useRef } from 'react';

export function ObservatoryHud() {
  const timeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number;
    const updateTime = () => {
      if (timeRef.current) {
        const now = new Date();
        timeRef.current.innerText = now.toISOString().slice(0, 23) + 'Z | T_SYNC';
      }
      frameId = requestAnimationFrame(updateTime);
    };
    updateTime();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">

      {/* Corner brackets — tight and precise */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-accent/30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-accent/30" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-accent/30" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-accent/30" />

      {/* Center crosshair — very faint */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] opacity-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-accent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-accent" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-[1px] bg-accent" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-[1px] bg-accent" />
        {/* Orbit ring */}
        <div className="absolute inset-0 rounded-full border border-accent/40" />
      </div>

      {/* Top-left identifiers */}
      <div className="absolute top-8 left-10 font-mono text-[9px] text-accent/40 flex flex-col gap-[3px] tracking-widest uppercase">
        <div>OBS // AETHER_CORE</div>
        <div>SECTOR: SD-001</div>
      </div>

      {/* Top-right live timestamp */}
      <div className="absolute top-8 right-10 font-mono text-[9px] text-accent/40 text-right tracking-widest uppercase">
        <div ref={timeRef}>0000-00-00T00:00:00.000Z | T_SYNC</div>
        <div className="mt-[3px]">OPS: OBSERVATORY</div>
      </div>

      {/* Bottom-left diagnostics */}
      <div className="absolute bottom-8 left-10 font-mono text-[9px] text-accent/35 tracking-widest uppercase flex flex-col gap-[3px]">
        <div>FRAME_LOCK: <span className="text-accent/60">NOMINAL</span></div>
        <div className="w-24 h-[1px] bg-accent/20 mt-1">
          <div className="h-full bg-accent/50 w-[72%]" />
        </div>
      </div>

      {/* Bottom-right assembly state */}
      <div className="absolute bottom-8 right-10 font-mono text-[9px] text-accent/35 text-right tracking-widest uppercase">
        <div>ASSEMBLY: <span className="text-accent/60">DYNAMIC</span></div>
        <div className="mt-[3px]">ORTHOGRAPHIC: 50× ZOOM</div>
      </div>

    </div>
  );
}

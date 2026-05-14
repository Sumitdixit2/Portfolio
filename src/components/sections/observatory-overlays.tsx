'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

function OverlayBlock({ 
  progress, 
  range, 
  yOffset = 30, 
  className, 
  title,
  sequence,
  children 
}: { 
  progress: MotionValue<number>; 
  range: [number, number, number, number]; 
  yOffset?: number;
  className?: string;
  title: string;
  sequence: string;
  children: ReactNode;
}) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, [range[0], range[3]], [yOffset, -yOffset]);
  
  return (
    <motion.div style={{ opacity, y }} className={`absolute max-w-sm pointer-events-none ${className}`}>
      <div className="font-mono text-[10px] text-muted tracking-widest uppercase mb-4 border-b border-border/50 pb-2 flex gap-2">
        <span className="text-accent">{sequence}</span>
      </div>
      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground uppercase mb-4">
        {title}
      </h3>
      <div className="font-mono text-[11px] md:text-xs text-muted leading-relaxed flex flex-col gap-2">
        {children}
      </div>
    </motion.div>
  );
}

export function ObservatoryOverlays({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
      
      {/* 1. Boot */}
      <OverlayBlock progress={scrollProgress} range={[0.0, 0.02, 0.06, 0.08]} sequence="[SEQ_01]" title="System Boot" className="top-1/4 left-10 md:left-24">
        <p>Observatory Online.<br/>Telemetry synchronizing.<br/>Awaiting structural analysis.</p>
      </OverlayBlock>

      {/* 2. Calibration */}
      <OverlayBlock progress={scrollProgress} range={[0.07, 0.09, 0.13, 0.15]} sequence="[SEQ_02]" title="Alignment Calibration" className="top-1/3 right-10 md:right-24 text-right">
        <p>Establishing stable operational geometry.<br/>Calibrating inertial dampeners.<br/>Viewport locked.</p>
      </OverlayBlock>

      {/* 3. Shell Unlock */}
      <OverlayBlock progress={scrollProgress} range={[0.14, 0.16, 0.20, 0.22]} sequence="[SEQ_03]" title="Outer Shell Unlock" className="bottom-1/4 left-10 md:left-24">
        <p>Disengaging isolation casing.<br/>Atmospheric seal broken.<br/>Preparing for internal instrumentation exposure.</p>
      </OverlayBlock>

      {/* 4. Rings */}
      <OverlayBlock progress={scrollProgress} range={[0.21, 0.23, 0.28, 0.30]} sequence="[SEQ_04]" title="Stabilization Rings" className="top-1/4 right-10 md:right-24 text-right">
        <p>Vector rings active.<br/>Maintaining axial equilibrium during structural expansion.<br/>Gyroscopic stabilization nominal.</p>
      </OverlayBlock>

      {/* 5. Infrastructure */}
      <OverlayBlock progress={scrollProgress} range={[0.29, 0.32, 0.37, 0.39]} sequence="[SEQ_05]" title="Runtime Infrastructure" className="bottom-1/3 left-10 md:left-24">
        <p className="border-l-2 border-accent/30 pl-3">Node.js execution environment isolated.</p>
        <p className="border-l-2 border-accent/30 pl-3">Bun runtime processes verified.</p>
        <p className="border-l-2 border-accent/30 pl-3">API Gateway channels open.</p>
      </OverlayBlock>

      {/* 6. Reactor Reveal */}
      <OverlayBlock progress={scrollProgress} range={[0.38, 0.41, 0.46, 0.48]} sequence="[SEQ_06]" title="Reactor Exposure" className="top-1/3 right-10 md:right-24 text-right">
        <p>Core mechanisms fully visible.<br/>Analyzing data layer persistence.<br/>Postgres and Redis clusters maintaining state.</p>
      </OverlayBlock>

      {/* 7. Motion Systems */}
      <OverlayBlock progress={scrollProgress} range={[0.47, 0.50, 0.55, 0.57]} sequence="[SEQ_07]" title="Motion Analysis" className="bottom-1/4 left-10 md:left-24">
        <p>Tracking synchronization loops.<br/>Operational UI engineering maintains 60fps interaction fidelity under heavy load.</p>
      </OverlayBlock>

      {/* 8. Architectural Philosophy */}
      <OverlayBlock progress={scrollProgress} range={[0.56, 0.59, 0.64, 0.66]} sequence="[SEQ_08]" title="Architectural Philosophy" className="top-1/4 right-10 md:right-24 text-right">
        <p>Systems thinking applied to visual consistency.<br/>Performance-first design.<br/>Engineering over ornamentation.</p>
      </OverlayBlock>

      {/* 9. Instrumentation Sync */}
      <OverlayBlock progress={scrollProgress} range={[0.65, 0.68, 0.73, 0.75]} sequence="[SEQ_09]" title="Instrumentation Sync" className="bottom-1/3 left-10 md:left-24">
        <p>All mechanical layers aligned.<br/>Blueprint restraint applied to structural hierarchy.<br/>Maximum exploded view achieved.</p>
      </OverlayBlock>

      {/* 10. Operational Discipline */}
      <OverlayBlock progress={scrollProgress} range={[0.74, 0.77, 0.83, 0.85]} sequence="[SEQ_10]" title="Operational Discipline" className="top-1/3 right-10 md:right-24 text-right">
        <p>Evaluating long-term reliability.<br/>Built to scale without architectural degradation.<br/>Precision is a habit, not an accident.</p>
      </OverlayBlock>

      {/* 11. Dossier Complete */}
      <OverlayBlock progress={scrollProgress} range={[0.84, 0.87, 0.93, 0.95]} sequence="[SEQ_11]" title="Evaluation Complete" className="bottom-1/4 left-10 md:left-24">
        <p className="text-accent flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 bg-accent animate-pulse rounded-full" />
          ANALYSIS_CONCLUDES
        </p>
        <p>Operator SD-001 exhibits required engineering maturity.<br/>Dossier ready for extraction.</p>
      </OverlayBlock>

      {/* 12. Resolution */}
      <OverlayBlock progress={scrollProgress} range={[0.94, 0.96, 1.0, 1.0]} sequence="[SEQ_12]" title="Observatory Resolution" className="top-1/3 right-10 md:right-24 text-right">
        <p>Re-engaging containment field.<br/>Restoring standard page flow.<br/>Systems entering background observation mode.</p>
      </OverlayBlock>

    </div>
  );
}

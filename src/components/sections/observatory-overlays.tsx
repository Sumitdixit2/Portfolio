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
    <motion.div style={{ opacity, y }} className={`absolute max-w-[280px] pointer-events-none ${className}`}>
      {/* Sequence label */}
      <div className="font-mono text-[8px] text-accent/60 tracking-[0.25em] uppercase mb-2 flex items-center gap-2">
        <div className="w-3 h-[1px] bg-accent/40" />
        <span>{sequence}</span>
      </div>
      {/* Stage title */}
      <h3 className="text-base md:text-lg font-bold tracking-[0.08em] text-foreground uppercase mb-3 leading-tight">
        {title}
      </h3>
      {/* Body — restrained dossier prose */}
      <div className="font-mono text-[10px] text-muted/80 leading-[1.7] flex flex-col gap-1.5">
        {children}
      </div>
      {/* Bottom separator */}
      <div className="mt-4 w-12 h-[1px] bg-border/60" />
    </motion.div>
  );
}

export function ObservatoryOverlays({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
      
      {/* 1. Boot — very early, dissolves before first motion */}
      <OverlayBlock progress={scrollProgress} range={[0.0, 0.01, 0.04, 0.05]} sequence="[SEQ_01]" title="System Boot" className="top-1/4 left-10 md:left-24">
        <p>Observatory Online.<br/>Telemetry synchronizing.<br/>Awaiting structural analysis.</p>
      </OverlayBlock>

      {/* 2. Calibration — as shell begins unlocking */}
      <OverlayBlock progress={scrollProgress} range={[0.06, 0.075, 0.115, 0.13]} sequence="[SEQ_02]" title="Alignment Calibration" className="top-1/3 right-10 md:right-24 text-right">
        <p>Establishing stable operational geometry.<br/>Calibrating inertial dampeners.<br/>Viewport locked.</p>
      </OverlayBlock>

      {/* 3. Shell Unlock — during shell opening 0.05→0.20 */}
      <OverlayBlock progress={scrollProgress} range={[0.14, 0.155, 0.195, 0.21]} sequence="[SEQ_03]" title="Outer Shell Unlock" className="bottom-1/4 left-10 md:left-24">
        <p>Disengaging isolation casing.<br/>Atmospheric seal broken.<br/>Preparing internal instrumentation exposure.</p>
      </OverlayBlock>

      {/* 4. Rings — during ring explosion 0.22→0.37 */}
      <OverlayBlock progress={scrollProgress} range={[0.22, 0.235, 0.275, 0.29]} sequence="[SEQ_04]" title="Stabilization Rings" className="top-1/4 right-10 md:right-24 text-right">
        <p>Vector rings active.<br/>Maintaining axial equilibrium during structural expansion.<br/>Gyroscopic stabilization nominal.</p>
      </OverlayBlock>

      {/* 5. Infrastructure — mid rings travel */}
      <OverlayBlock progress={scrollProgress} range={[0.30, 0.315, 0.355, 0.37]} sequence="[SEQ_05]" title="Runtime Infrastructure" className="bottom-1/3 left-10 md:left-24">
        <p className="border-l-2 border-accent/30 pl-3">Node.js execution environment isolated.</p>
        <p className="border-l-2 border-accent/30 pl-3">Bun runtime processes verified.</p>
        <p className="border-l-2 border-accent/30 pl-3">API Gateway channels open.</p>
      </OverlayBlock>

      {/* 6. Reactor Reveal — as core begins separating 0.42→0.57 */}
      <OverlayBlock progress={scrollProgress} range={[0.42, 0.435, 0.475, 0.49]} sequence="[SEQ_06]" title="Reactor Exposure" className="top-1/3 right-10 md:right-24 text-right">
        <p>Core mechanisms fully visible.<br/>Analyzing data layer persistence.<br/>Postgres and Redis clusters maintaining state.</p>
      </OverlayBlock>

      {/* 7. Motion Systems — core fully exposed, stabilization active */}
      <OverlayBlock progress={scrollProgress} range={[0.50, 0.515, 0.555, 0.57]} sequence="[SEQ_07]" title="Motion Analysis" className="bottom-1/4 left-10 md:left-24">
        <p>Tracking synchronization loops.<br/>Operational UI engineering maintains 60fps interaction fidelity under heavy load.</p>
      </OverlayBlock>

      {/* 8. Architecture — long observational window 0.58→0.68 */}
      <OverlayBlock progress={scrollProgress} range={[0.58, 0.595, 0.645, 0.66]} sequence="[SEQ_08]" title="Architectural Philosophy" className="top-1/4 right-10 md:right-24 text-right">
        <p>Systems thinking applied to visual consistency.<br/>Performance-first design.<br/>Engineering over ornamentation.</p>
      </OverlayBlock>

      {/* 9. Instrumentation Sync — deep observational period */}
      <OverlayBlock progress={scrollProgress} range={[0.67, 0.685, 0.725, 0.74]} sequence="[SEQ_09]" title="Instrumentation Sync" className="bottom-1/3 left-10 md:left-24">
        <p>All mechanical layers aligned.<br/>Blueprint restraint applied to structural hierarchy.<br/>Maximum exploded view achieved.</p>
      </OverlayBlock>

      {/* 10. Operational Discipline — longest dwell: the assembly is fully alive here */}
      <OverlayBlock progress={scrollProgress} range={[0.75, 0.765, 0.815, 0.83]} sequence="[SEQ_10]" title="Operational Discipline" className="top-1/3 right-10 md:right-24 text-right">
        <p>Evaluating long-term reliability.<br/>Built to scale without architectural degradation.<br/>Precision is a habit, not an accident.</p>
      </OverlayBlock>

      {/* 11. Dossier Complete — approaching resolution */}
      <OverlayBlock progress={scrollProgress} range={[0.84, 0.855, 0.895, 0.91]} sequence="[SEQ_11]" title="Evaluation Complete" className="bottom-1/4 left-10 md:left-24">
        <p className="text-accent flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 bg-accent animate-pulse rounded-full" />
          ANALYSIS_CONCLUDES
        </p>
        <p>Operator SD-001 exhibits required engineering maturity.<br/>Dossier ready for extraction.</p>
      </OverlayBlock>

      {/* 12. Resolution — final atmospheric fade */}
      <OverlayBlock progress={scrollProgress} range={[0.93, 0.945, 0.985, 1.0]} sequence="[SEQ_12]" title="Observatory Resolution" className="top-1/3 right-10 md:right-24 text-right">
        <p>Re-engaging containment field.<br/>Restoring standard page flow.<br/>Systems entering background observation mode.</p>
      </OverlayBlock>

    </div>
  );
}

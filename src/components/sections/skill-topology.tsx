'use client';

import { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { SystemAnnotation } from '@/components/ui/system-annotation';
import { TopologyCanvas } from './topology/topology-canvas';
import { TopologyNode } from './topology/topology-node';
import { TopologyLegend, MobileTerminalReadout } from './topology/topology-legend';
import { TOPOLOGY_NODES } from '@/data/skills-topology';

// ─────────────────────────────────────────────────────────────────────────────
// Section entrance animation — fires once on scroll-into-view
// ─────────────────────────────────────────────────────────────────────────────

const sectionEntrance = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: 'linear' as const },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SkillTopology — section orchestrator
//
// Owns the single shared `activeNodeId` state. All children are pure —
// they receive state as props and emit events upward.
//
// Runtime profile:
//   - Zero perpetual animation loops
//   - Zero requestAnimationFrame at idle
//   - Hover transitions are CSS (GPU-composited)
//   - SVG signal traces fire once per hover entry, then freeze
// ─────────────────────────────────────────────────────────────────────────────

export function SkillTopology() {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  // 50ms debounce prevents setState thrashing on rapid mouse movement
  // across closely-spaced nodes
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNodeEnter = useCallback((id: string) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setActiveNodeId(id);
  }, []);

  const handleNodeLeave = useCallback(() => {
    leaveTimerRef.current = setTimeout(() => {
      setActiveNodeId(null);
      leaveTimerRef.current = null;
    }, 50);
  }, []);

  return (
    <motion.section
      className="relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionEntrance}
    >
      {/* ── Section Header ─────────────────────────────────────────────────── */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <SystemAnnotation
            label="FIGURE_02"
            value="CAPABILITY_TOPOLOGY_v1.0"
            className="mb-3"
          />
          <p className="font-sans text-muted text-sm leading-relaxed max-w-lg">
            Engineering capability mapped as operational infrastructure.
            Nodes represent active systems. Edges encode real architectural dependencies.
          </p>
        </div>
        <div className="font-mono text-[9px] uppercase tracking-widest text-muted/50 flex-shrink-0 self-end sm:self-auto pb-0.5">
          <span className="text-accent/60">◆</span> 13 NODES · 13 EDGES
        </div>
      </div>

      {/* ── Desktop Topology Canvas (≥768px) ─────────────────────────────── */}
      <div className="hidden md:block">
        {/*
          Fixed aspect ratio container — 1000:500 = 2:1 ratio.
          SVG viewBox and HTML node percentages both target 1000×500 space.
          Scales cleanly at any viewport width without JS measurement.
        */}
        <div
          className="relative w-full drafting-border bg-background/40"
          style={{ paddingTop: '50%' }}
          role="img"
          aria-label="Technical capability topology — an interconnected infrastructure map showing engineering tool dependencies"
        >
          <div className="absolute inset-0">
            {/* SVG layer — all lines, junction dots, sector labels */}
            <TopologyCanvas activeNodeId={activeNodeId} />

            {/* HTML overlay layer — all node labels and interaction targets */}
            {TOPOLOGY_NODES.map((node) => (
              <TopologyNode
                key={node.id}
                node={node}
                activeNodeId={activeNodeId}
                onEnter={handleNodeEnter}
                onLeave={handleNodeLeave}
              />
            ))}
          </div>
        </div>

        {/* Legend bar — below the canvas */}
        <TopologyLegend />
      </div>

      {/* ── Mobile Terminal Readout (<768px) ─────────────────────────────── */}
      <div className="block md:hidden">
        <div className="drafting-border bg-background/40 p-5">
          {/* Terminal header bar */}
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-border/50">
            <span className="font-mono text-[9px] uppercase tracking-widest text-accent/70">
              [CAPABILITY_READOUT]
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted/50">
              TERMINAL_MODE
            </span>
          </div>
          <MobileTerminalReadout />
        </div>
        <TopologyLegend />
      </div>
    </motion.section>
  );
}

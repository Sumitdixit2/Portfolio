'use client';

import { motion } from 'framer-motion';
import { TOPOLOGY_EDGES, TOPOLOGY_CLUSTERS, type TopologyEdge } from '@/data/skills-topology';

// ─────────────────────────────────────────────────────────────────────────────
// Opacity constants — single source of truth for the state machine
// ─────────────────────────────────────────────────────────────────────────────

const EDGE_OPACITY = {
  rest: { primary: 0.18, secondary: 0.10 },
  active: 0.55,          // edge directly connected to focused node
  spinePassive: 0.20,    // primary spine edge when not the active route
  dim: 0.05,             // unrelated secondary edge
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Edge opacity resolver
// ─────────────────────────────────────────────────────────────────────────────

function resolveEdgeOpacity(
  edge: TopologyEdge,
  activeNodeId: string | null,
): number {
  if (!activeNodeId) {
    return edge.weight === 'primary' ? EDGE_OPACITY.rest.primary : EDGE_OPACITY.rest.secondary;
  }

  const isActive = edge.sourceId === activeNodeId || edge.targetId === activeNodeId;
  if (isActive) return EDGE_OPACITY.active;

  // Primary spine edges always maintain a minimum visibility floor
  if (edge.weight === 'primary') return EDGE_OPACITY.spinePassive;

  return EDGE_OPACITY.dim;
}

// ─────────────────────────────────────────────────────────────────────────────
// Signal trace variant — plays once on enter, resets instantly on leave
// ─────────────────────────────────────────────────────────────────────────────

function getSignalVariant(isActive: boolean, duration: number) {
  if (isActive) {
    return {
      pathLength: 1,
      opacity: 0.65,
      transition: {
        pathLength: { duration, ease: 'linear' as const },
        opacity: { duration: 0.05 },
      },
    };
  }
  return {
    pathLength: 0,
    opacity: 0,
    transition: {
      pathLength: { duration: 0 },
      opacity: { duration: 0.12 },
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// TopologyCanvas — pure SVG layer
// Renders: micro-grid texture, cluster sector labels, ghost paths, signal traces
// No interactivity. All interaction lives in TopologyNode (HTML layer above).
// ─────────────────────────────────────────────────────────────────────────────

interface TopologyCanvasProps {
  activeNodeId: string | null;
}

export function TopologyCanvas({ activeNodeId }: TopologyCanvasProps) {
  return (
    <svg
      viewBox="0 0 1000 500"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <defs>
        {/* Fine 20×20 blueprint grid underlay */}
        <pattern id="topo-micro-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="rgba(100,150,255,0.04)"
            strokeWidth="0.5"
          />
        </pattern>

        {/* Accent color for signal traces */}
        <filter id="topo-crisp">
          <feColorMatrix type="saturate" values="1" />
        </filter>
      </defs>

      {/* Background micro-grid */}
      <rect width="100%" height="100%" fill="url(#topo-micro-grid)" />

      {/* ── Cluster sector labels ─────────────────────────────────────────── */}
      {TOPOLOGY_CLUSTERS.map((cluster) => (
        <text
          key={cluster.id}
          x={cluster.labelX}
          y={cluster.labelY}
          fontFamily="var(--font-fira-code, monospace)"
          fontSize="8"
          fill="rgba(136,146,176,1)"
          letterSpacing="0.18em"
          textAnchor="start"
          style={{
            opacity: activeNodeId ? 0 : 0.18,
            transition: 'opacity 300ms linear',
            textTransform: 'uppercase',
          }}
        >
          {cluster.label}
        </text>
      ))}

      {/* ── Edge ghost paths + signal traces ─────────────────────────────── */}
      {TOPOLOGY_EDGES.map((edge) => {
        const isActive =
          activeNodeId !== null &&
          (edge.sourceId === activeNodeId || edge.targetId === activeNodeId);

        const ghostOpacity = resolveEdgeOpacity(edge, activeNodeId);
        const strokeWidth = edge.weight === 'primary' ? 1.5 : 1;
        const dashArray = edge.weight === 'primary' ? undefined : '4 5';
        const ghostStroke =
          edge.weight === 'primary'
            ? 'rgba(230,241,255,0.45)'
            : 'rgba(230,241,255,0.35)';

        return (
          <g key={edge.id}>
            {/* Ghost path — always present, state-driven opacity */}
            <path
              d={edge.path}
              stroke={ghostStroke}
              strokeWidth={strokeWidth}
              strokeDasharray={dashArray}
              strokeLinecap="square"
              fill="none"
              style={{
                opacity: ghostOpacity,
                transition: 'opacity 350ms linear',
              }}
            />

            {/* Signal trace — pathLength animation, only during active hover */}
            <motion.path
              d={edge.path}
              stroke="#64FFDA"
              strokeWidth={edge.weight === 'primary' ? 1.5 : 1}
              strokeLinecap="square"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={getSignalVariant(isActive, edge.signalDuration)}
            />
          </g>
        );
      })}

      {/* ── Spine node junction dots — where multiple edges meet ─────────── */}
      {/* Junction at x=860, y=250 — React UI bus fork */}
      <circle
        cx="860" cy="250" r="2.5"
        fill="rgba(230,241,255,0.3)"
        style={{
          opacity: activeNodeId === 'node-react' ? 0.7 : 0.2,
          transition: 'opacity 250ms linear',
        }}
      />
      {/* Junction at x=390, y=410 — Express data bus fork */}
      <circle
        cx="390" cy="410" r="2.5"
        fill="rgba(230,241,255,0.3)"
        style={{
          opacity: activeNodeId === 'node-express' ? 0.7 : 0.2,
          transition: 'opacity 250ms linear',
        }}
      />
    </svg>
  );
}

// Helper export for typed external use
export type { TopologyCanvasProps };

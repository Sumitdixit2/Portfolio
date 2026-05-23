'use client';

import { useCallback } from 'react';
import { ADJACENCY_MAP, SPINE_NODE_IDS, type TopologyNode } from '@/data/skills-topology';

// ─────────────────────────────────────────────────────────────────────────────
// Node focus state resolver — determines which visual tier applies
// ─────────────────────────────────────────────────────────────────────────────

type FocusState = 'active' | 'adjacent' | 'spine-passive' | 'dim' | 'rest';

function resolveNodeFocusState(
  nodeId: string,
  activeNodeId: string | null,
): FocusState {
  if (!activeNodeId) return 'rest';
  if (nodeId === activeNodeId) return 'active';
  if (ADJACENCY_MAP.get(activeNodeId)?.has(nodeId)) return 'adjacent';
  // Spine nodes never fully dim — they hold at a passive floor
  if (SPINE_NODE_IDS.has(nodeId)) return 'spine-passive';
  return 'dim';
}

// ─────────────────────────────────────────────────────────────────────────────
// Opacity/color maps — single source of truth per focus state
// ─────────────────────────────────────────────────────────────────────────────

const STATE_STYLES: Record<FocusState, {
  markerOpacity: number;
  markerBorderColor: string;
  codeOpacity: number;
  codeColor: string;
  labelOpacity: number;
  labelColor: string;
}> = {
  active: {
    markerOpacity: 1.0,
    markerBorderColor: '#64FFDA',
    codeOpacity: 1.0,
    codeColor: '#64FFDA',
    labelOpacity: 0.9,
    labelColor: 'rgba(230,241,255,0.85)',
  },
  adjacent: {
    markerOpacity: 0.78,
    markerBorderColor: 'rgba(230,241,255,0.6)',
    codeOpacity: 0.65,
    codeColor: 'rgba(136,146,176,1)',
    labelOpacity: 0.60,
    labelColor: 'rgba(136,146,176,1)',
  },
  'spine-passive': {
    // Spine nodes never collapse — they maintain structural presence
    markerOpacity: 0.42,
    markerBorderColor: 'rgba(230,241,255,0.35)',
    codeOpacity: 0.38,
    codeColor: 'rgba(136,146,176,0.8)',
    labelOpacity: 0.34,
    labelColor: 'rgba(136,146,176,0.7)',
  },
  dim: {
    markerOpacity: 0.28,
    markerBorderColor: 'rgba(230,241,255,0.22)',
    codeOpacity: 0.25,
    codeColor: 'rgba(136,146,176,0.5)',
    labelOpacity: 0.22,
    labelColor: 'rgba(136,146,176,0.45)',
  },
  rest: {
    // Rest state uses tier-driven opacity in the component itself
    markerOpacity: 1,
    markerBorderColor: 'rgba(230,241,255,0.4)',
    codeOpacity: 1,
    codeColor: 'rgba(136,146,176,1)',
    labelOpacity: 1,
    labelColor: 'rgba(136,146,176,0.8)',
  },
};

// Tier-driven rest opacities — rest state differs per tier
const TIER_REST_OPACITY: Record<number, { marker: number; code: number; label: number }> = {
  1: { marker: 0.58, code: 0.55, label: 0.50 },   // spine — most visible at rest
  2: { marker: 0.40, code: 0.38, label: 0.35 },   // satellite
  3: { marker: 0.28, code: 0.26, label: 0.24 },   // peripheral — recessive at rest
};

// ─────────────────────────────────────────────────────────────────────────────
// TopologyNode — HTML node overlay positioned over SVG canvas
// ─────────────────────────────────────────────────────────────────────────────

interface TopologyNodeProps {
  node: TopologyNode;
  activeNodeId: string | null;
  onEnter: (id: string) => void;
  onLeave: () => void;
}

export function TopologyNode({
  node,
  activeNodeId,
  onEnter,
  onLeave,
}: TopologyNodeProps) {
  const focusState = resolveNodeFocusState(node.id, activeNodeId);
  const isActive = focusState === 'active';

  // Resolve final opacity values
  let styles: typeof STATE_STYLES[FocusState];
  let markerO: number, codeO: number, labelO: number;

  if (focusState === 'rest') {
    styles = STATE_STYLES.rest;
    const tierOpacity = TIER_REST_OPACITY[node.tier];
    markerO = tierOpacity.marker;
    codeO = tierOpacity.code;
    labelO = tierOpacity.label;
  } else {
    styles = STATE_STYLES[focusState];
    markerO = styles.markerOpacity;
    codeO = styles.codeOpacity;
    labelO = styles.labelOpacity;
  }

  const handleEnter = useCallback(() => onEnter(node.id), [node.id, onEnter]);

  // Position: percentage of the 1000×500 ViewBox
  const leftPct = (node.x / 1000) * 100;
  const topPct = (node.y / 500) * 100;

  // Label group offset from marker center (in %)
  // Marker is 6px diamond; label group sits offset from center
  const LABEL_OFFSET_PX = 12; // px offset from the marker center

  const labelStyle: React.CSSProperties = {
    position: 'absolute',
    ...(node.labelAnchor === 'bottom' && {
      top: `calc(100% + ${LABEL_OFFSET_PX}px)`,
      left: '50%',
      transform: 'translateX(-50%)',
    }),
    ...(node.labelAnchor === 'top' && {
      bottom: `calc(100% + ${LABEL_OFFSET_PX}px)`,
      left: '50%',
      transform: 'translateX(-50%)',
    }),
    ...(node.labelAnchor === 'right' && {
      left: `calc(100% + ${LABEL_OFFSET_PX}px)`,
      top: '50%',
      transform: 'translateY(-50%)',
    }),
    ...(node.labelAnchor === 'left' && {
      right: `calc(100% + ${LABEL_OFFSET_PX}px)`,
      top: '50%',
      transform: 'translateY(-50%)',
    }),
    whiteSpace: 'nowrap',
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: `${leftPct}%`,
        top: `${topPct}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        cursor: 'crosshair',
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={onLeave}
      aria-label={`${node.sysTag} — ${node.label}`}
    >
      {/* Geometric marker — 6×6 rotated square (PCB diamond) */}
      <div
        style={{
          width: '7px',
          height: '7px',
          border: `1px solid ${styles.markerBorderColor}`,
          backgroundColor: isActive ? 'rgba(100,255,218,0.15)' : 'transparent',
          transform: 'rotate(45deg)',
          opacity: markerO,
          transition: 'opacity 250ms linear, border-color 250ms linear, background-color 250ms linear',
          position: 'relative',
          zIndex: 2,
        }}
      />

      {/* Label group — always rendered, never hidden */}
      <div style={labelStyle}>
        {/* Classification code — [~] SYS_NODE */}
        <div
          style={{
            fontFamily: 'var(--font-fira-code, monospace)',
            fontSize: '8px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: styles.codeColor,
            opacity: codeO,
            transition: 'opacity 250ms linear, color 250ms linear',
            lineHeight: 1.2,
            marginBottom: '2px',
          }}
        >
          {node.sysTag}
        </div>

        {/* Human-readable label — React View Runtime */}
        <div
          style={{
            fontFamily: 'var(--font-space-grotesk, sans-serif)',
            fontSize: '10px',
            letterSpacing: '0.03em',
            color: styles.labelColor,
            opacity: labelO,
            transition: 'opacity 250ms linear, color 250ms linear',
            lineHeight: 1.3,
          }}
        >
          {node.label}
        </div>
      </div>
    </div>
  );
}

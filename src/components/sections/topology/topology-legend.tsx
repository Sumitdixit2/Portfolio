'use client';

import { TOPOLOGY_CLUSTERS, TOPOLOGY_NODES } from '@/data/skills-topology';

// ─────────────────────────────────────────────────────────────────────────────
// TopologyLegend — static footer bar
// Shows domain key and interaction hint.
// ─────────────────────────────────────────────────────────────────────────────

const SYMBOL_KEY = [
  { symbol: '[+]', meaning: 'Language Core' },
  { symbol: '[~]', meaning: 'Runtime / Framework' },
  { symbol: '[#]', meaning: 'Data / Storage' },
  { symbol: '[^]', meaning: 'Operational / DevOps' },
  { symbol: '[-]', meaning: 'Interface / UI' },
];

export function TopologyLegend() {
  return (
    <div
      className="mt-6 pt-4 border-t border-border/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      aria-hidden="true"
    >
      {/* Symbol key */}
      <div className="flex flex-wrap gap-x-5 gap-y-1.5">
        {SYMBOL_KEY.map((entry) => (
          <div
            key={entry.symbol}
            className="flex items-center gap-2"
          >
            <span
              className="font-mono text-[8px] tracking-widest uppercase"
              style={{ color: 'rgba(100,255,218,0.55)' }}
            >
              {entry.symbol}
            </span>
            <span
              className="font-mono text-[8px] tracking-wider uppercase"
              style={{ color: 'rgba(136,146,176,0.6)' }}
            >
              {entry.meaning}
            </span>
          </div>
        ))}
      </div>

      {/* Interaction hint */}
      <div
        className="font-mono text-[8px] tracking-widest uppercase"
        style={{ color: 'rgba(136,146,176,0.35)' }}
      >
        HOVER NODE → TRACE SIGNAL PATH
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MobileTerminalReadout — classified terminal list for <768px
// Same data source as desktop topology. Cluster order mirrors left-to-right
// reading order of the full topology.
// ─────────────────────────────────────────────────────────────────────────────

const CLUSTER_ORDER: Array<import('@/data/skills-topology').DomainCluster> = [
  'LANGUAGE_CORE',
  'RUNTIME_SYSTEMS',
  'DATA_INFRASTRUCTURE',
  'DEPLOYMENT_OPS',
  'INTERFACE_LAYER',
];

export function MobileTerminalReadout() {
  return (
    <div className="flex flex-col gap-6" role="list" aria-label="Capability inventory">
      {CLUSTER_ORDER.map((clusterId) => {
        const cluster = TOPOLOGY_CLUSTERS.find((c) => c.id === clusterId);
        const clusterNodes = TOPOLOGY_NODES.filter((n) => n.cluster === clusterId);
        if (!cluster || clusterNodes.length === 0) return null;

        return (
          <div key={clusterId} role="listitem">
            {/* Cluster header */}
            <div
              className="font-mono text-[9px] tracking-[0.2em] uppercase pb-2 mb-2 border-b border-border/40"
              style={{ color: 'rgba(136,146,176,0.55)' }}
            >
              {cluster.label} {Array(Math.max(0, 32 - cluster.label.length)).fill('─').join('')}
            </div>

            {/* Node rows */}
            <div className="flex flex-col gap-1.5">
              {clusterNodes.map((node) => (
                <div
                  key={node.id}
                  className="flex items-baseline gap-4"
                >
                  <span
                    className="font-mono text-[9px] tracking-widest uppercase flex-shrink-0"
                    style={{ color: 'rgba(100,255,218,0.6)', minWidth: '80px' }}
                  >
                    {node.sysTag}
                  </span>
                  <span
                    className="font-sans text-[11px]"
                    style={{ color: 'rgba(230,241,255,0.55)' }}
                  >
                    {node.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

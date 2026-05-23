// ─────────────────────────────────────────────────────────────────────────────
// THE BLUEPRINT — Skills Topology Data
// A static, authored graph representing engineering capability dependencies.
// ViewBox coordinate space: 1000 × 500
// All paths use strict 90° PCB/schematic Manhattan routing.
// ─────────────────────────────────────────────────────────────────────────────

export type DomainCluster =
  | 'LANGUAGE_CORE'
  | 'RUNTIME_SYSTEMS'
  | 'DATA_INFRASTRUCTURE'
  | 'DEPLOYMENT_OPS'
  | 'INTERFACE_LAYER';

/** Node visual tier — drives rest-state opacity and focus-state floor */
export type NodeTier = 1 | 2 | 3;

export interface TopologyNode {
  id: string;
  /** Operational identifier — always visible, top line */
  sysTag: string;
  /** Human-readable label — always visible, bottom line */
  label: string;
  cluster: DomainCluster;
  /** 1 = spine (highest), 2 = satellite, 3 = peripheral */
  tier: NodeTier;
  /** ViewBox x coordinate (center of node marker) */
  x: number;
  /** ViewBox y coordinate (center of node marker) */
  y: number;
  /** Which side the label group renders relative to the marker */
  labelAnchor: 'top' | 'bottom' | 'left' | 'right';
}

export interface TopologyEdge {
  id: string;
  sourceId: string;
  targetId: string;
  /** primary = solid 1.5px spine line; secondary = dashed 1px branch */
  weight: 'primary' | 'secondary';
  /** Hand-authored SVG path string — strict 90° Manhattan routing */
  path: string;
  /**
   * Signal trace duration in seconds — proportional to visual path length.
   * Short (<200px equivalent): 0.7s | Medium: 1.1s | Long (>400px): 1.4s
   */
  signalDuration: 0.7 | 1.1 | 1.4;
}

export interface TopologyCluster {
  id: DomainCluster;
  /** Sector label — "// RUNTIME_SYSTEMS" */
  label: string;
  /** ViewBox coordinates for the label text */
  labelX: number;
  labelY: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// NODE INVENTORY
// ─────────────────────────────────────────────────────────────────────────────
// Symbol key:
//   [+] LANG_  → Language Core
//   [~] SYS_   → Runtime System / Framework
//   [#] DAT_   → Data / Storage
//   [^] OPS_   → Operational / DevOps
//   [-] UI_    → Interface / UI Layer

export const TOPOLOGY_NODES: TopologyNode[] = [
  // ── LANGUAGE_CORE ──────────────────────────────────────────────────────────
  {
    id: 'node-ts',
    sysTag: '[+] LANG_TS',
    label: 'TypeScript Core',
    cluster: 'LANGUAGE_CORE',
    tier: 1, // SPINE — foundation of the primary execution chain
    x: 80, y: 250,
    labelAnchor: 'bottom',
  },
  {
    id: 'node-js',
    sysTag: '[+] LANG_JS',
    label: 'JavaScript Runtime',
    cluster: 'LANGUAGE_CORE',
    tier: 3, // Peripheral — feeds same runtime as TS
    x: 80, y: 90,
    labelAnchor: 'bottom',
  },

  // ── RUNTIME_SYSTEMS ────────────────────────────────────────────────────────
  {
    id: 'node-node',
    sysTag: '[~] SYS_NODE',
    label: 'Node.js Runtime',
    cluster: 'RUNTIME_SYSTEMS',
    tier: 1, // SPINE — primary execution host, central hub
    x: 300, y: 250,
    labelAnchor: 'bottom',
  },
  {
    id: 'node-next',
    sysTag: '[~] SYS_NXT',
    label: 'Next.js Framework',
    cluster: 'RUNTIME_SYSTEMS',
    tier: 1, // SPINE
    x: 560, y: 250,
    labelAnchor: 'bottom',
  },
  {
    id: 'node-react',
    sysTag: '[~] SYS_RCT',
    label: 'React View Runtime',
    cluster: 'RUNTIME_SYSTEMS',
    tier: 1, // SPINE — end of the primary execution chain
    x: 800, y: 250,
    labelAnchor: 'bottom',
  },
  {
    id: 'node-express',
    sysTag: '[~] SYS_EXP',
    label: 'Express API Layer',
    cluster: 'RUNTIME_SYSTEMS',
    tier: 2, // Satellite — branches from Node.js
    x: 300, y: 410,
    labelAnchor: 'bottom',
  },

  // ── DATA_INFRASTRUCTURE ───────────────────────────────────────────────────
  {
    id: 'node-postgres',
    sysTag: '[#] DAT_PG',
    label: 'PostgreSQL Relational',
    cluster: 'DATA_INFRASTRUCTURE',
    tier: 2,
    x: 480, y: 380,
    labelAnchor: 'top',
  },
  {
    id: 'node-redis',
    sysTag: '[#] DAT_RDS',
    label: 'Redis Cache Layer',
    cluster: 'DATA_INFRASTRUCTURE',
    tier: 2,
    x: 480, y: 450,
    labelAnchor: 'bottom',
  },
  {
    id: 'node-prisma',
    sysTag: '[#] DAT_PRM',
    label: 'Prisma ORM',
    cluster: 'DATA_INFRASTRUCTURE',
    tier: 2,
    x: 660, y: 380,
    labelAnchor: 'top',
  },

  // ── DEPLOYMENT_OPS ────────────────────────────────────────────────────────
  {
    id: 'node-actions',
    sysTag: '[^] OPS_GHA',
    label: 'GitHub Actions CI/CD',
    cluster: 'DEPLOYMENT_OPS',
    tier: 3,
    x: 420, y: 90,
    labelAnchor: 'top',
  },
  {
    id: 'node-docker',
    sysTag: '[^] OPS_DCK',
    label: 'Docker Containerization',
    cluster: 'DEPLOYMENT_OPS',
    tier: 2,
    x: 560, y: 90,
    labelAnchor: 'top',
  },
  {
    id: 'node-nginx',
    sysTag: '[^] OPS_NGX',
    label: 'Nginx Reverse Proxy',
    cluster: 'DEPLOYMENT_OPS',
    tier: 2,
    x: 700, y: 90,
    labelAnchor: 'top',
  },

  // ── INTERFACE_LAYER ───────────────────────────────────────────────────────
  {
    id: 'node-tailwind',
    sysTag: '[-] UI_TWD',
    label: 'Tailwind CSS',
    cluster: 'INTERFACE_LAYER',
    tier: 3,
    x: 920, y: 190,
    labelAnchor: 'right',
  },
  {
    id: 'node-framer',
    sysTag: '[-] UI_FMR',
    label: 'Framer Motion',
    cluster: 'INTERFACE_LAYER',
    tier: 3,
    x: 920, y: 310,
    labelAnchor: 'right',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// EDGE INVENTORY — 13 real architectural dependencies
// All paths obey strict 90° PCB Manhattan routing.
// Shared junction points are intentional PCB bus joins.
// ─────────────────────────────────────────────────────────────────────────────

export const TOPOLOGY_EDGES: TopologyEdge[] = [
  // ── PRIMARY SPINE EDGES (solid 1.5px) ─────────────────────────────────────
  // These three edges form the primary execution backbone.
  {
    id: 'e-ts-node',
    sourceId: 'node-ts',
    targetId: 'node-node',
    weight: 'primary',
    path: 'M 80 250 L 300 250',
    signalDuration: 0.7,
  },
  {
    id: 'e-node-next',
    sourceId: 'node-node',
    targetId: 'node-next',
    weight: 'primary',
    path: 'M 300 250 L 560 250',
    signalDuration: 1.1,
  },
  {
    id: 'e-next-react',
    sourceId: 'node-next',
    targetId: 'node-react',
    weight: 'primary',
    path: 'M 560 250 L 800 250',
    signalDuration: 1.1,
  },

  // ── SECONDARY BRANCH EDGES (dashed 1px) ───────────────────────────────────

  // Language secondary: JS feeds Node runtime via top rail + column drop
  {
    id: 'e-js-node',
    sourceId: 'node-js',
    targetId: 'node-node',
    weight: 'secondary',
    path: 'M 80 90 L 300 90 L 300 250',
    signalDuration: 1.1,
  },

  // Node branches down to Express (same column — x=300 bus)
  {
    id: 'e-node-express',
    sourceId: 'node-node',
    targetId: 'node-express',
    weight: 'secondary',
    path: 'M 300 250 L 300 410',
    signalDuration: 0.7,
  },

  // Express forks to data layer via shared junction at (390, 410)
  {
    id: 'e-express-postgres',
    sourceId: 'node-express',
    targetId: 'node-postgres',
    weight: 'secondary',
    // Depart east → fork up → arrive postgres
    path: 'M 300 410 L 390 410 L 390 380 L 480 380',
    signalDuration: 0.7,
  },
  {
    id: 'e-express-redis',
    sourceId: 'node-express',
    targetId: 'node-redis',
    weight: 'secondary',
    // Depart east → fork down → arrive redis
    path: 'M 300 410 L 390 410 L 390 450 L 480 450',
    signalDuration: 0.7,
  },

  // Prisma abstracts Postgres
  {
    id: 'e-postgres-prisma',
    sourceId: 'node-postgres',
    targetId: 'node-prisma',
    weight: 'secondary',
    path: 'M 480 380 L 660 380',
    signalDuration: 0.7,
  },

  // React branches to UI tools via shared junction bus at x=860
  {
    id: 'e-react-tailwind',
    sourceId: 'node-react',
    targetId: 'node-tailwind',
    weight: 'secondary',
    // Depart east → shared junction → fork up → arrive tailwind
    path: 'M 800 250 L 860 250 L 860 190 L 920 190',
    signalDuration: 0.7,
  },
  {
    id: 'e-react-framer',
    sourceId: 'node-react',
    targetId: 'node-framer',
    weight: 'secondary',
    // Depart east → shared junction → fork down → arrive framer
    path: 'M 800 250 L 860 250 L 860 310 L 920 310',
    signalDuration: 0.7,
  },

  // DevOps rail: Actions builds Docker, Nginx fronts Docker
  {
    id: 'e-actions-docker',
    sourceId: 'node-actions',
    targetId: 'node-docker',
    weight: 'secondary',
    path: 'M 420 90 L 560 90',
    signalDuration: 0.7,
  },
  {
    id: 'e-nginx-docker',
    sourceId: 'node-nginx',
    targetId: 'node-docker',
    weight: 'secondary',
    path: 'M 700 90 L 560 90',
    signalDuration: 0.7,
  },

  // Docker containerizes Node runtime — routes around the top rail then south
  {
    id: 'e-docker-node',
    sourceId: 'node-docker',
    targetId: 'node-node',
    weight: 'secondary',
    // Drop from docker → cross west at y=150 → enter node column at x=320 → arrive node
    path: 'M 560 90 L 560 150 L 320 150 L 320 250 L 300 250',
    signalDuration: 1.1,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CLUSTER SECTOR LABELS
// ─────────────────────────────────────────────────────────────────────────────

export const TOPOLOGY_CLUSTERS: TopologyCluster[] = [
  {
    id: 'LANGUAGE_CORE',
    label: '// LANG_CORE',
    labelX: 20,
    labelY: 30,
  },
  {
    id: 'RUNTIME_SYSTEMS',
    label: '// RUNTIME_SYS',
    labelX: 220,
    labelY: 30,
  },
  {
    id: 'DATA_INFRASTRUCTURE',
    label: '// DATA_INFRA',
    labelX: 390,
    labelY: 345,
  },
  {
    id: 'DEPLOYMENT_OPS',
    label: '// DEPLOY_OPS',
    labelX: 390,
    labelY: 30,
  },
  {
    id: 'INTERFACE_LAYER',
    label: '// UI_LAYER',
    labelX: 840,
    labelY: 30,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SPINE NODE IDS — for hard opacity floor enforcement
// ─────────────────────────────────────────────────────────────────────────────

export const SPINE_NODE_IDS = new Set(['node-ts', 'node-node', 'node-next', 'node-react']);

// ─────────────────────────────────────────────────────────────────────────────
// ADJACENCY MAP — pre-computed at module load, O(1) hover lookups
// Bidirectional: if A→B exists, both A sees B and B sees A as adjacent.
// ─────────────────────────────────────────────────────────────────────────────

function buildAdjacencyMap(edges: TopologyEdge[]): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>();

  for (const edge of edges) {
    if (!map.has(edge.sourceId)) map.set(edge.sourceId, new Set());
    if (!map.has(edge.targetId)) map.set(edge.targetId, new Set());
    map.get(edge.sourceId)!.add(edge.targetId);
    map.get(edge.targetId)!.add(edge.sourceId); // bidirectional
  }

  return map;
}

export const ADJACENCY_MAP: Map<string, Set<string>> = buildAdjacencyMap(TOPOLOGY_EDGES);

// ─────────────────────────────────────────────────────────────────────────────
// SYSTEM REGISTRY DATA
// Defines technical skill units and their relationships for the ledger view.
// ─────────────────────────────────────────────────────────────────────────────

export type DomainSector =
  | 'LANG_CORE'     // Language Core
  | 'RUNTIME_SYS'   // Runtime Systems
  | 'DATA_INFRA'    // Data Infrastructure
  | 'DEPLOY_OPS';   // Deployment & Operations

export interface SystemRegistryUnit {
  id: string;
  sysTag: string;       // e.g. [+] LANG_TS
  name: string;         // e.g. TypeScript Core
  sector: DomainSector;
  status: string;       // e.g. ACTIVE // PROD_READY
  metric: number;       // Proficiency/utilization (0-100)
  spec: string;         // Core specification label
  description: string;  // Detailed telemetry description
  connections: string[]; // Integrated component IDs
}

export const SECTOR_LABELS: Record<DomainSector, string> = {
  LANG_CORE: 'Language Core',
  RUNTIME_SYS: 'Runtime Systems',
  DATA_INFRA: 'Data Infrastructure',
  DEPLOY_OPS: 'Deployment & Operations',
};

export const REGISTRY_UNITS: SystemRegistryUnit[] = [
  {
    id: 'node-ts',
    sysTag: '[+] LANG_TS',
    name: 'TypeScript Core',
    sector: 'LANG_CORE',
    status: 'ACTIVE // STATIC_TYPED',
    metric: 94,
    spec: 'v5.4 / Strict Compilation',
    description: 'Primary programming language. Deeply experienced in building type-safe APIs, configuring custom compiler targets, and orchestrating complex type transformations.',
    connections: ['node-node', 'node-express', 'node-js'],
  },
  {
    id: 'node-js',
    sysTag: '[+] LANG_JS',
    name: 'JavaScript Runtime',
    sector: 'LANG_CORE',
    status: 'ACTIVE // EVENT_LOOP',
    metric: 90,
    spec: 'ESNext / V8 Engine',
    description: 'Core execution layer. Deep mastery of closures, prototypical inheritance, event loop mechanics, memory profiles, and asynchronous execution patterns.',
    connections: ['node-node', 'node-ts'],
  },
  {
    id: 'node-node',
    sysTag: '[~] SYS_NODE',
    name: 'Node.js Runtime',
    sector: 'RUNTIME_SYS',
    status: 'ACTIVE // BACKEND_HOST',
    metric: 92,
    spec: 'v20.x LTS / Async I/O',
    description: 'Primary backend execution host. Capable of building custom multi-threaded worker pools, optimizing stream pipelines, and scaling server processes.',
    connections: ['node-ts', 'node-express', 'node-docker'],
  },
  {
    id: 'node-express',
    sysTag: '[~] SYS_EXP',
    name: 'Express API Layer',
    sector: 'RUNTIME_SYS',
    status: 'ACTIVE // REST_GATEWAY',
    metric: 88,
    spec: 'v4.x / Middleware Engine',
    description: 'REST service coordinator. Implemented custom rate limiters, token rotation middleware, centralized error handlers, and schema validation layers.',
    connections: ['node-node', 'node-postgres', 'node-redis'],
  },
  {
    id: 'node-postgres',
    sysTag: '[#] DAT_PG',
    name: 'PostgreSQL Relational',
    sector: 'DATA_INFRA',
    status: 'ONLINE // HOT_REPLICAS',
    metric: 90,
    spec: 'v16.x / ACID Compliant',
    description: 'Primary relational storage engine. Optimized complex query execution plans, designed schemas, set up indexing, and managed connection pools.',
    connections: ['node-express'],
  },
  {
    id: 'node-redis',
    sysTag: '[#] DAT_RDS',
    name: 'Redis Cache Layer',
    sector: 'DATA_INFRA',
    status: 'ONLINE // IN_MEMORY',
    metric: 85,
    spec: 'v7.x / Token Bucket',
    description: 'In-memory cache and pub/sub broker. Managed session caches, token-bucket rate limiting keys, and configured data eviction policies.',
    connections: ['node-express'],
  },
  {
    id: 'node-actions',
    sysTag: '[^] OPS_GHA',
    name: 'GitHub Actions CI/CD',
    sector: 'DEPLOY_OPS',
    status: 'STABLE // AUTO_BUILD',
    metric: 88,
    spec: 'YAML Workflows / Runners',
    description: 'DevOps automation engine. Authored linting and test execution pipelines, automated Docker image registry builds, and set up deployments.',
    connections: ['node-docker'],
  },
  {
    id: 'node-docker',
    sysTag: '[^] OPS_DCK',
    name: 'Docker Containerization',
    sector: 'DEPLOY_OPS',
    status: 'STABLE // VIRTUAL_HOST',
    metric: 90,
    spec: 'v24.x / Multi-Stage Build',
    description: 'Container lifecycle coordinator. Standardized multi-stage container builds, minimized image sizes, managed bridge networks, and orchestrated compose clusters.',
    connections: ['node-node', 'node-actions', 'node-nginx', 'node-linux'],
  },
  {
    id: 'node-nginx',
    sysTag: '[^] OPS_NGX',
    name: 'Nginx Reverse Proxy',
    sector: 'DEPLOY_OPS',
    status: 'ONLINE // SSL_TERM',
    metric: 85,
    spec: 'v1.25 / Load Balancer',
    description: 'External edge router. Configured upstream load-balancing pools, SSL termination (Let\'s Encrypt), static file serving caches, and custom reverse proxy routes.',
    connections: ['node-docker', 'node-linux'],
  },
  {
    id: 'node-linux',
    sysTag: '[^] OPS_LNX',
    name: 'Linux Systems',
    sector: 'DEPLOY_OPS',
    status: 'ONLINE // KERNEL_CORE',
    metric: 88,
    spec: 'Ubuntu / Bash Core',
    description: 'Target execution host environment. Proficient in bash scripting, process management (systemd), SSH tunneling, file-system permissions, and networking socket diagnostics.',
    connections: ['node-docker', 'node-nginx'],
  },
];

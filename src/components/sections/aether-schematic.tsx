'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SystemAnnotation } from '@/components/ui/system-annotation';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

// A strict, sharp-edged box representing an architectural node with anchor ports
function ArchitectureNode({
  title, tech, isActive, className = '',
  portLeftActive, portRightActive,
  hasPortLeft = false, hasPortRight = false,
  diagnostics = []
}: {
  title: string, tech: string, isActive?: boolean, className?: string,
  portLeftActive?: boolean, portRightActive?: boolean,
  hasPortLeft?: boolean, hasPortRight?: boolean,
  diagnostics?: { label: string, value: string }[]
}) {
  return (
    <div className={cn(
      "drafting-border p-4 w-[160px] absolute z-10 transition-colors duration-200 group cursor-crosshair",
      isActive ? "bg-surface border-accent/60 shadow-[0_0_15px_rgba(100,255,218,0.05)]" : "bg-surface/90",
      className
    )}>
      {/* Input Port (Left) */}
      {hasPortLeft && <div className={cn("absolute -left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 drafting-border bg-background transition-colors duration-200", portLeftActive || isActive ? "border-accent/80 bg-accent/20" : "")} />}
      {/* Output Port (Right) */}
      {hasPortRight && <div className={cn("absolute -right-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 drafting-border bg-background transition-colors duration-200", portRightActive || isActive ? "border-accent/80 bg-accent/20" : "")} />}

      <div className={cn(
        "font-mono text-xs uppercase border-b pb-1 mb-2 transition-colors duration-200",
        isActive ? "text-accent border-accent/60" : "text-muted border-border"
      )}>Node</div>
      <h3 className="font-sans font-medium text-foreground text-sm tracking-wide">{title}</h3>
      <p className="font-mono text-[11px] text-accent mt-1">{tech}</p>

      {/* Diagnostics Overlay (Hover) */}
      {diagnostics.length > 0 && (
        <div className="absolute top-full left-0 mt-2 w-full bg-background/95 drafting-border p-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-0 group-hover:duration-100 pointer-events-none shadow-2xl backdrop-blur-sm">
          {diagnostics.map((d, i) => (
            <div key={i} className="flex justify-between items-center font-mono text-[11px] uppercase tracking-wider mb-1 last:mb-0">
              <span className="text-muted">{d.label}</span>
              <span className="text-foreground">{d.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// SVG line drawing animation
const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.5, ease: 'linear' as const }, opacity: { duration: 0.1 } }
  }
};

export function AetherSchematic() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Helper to wrap text for semantic highlighting
  const TextTarget = ({ id, children }: { id: string, children: React.ReactNode }) => (
    <span
      onMouseEnter={() => setActiveNode(id)}
      onMouseLeave={() => setActiveNode(null)}
      className={cn(
        "cursor-default transition-colors duration-200",
        activeNode === id ? "text-accent bg-accent/10 px-1 -mx-1" : "text-foreground"
      )}
    >
      {children}
    </span>
  );

  // Determine which routes are active based on the hovered semantic node
  const routeClientActive = activeNode === 'client' || activeNode === 'gateway' || activeNode === null;
  const routeCoreActive = activeNode === 'core' || activeNode === 'gateway' || activeNode === null;
  const routeDbActive = activeNode === 'db' || activeNode === 'gateway' || activeNode === null;

  return (
    <section className="relative">
      <div className="mb-12">
        <SystemAnnotation label="FIGURE_02" value="PROJECT_HUB_ARCHITECTURE" className="mb-4" />
        <p className="font-sans text-muted max-w-2xl text-sm leading-relaxed">
          Project Hub is a multi-tenant monorepo architecture.
          The Next.js client renders <TextTarget id="client">high-density telemetry dashboards</TextTarget> connected via cookies to an Express gateway. The API enforces <TextTarget id="gateway">Redis Token Bucket rate limiting</TextTarget> and <TextTarget id="core">cryptographic invite validation</TextTarget> before committing transactions to <TextTarget id="db">PostgreSQL database and Redis cache layers</TextTarget>.
        </p>
      </div>

      <div className="w-full overflow-x-auto scrollbar-thin pb-8">
        <div className="relative min-w-[900px] h-[500px] drafting-border bg-background/50">

          {/* The Mathematical SVG Canvas */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 900 500" preserveAspectRatio="xMidYMid meet">

            <defs>
              <pattern id="micro-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(100,150,255,0.03)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#micro-grid)" />

            {/* Main Trunk: Client -> Gateway */}
            <g className={cn("transition-opacity duration-300", routeClientActive ? "opacity-100" : "opacity-10")} stroke="rgba(100,150,255,0.4)" strokeWidth="1.5" fill="none">
              <motion.path d="M 210 250 L 350 250" variants={drawLine} initial="hidden" whileInView="visible" viewport={{ once: true }} />
              <path d="M 210 250 L 350 250" stroke="var(--color-accent, #64FFDA)" strokeWidth="1.5" strokeDasharray="4 200" className="animate-[dash_2.5s_linear_infinite] motion-reduce:hidden opacity-70" />
            </g>

            {/* Junction Split Node */}
            <rect x="577" y="247" width="6" height="6" fill="var(--color-background)" stroke="rgba(100,150,255,0.5)" strokeWidth="1" className={cn("transition-opacity duration-300", activeNode ? "opacity-30" : "opacity-100")} />

            {/* Execution Branch: Gateway -> Core Service */}
            <g className={cn("transition-opacity duration-300", routeCoreActive ? "opacity-100" : "opacity-10")} stroke="rgba(100,150,255,0.3)" strokeWidth="1" fill="none">
              <motion.path d="M 510 250 L 580 250 L 580 130 L 650 130" variants={drawLine} initial="hidden" whileInView="visible" viewport={{ once: true }} />
              <path d="M 510 250 L 580 250 L 580 130 L 650 130" stroke="var(--color-accent, #64FFDA)" strokeWidth="1" strokeDasharray="6 350" className="animate-[dash_3.5s_linear_infinite] motion-reduce:hidden opacity-60" style={{ animationDelay: '0.5s' }} />
            </g>

            {/* Data Branch: Gateway -> Database (Dashed Data Route) */}
            <g className={cn("transition-opacity duration-300", routeDbActive ? "opacity-100" : "opacity-10")} stroke="rgba(100,150,255,0.25)" strokeWidth="1" fill="none">
              <motion.path d="M 510 250 L 580 250 L 580 370 L 650 370" strokeDasharray="4 4" variants={drawLine} initial="hidden" whileInView="visible" viewport={{ once: true }} />
              <path d="M 510 250 L 580 250 L 580 370 L 650 370" stroke="var(--color-accent, #64FFDA)" strokeWidth="1" strokeDasharray="6 350" className="animate-[dash_4s_linear_infinite] motion-reduce:hidden opacity-50" style={{ animationDelay: '1.2s' }} />
            </g>

          </svg>

          {/* CSS for the precise trace animations */}
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes dash {
              from { stroke-dashoffset: 400; }
              to { stroke-dashoffset: 0; }
            }
          `}} />

          {/* Precision Placed Architecture Nodes */}
          {/* Coordinates match the SVG paths: Width 160px. Centers aligned to the lines. */}

          <ArchitectureNode
            title="Client Layer"
            tech="Next.js 15 / React 19"
            isActive={activeNode === 'client'}
            hasPortRight
            portRightActive={routeClientActive && activeNode !== null}
            className="left-[50px] top-[250px] -translate-y-1/2"
            diagnostics={[
              { label: 'WORKSPACE', value: 'APPS/WEB' },
              { label: 'RENDER', value: 'HYDRATED' }
            ]}
          />

          <ArchitectureNode
            title="API Gateway"
            tech="Express / Node.js"
            isActive={activeNode === 'gateway'}
            hasPortLeft hasPortRight
            portLeftActive={routeClientActive && activeNode !== null}
            portRightActive={(routeCoreActive || routeDbActive) && activeNode !== null}
            className="left-[350px] top-[250px] -translate-y-1/2 border-accent/30"
            diagnostics={[
              { label: 'LIMITER', value: 'REDIS_BUCKET' },
              { label: 'WORKSPACE', value: 'APPS/API' }
            ]}
          />
          <span className={cn("absolute left-[430px] top-[190px] font-mono text-[10px] tracking-widest transition-colors duration-300", activeNode === 'gateway' ? "text-accent" : "text-muted")}>[TOKEN_BUCKET]</span>

          <ArchitectureNode
            title="Core Service"
            tech="RBAC & Controllers"
            isActive={activeNode === 'core'}
            hasPortLeft
            portLeftActive={routeCoreActive && activeNode !== null}
            className="left-[650px] top-[130px] -translate-y-1/2"
            diagnostics={[
              { label: 'INVITE_TTL', value: '10_MIN' },
              { label: 'AUDIT_LOG', value: 'ASYNC' }
            ]}
          />

          <ArchitectureNode
            title="Data Layer"
            tech="Postgres & Redis"
            isActive={activeNode === 'db'}
            hasPortLeft
            portLeftActive={routeDbActive && activeNode !== null}
            className="left-[650px] top-[370px] -translate-y-1/2"
            diagnostics={[
              { label: 'CONN_POOL', value: '84/100' },
              { label: 'REDIS_CACHE', value: 'SESSION' }
            ]}
          />

        </div>
      </div>

      {/* ── Project Preview Section ────────────────────────────────────────── */}
      <div className="mt-8">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <SystemAnnotation label="SYSTEM_INTERFACE_MOCKUP" value="PROJECT_HUB_LIVE_CONSOLE" />
          
          {/* GitHub Repo Link Placeholder */}
          <a 
            href="https://github.com/Sumitdixit2/projects-hub" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-wider text-muted hover:text-accent border border-border/40 hover:border-accent/40 px-3 py-1.5 bg-surface/30 self-start sm:self-auto flex items-center gap-1.5 transition-colors duration-150"
          >
            <svg className="w-3.5 h-3.5 fill-current flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
            </svg>
            <span>[GITHUB_REPOSITORY]</span>
            <ArrowRight className="w-3 h-3 text-muted/60" />
          </a>
        </div>
        {/* Clickable Screenshot Redirect (Edit URL here) */}
        <a
          href="https://project-hub.timus.co.in"
          target="_blank"
          rel="noopener noreferrer"
          className="group block relative w-full aspect-[16/9] sm:aspect-[21/9] drafting-border bg-surface/20 overflow-hidden cursor-pointer hover:border-accent/60 transition-all duration-300 shadow-[0_0_15px_rgba(100,255,218,0.01)] hover:shadow-[0_0_25px_rgba(100,255,218,0.03)]"
        >
          {/* Corner Drafting Marks */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40 z-20" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent/40 z-20" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent/40 z-20" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent/40 z-20" />

          {/* Actual Mockup Image (Falls back to placeholder on load error) */}
          <img
            src="../../project-hub-screenshot.png"
            alt="Project Hub Dashboard Telemetry Preview"
            className="absolute inset-0 object-cover w-full h-full opacity-60 group-hover:opacity-85 transition-opacity duration-500 z-10"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />

          {/* Schematic Placeholder Diagnostics Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center font-mono z-0 bg-gradient-to-b from-background/40 to-background/70">
            {/* Grid background effect */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(100,255,218,0.03)_1.5px,transparent_1.5px)] [background-size:16px_16px] pointer-events-none" />

            <span className="text-accent/60 text-[10px] tracking-[0.2em] uppercase mb-2 animate-pulse font-bold">
              [SYSTEM_INTERFACE_PREVIEW_ACTIVE]
            </span>
            <p className="text-[11px] text-muted max-w-sm leading-relaxed mb-4">
              Click to launch live operational system console.
            </p>
            <div className="text-[9px] text-accent/40 border border-accent/20 px-3 py-1 bg-background/50">
              URL: https://project-hub.timus.co.in
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

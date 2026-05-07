'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SystemAnnotation } from '@/components/ui/system-annotation';
import { cn } from '@/lib/utils';

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
    transition: { pathLength: { duration: 1.5, ease: 'linear' }, opacity: { duration: 0.1 } } 
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
        <SystemAnnotation label="FIGURE_01" value="PROJECT_AETHER_ARCHITECTURE" className="mb-4" />
        <p className="font-sans text-muted max-w-2xl text-sm leading-relaxed">
          Aether is an agency management system designed for <TextTarget id="client">high-concurrency client data handling</TextTarget>. 
          The architecture focuses on <TextTarget id="gateway">aggressive rate limiting</TextTarget> and custom <TextTarget id="core">JWT token rotation</TextTarget> strategies to ensure secure, <TextTarget id="db">stateless horizontal scaling</TextTarget>.
        </p>
      </div>

      <div className="w-full overflow-x-auto scrollbar-thin pb-8">
        <div className="relative min-w-[900px] h-[500px] drafting-border bg-background/50">
          
          {/* The Mathematical SVG Canvas */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 900 500" preserveAspectRatio="xMidYMid meet">
            
            <defs>
              <pattern id="micro-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(100,150,255,0.03)" strokeWidth="1"/>
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
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes dash {
              from { stroke-dashoffset: 400; }
              to { stroke-dashoffset: 0; }
            }
          `}} />

          {/* Precision Placed Architecture Nodes */}
          {/* Coordinates match the SVG paths: Width 160px. Centers aligned to the lines. */}
          
          <ArchitectureNode 
            title="Client Layer" 
            tech="React / Next.js" 
            isActive={activeNode === 'client'} 
            hasPortRight 
            portRightActive={routeClientActive && activeNode !== null}
            className="left-[50px] top-[250px] -translate-y-1/2" 
            diagnostics={[
              { label: 'REGION', value: 'GLOBAL_EDGE' },
              { label: 'CACHE_HIT', value: '94.2%' }
            ]}
          />
          
          <ArchitectureNode 
            title="API Gateway" 
            tech="Nginx / WAF" 
            isActive={activeNode === 'gateway'} 
            hasPortLeft hasPortRight 
            portLeftActive={routeClientActive && activeNode !== null}
            portRightActive={(routeCoreActive || routeDbActive) && activeNode !== null}
            className="left-[350px] top-[250px] -translate-y-1/2 border-accent/30" 
            diagnostics={[
              { label: 'THROUGHPUT', value: '4.2k_R/S' },
              { label: 'WAF_BLOCK', value: '0.02%' }
            ]}
          />
          <span className={cn("absolute left-[430px] top-[190px] font-mono text-xs tracking-widest transition-colors duration-300", activeNode === 'gateway' ? "text-accent" : "text-muted")}>[RATE_LIMIT]</span>

          <ArchitectureNode 
            title="Core Service" 
            tech="Express + JWT" 
            isActive={activeNode === 'core'} 
            hasPortLeft 
            portLeftActive={routeCoreActive && activeNode !== null}
            className="left-[650px] top-[130px] -translate-y-1/2" 
            diagnostics={[
              { label: 'PODS', value: '4_ACTIVE' },
              { label: 'LATENCY', value: '42ms' },
              { label: 'CPU_UTIL', value: '34%' }
            ]}
          />

          <ArchitectureNode 
            title="Data Layer" 
            tech="PostgreSQL" 
            isActive={activeNode === 'db'} 
            hasPortLeft 
            portLeftActive={routeDbActive && activeNode !== null}
            className="left-[650px] top-[370px] -translate-y-1/2" 
            diagnostics={[
              { label: 'CONN_POOL', value: '84/100' },
              { label: 'REP_LAG', value: '14ms' },
              { label: 'IOPS', value: '1.2k' }
            ]}
          />

        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { SystemAnnotation } from '@/components/ui/system-annotation';
import { cn } from '@/lib/utils';

// Human-oriented cognitive node, borrowing structural language from AetherSchematic
function CognitiveNode({ 
  title, className = '', portRight, portLeft 
}: { 
  title: string, className?: string, portRight?: boolean, portLeft?: boolean 
}) {
  return (
    <div className={cn(
      "drafting-border p-3 w-[160px] absolute z-10 bg-surface/90 transition-colors duration-200 group hover:border-accent/50 hover:bg-surface",
      className
    )}>
      {portLeft && <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 drafting-border bg-background group-hover:border-accent/50 transition-colors" />}
      {portRight && <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-2 h-2 drafting-border bg-background group-hover:border-accent/50 transition-colors" />}
      
      <div className="font-mono text-[11px] uppercase border-b border-border pb-2 mb-2 text-muted group-hover:text-accent transition-colors">
        Cognitive_Node
      </div>
      <h3 className="font-sans font-medium text-foreground text-xs tracking-wide">{title}</h3>
    </div>
  );
}

function RuntimeIdentityMatrix() {
  const metrics = [
    { label: 'DEPLOYMENT_REGION', value: 'UTC+5:30 (INDIA)' },
    { label: 'CURRENT_FOCUS', value: 'SYSTEMS_ARCHITECTURE' },
    { label: 'ACTIVE_RESEARCH', value: 'DISTRIBUTED_CONSENSUS' },
    { label: 'BUILD_MODE', value: 'EXPERIMENTAL / DEEP_WORK' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <SystemAnnotation label="SYS_STATE" value="RUNTIME_IDENTITY_METRICS" className="mb-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metrics.map(m => (
          <div key={m.label} className="drafting-border p-4 bg-surface/30">
            <div className="font-mono text-[11px] text-muted mb-1">[{m.label}]</div>
            <div className="font-mono text-xs text-foreground">{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CognitiveTopology() {
  const drawLine = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } }
  };

  return (
    <div className="w-full overflow-x-auto scrollbar-thin mt-12 mb-12">
      <div className="relative min-w-[700px] h-[300px] drafting-border bg-background/50">
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 700 300" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="cognitive-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(100,150,255,0.02)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cognitive-grid)" />

          <g stroke="rgba(100,150,255,0.25)" strokeWidth="1" fill="none">
            {/* Trunk */}
            <motion.path d="M 210 150 L 300 150" variants={drawLine} initial="hidden" whileInView="visible" viewport={{ once: true }} />
            {/* Branch Up */}
            <motion.path d="M 300 150 L 350 150 L 350 80 L 450 80" variants={drawLine} initial="hidden" whileInView="visible" viewport={{ once: true }} />
            {/* Branch Down */}
            <motion.path d="M 300 150 L 350 150 L 350 220 L 450 220" variants={drawLine} initial="hidden" whileInView="visible" viewport={{ once: true }} />
          </g>

          <rect x="347" y="147" width="6" height="6" fill="var(--color-background)" stroke="rgba(100,150,255,0.4)" strokeWidth="1" />
        </svg>

        <CognitiveNode 
          title="BACKEND FUNDAMENTALS" 
          portRight 
          className="left-[50px] top-[150px] -translate-y-1/2" 
        />
        <CognitiveNode 
          title="FAULT TOLERANCE" 
          portLeft 
          className="left-[450px] top-[80px] -translate-y-1/2" 
        />
        <CognitiveNode 
          title="DISTRIBUTED SYSTEMS" 
          portLeft 
          className="left-[450px] top-[220px] -translate-y-1/2" 
        />

      </div>
    </div>
  );
}

function SystemDirectives() {
  const directives = [
    "Prefer deterministic systems over opaque automation.",
    "Readable infrastructure scales better than clever infrastructure.",
    "Operational simplicity is a core feature, not an afterthought."
  ];

  return (
    <div className="drafting-border p-6 bg-surface/30">
      <SystemAnnotation label="SYS_RULES" value="ENGINEERING_DIRECTIVES" className="mb-6" />
      <div className="flex flex-col gap-4">
        {directives.map((text, i) => (
          <div key={i} className="flex gap-4 items-start">
            <span className="font-mono text-xs text-accent mt-1 shrink-0">// DIR_0{i + 1}</span>
            <p className="font-sans text-sm text-muted leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OperatorProfile() {
  return (
    <section className="relative">
      <div className="mb-12">
        <SystemAnnotation label="NODE_TYPE" value="OPERATOR_DOSSIER" className="mb-4" />
        <h2 className="text-2xl font-medium tracking-tight text-foreground uppercase mb-4">
          Human System Node
        </h2>
        <p className="font-sans text-muted max-w-2xl text-sm leading-relaxed">
          The human architecture operating behind the infrastructure. Focused on building robust, long-lasting systems and maintaining operational clarity across the entire stack.
        </p>
      </div>

      <RuntimeIdentityMatrix />
      
      <CognitiveTopology />

      <SystemDirectives />

    </section>
  );
}

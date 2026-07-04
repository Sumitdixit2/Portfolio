'use client';

import { SystemAnnotation } from '@/components/ui/system-annotation';



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
            <span className="font-mono text-xs text-accent mt-1 shrink-0">{'//'} DIR_0{i + 1}</span>
            <p className="font-sans text-sm text-muted leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import { GeospatialNode } from './geospatial-node';

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

      {/* Two-column: Globe left, Directives right */}
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-start mb-12">
        {/* Geospatial Observatory — constrained anchor, not dominant */}
        <div className="w-full">
          <GeospatialNode />
        </div>

        {/* System Directives — vertical companion */}
        <div className="flex flex-col justify-center h-full">
          <SystemDirectives />
        </div>
      </div>



    </section>
  );
}

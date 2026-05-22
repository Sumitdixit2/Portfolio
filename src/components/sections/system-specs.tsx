'use client';

import { SystemAnnotation } from '@/components/ui/system-annotation';
import { ArrowUpRight } from 'lucide-react';

export function SystemSpecs() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-16 relative">
      
      {/* Tech Stack Table */}
      <div>
        <SystemAnnotation label="DEP_MANIFEST" value="SYSTEM_DEPENDENCIES" className="mb-6" />
        <div className="drafting-border bg-surface/30 p-6 flex flex-col gap-2 font-mono text-xs">
          <div className="flex justify-between text-muted pb-2 border-b border-border/50 mb-2">
            <span>MODULE</span>
            <span>TYPE</span>
          </div>
          <div className="flex justify-between text-foreground hover:bg-white/5 px-1 py-0.5 transition-colors">
            <span>Node.js / Express</span>
            <span className="text-muted">RUNTIME.API</span>
          </div>
          <div className="flex justify-between text-foreground hover:bg-white/5 px-1 py-0.5 transition-colors">
            <span>PostgreSQL</span>
            <span className="text-muted">DATABASE.REL</span>
          </div>
          <div className="flex justify-between text-foreground hover:bg-white/5 px-1 py-0.5 transition-colors">
            <span>Redis</span>
            <span className="text-muted">CACHE.MEM</span>
          </div>
          <div className="flex justify-between text-foreground hover:bg-white/5 px-1 py-0.5 transition-colors">
            <span>Docker</span>
            <span className="text-muted">CONTAINER</span>
          </div>
          <div className="flex justify-between text-foreground hover:bg-white/5 px-1 py-0.5 transition-colors">
            <span>Nginx</span>
            <span className="text-muted">PROXY.WEB</span>
          </div>
          <div className="flex justify-between text-foreground hover:bg-white/5 px-1 py-0.5 transition-colors">
            <span>GitHub Actions</span>
            <span className="text-muted">CI.CD</span>
          </div>
          <div className="flex justify-between text-foreground hover:bg-white/5 px-1 py-0.5 transition-colors">
            <span>React / Next.js</span>
            <span className="text-muted">CLIENT.UI</span>
          </div>
          <div className="flex justify-between text-foreground hover:bg-white/5 px-1 py-0.5 transition-colors">
            <span>TypeScript</span>
            <span className="text-muted">LANG.STRICT</span>
          </div>
        </div>
      </div>

      {/* Education & Contact */}
      <div className="flex flex-col justify-between">
        <div className="mb-8">
          <SystemAnnotation label="EDU_LOG" value="ACADEMIC_BACKGROUND" className="mb-6" />
          <div className="drafting-border-l pl-4 border-accent/50 flex flex-col gap-4">
            <div>
              <h4 className="font-sans text-sm text-foreground">BCA (Sophomore)</h4>
              <p className="font-mono text-xs text-muted">VIPS - GGSIPU</p>
            </div>
            <div>
              <h4 className="font-sans text-sm text-foreground">Smart India Hackathon</h4>
              <p className="font-mono text-xs text-muted">College Level Qualifier</p>
            </div>
          </div>
        </div>

        <div>
          <SystemAnnotation label="PROTOCOL" value="INITIATE_HANDSHAKE" className="mb-4" />
          <div className="flex flex-col gap-3">
            <a 
              href="mailto:sumitdixit.dev@gmail.com" 
              className="drafting-border p-3 flex justify-between items-center text-sm font-sans text-foreground hover:bg-white/5 transition-colors group"
            >
              <span>Transmission via Email</span>
              <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
            </a>
            <a 
              href="https://github.com/Sumitdixit2" 
              target="_blank" 
              rel="noopener noreferrer"
              className="drafting-border p-3 flex justify-between items-center text-sm font-sans text-foreground hover:bg-white/5 transition-colors group"
            >
              <span>Repository Access (GitHub)</span>
              <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}

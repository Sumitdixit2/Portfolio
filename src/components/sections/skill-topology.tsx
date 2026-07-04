'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SystemAnnotation } from '@/components/ui/system-annotation';
import { REGISTRY_UNITS, SECTOR_LABELS } from '@/data/skills-topology';
import { cn } from '@/lib/utils';
import { Terminal, Cpu, Database, Network, Activity, ArrowRight, Settings } from 'lucide-react';

export function SkillTopology() {
  const [activeId, setActiveId] = useState<string | null>(REGISTRY_UNITS[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  // Calculate aggregate metrics
  const totalUnits = REGISTRY_UNITS.length;
  const averageMetric = Math.round(
    REGISTRY_UNITS.reduce((sum, u) => sum + u.metric, 0) / totalUnits
  );

  // Determine which unit is currently being displayed in the telemetry console
  const displayedId = hoveredId || activeId;
  const currentUnit = REGISTRY_UNITS.find((u) => u.id === displayedId) || REGISTRY_UNITS[0];

  // Helper for generating custom progress bars
  const renderProgressBar = (value: number) => {
    const totalBars = 20;
    const filledBars = Math.round((value / 100) * totalBars);
    const emptyBars = totalBars - filledBars;
    return `[${'█'.repeat(filledBars)}${'░'.repeat(emptyBars)}] ${value}%`;
  };

  // Helper for mapping sector icons
  const getSectorIcon = (sector: string, className = "w-3.5 h-3.5") => {
    switch (sector) {
      case 'LANG_CORE':
        return <Terminal className={cn("text-emerald-400", className)} />;
      case 'RUNTIME_SYS':
        return <Cpu className={cn("text-blue-400", className)} />;
      case 'DATA_INFRA':
        return <Database className={cn("text-amber-400", className)} />;
      case 'DEPLOY_OPS':
        return <Network className={cn("text-purple-400", className)} />;
      default:
        return <Settings className={cn("text-muted", className)} />;
    }
  };

  return (
    <motion.section
      className="relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      {/* ── Section Header ─────────────────────────────────────────────────── */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <SystemAnnotation
            label="FIGURE_01"
            value="SYSTEM_REGISTRY_LEDGER"
            className="mb-3"
          />
          <p className="font-sans text-muted text-sm leading-relaxed max-w-lg">
            Operational registry of core systems, technologies, and backend dependencies. 
            Select or hover over any module for live telemetry diagnostics.
          </p>
        </div>
        
        {/* System Stats Bar */}
        <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest text-muted/60 self-start sm:self-auto">
          <div>
            <span className="text-accent/80">TOTAL_UNITS:</span>{' '}
            <span className="text-foreground font-semibold">{totalUnits}</span>
          </div>
          <div>
            <span className="text-accent/80">AVG_UTIL:</span>{' '}
            <span className="text-foreground font-semibold">{averageMetric}%</span>
          </div>
          <div>
            <span className="text-accent/80">SYS_STATUS:</span>{' '}
            <span className="text-emerald-400 font-semibold flex items-center gap-1 inline-flex">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              NOMINAL
            </span>
          </div>
        </div>
      </div>

      {/* ── Grid Container ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
        
        {/* Left Column: Ledger Table */}
        <div className="drafting-border bg-surface/30 overflow-hidden w-full">
          {/* Table Header Row */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-border/50 bg-background/50 font-mono text-[10px] uppercase tracking-wider text-muted/70 font-semibold">
            <div className="col-span-7">SYSTEM UNIT</div>
            <div className="col-span-5 text-right">SECTOR</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-border/20">
            {REGISTRY_UNITS.map((unit) => {
              const isHovered = hoveredId === unit.id;
              const isActive = activeId === unit.id;
              const isConnected = 
                (hoveredId && REGISTRY_UNITS.find(u => u.id === hoveredId)?.connections.includes(unit.id)) ||
                (!hoveredId && activeId && REGISTRY_UNITS.find(u => u.id === activeId)?.connections.includes(unit.id));

              return (
                <div key={unit.id} className="group">
                  <div
                    className={cn(
                      "grid grid-cols-12 gap-4 px-4 py-3.5 items-center font-mono text-xs cursor-crosshair transition-all duration-150",
                      isActive ? "bg-accent/[0.03]" : "",
                      isHovered ? "bg-accent/[0.06]" : "",
                      isConnected && !isHovered && !isActive ? "bg-emerald-500/[0.01]" : ""
                    )}
                    onMouseEnter={() => setHoveredId(unit.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setActiveId(isActive ? null : unit.id)}
                  >
                    {/* SYSTEM UNIT */}
                    <div className="col-span-7 flex items-center gap-2 font-sans font-medium text-foreground text-sm tracking-wide truncate">
                      <span className={cn(
                        "w-1.5 h-1.5 transition-colors duration-150 flex-shrink-0",
                        isActive || isHovered ? "bg-accent shadow-[0_0_8px_rgba(100,255,218,0.8)]" : "bg-border/60",
                        isConnected && !isHovered && !isActive ? "bg-emerald-400" : ""
                      )} />
                      <span className="truncate">{unit.name}</span>
                    </div>

                    {/* SECTOR */}
                    <div className="col-span-5 flex items-center justify-end gap-2 text-foreground/80 truncate text-right">
                      {getSectorIcon(unit.sector, "w-3 h-3 flex-shrink-0")}
                      <span className="text-[11px] truncate">{SECTOR_LABELS[unit.sector]}</span>
                    </div>
                  </div>

                  {/* Inline Telemetry Console for Mobile Layout (< 1024px) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="block lg:hidden overflow-hidden bg-background/80 border-t border-border/30 px-6 py-4"
                      >
                        <div className="flex flex-col gap-3 font-mono text-[11px]">
                          <div className="flex justify-between border-b border-border/30 pb-2">
                            <span className="text-muted">[SPECIFICATION]</span>
                            <span className="text-foreground">{unit.spec}</span>
                          </div>
                          <div className="flex justify-between border-b border-border/30 pb-2">
                            <span className="text-muted">[UTILITY_INDEX]</span>
                            <span className="text-accent">{renderProgressBar(unit.metric)}</span>
                          </div>
                          <div className="border-b border-border/30 pb-3">
                            <span className="text-muted block mb-1">[OPERATIONAL_LOG]</span>
                            <p className="font-sans text-xs text-foreground/80 leading-relaxed">
                              {unit.description}
                            </p>
                          </div>
                          
                          {/* Connections */}
                          {unit.connections.length > 0 && (
                            <div>
                              <span className="text-muted block mb-1.5">[INTEGRATES_WITH]</span>
                              <div className="flex flex-wrap gap-1.5">
                                {unit.connections.map((connId) => {
                                  const connUnit = REGISTRY_UNITS.find(u => u.id === connId);
                                  if (!connUnit) return null;
                                  return (
                                    <button
                                      key={connId}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveId(connId);
                                      }}
                                      className="px-2 py-0.5 border border-border bg-surface/50 text-[10px] text-foreground/70 hover:text-accent hover:border-accent transition-colors flex items-center gap-1"
                                    >
                                      <span>{connUnit.name}</span>
                                      <ArrowRight className="w-2.5 h-2.5" />
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Telemetry Console (Sticky on Desktop >= 1024px) */}
        <aside className="hidden lg:block lg:sticky lg:top-32 drafting-border bg-surface/30 p-5 self-start w-full">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent/40" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent/40" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent/40" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent/40" />

          {/* Terminal Console Header */}
          <div className="flex items-center justify-between border-b border-border/50 pb-3 mb-4">
            <span className="font-mono text-[10px] tracking-widest text-accent uppercase flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 animate-pulse text-accent" />
              [SYS_TELEMETRY]
            </span>
            <span className="font-mono text-[9px] text-muted tracking-wider uppercase">
              ID: {currentUnit.sysTag}
            </span>
          </div>

          {/* Diagnostic Stats */}
          <div className="flex flex-col gap-4 font-mono text-[11px]">
            {/* Component Name */}
            <div>
              <span className="text-muted block text-[10px] uppercase tracking-wider mb-0.5">[UNIT_NAME]</span>
              <span className="text-sm font-sans font-semibold text-foreground">{currentUnit.name}</span>
            </div>

            {/* Spec / Info */}
            <div className="grid grid-cols-2 gap-4 border-t border-border/30 pt-3">
              <div>
                <span className="text-muted block text-[10px] uppercase tracking-wider mb-0.5">[CORE_SPEC]</span>
                <span className="text-foreground font-medium">{currentUnit.spec}</span>
              </div>
              <div>
                <span className="text-muted block text-[10px] uppercase tracking-wider mb-0.5">[SECTOR]</span>
                <div className="flex items-center gap-1.5">
                  {getSectorIcon(currentUnit.sector, "w-3 h-3")}
                  <span className="text-foreground font-medium text-[10px]">{SECTOR_LABELS[currentUnit.sector]}</span>
                </div>
              </div>
            </div>

            {/* Metric/Utility Visual Progress Bar */}
            <div className="border-t border-border/30 pt-3">
              <span className="text-muted block text-[10px] uppercase tracking-wider mb-1">[UTILITY_INDEX]</span>
              <span className="text-accent text-[11px] block select-none">
                {renderProgressBar(currentUnit.metric)}
              </span>
            </div>

            {/* Description Text */}
            <div className="border-t border-border/30 pt-3">
              <span className="text-muted block text-[10px] uppercase tracking-wider mb-1">[OPERATIONAL_LOG]</span>
              <p className="font-sans text-xs text-foreground/80 leading-relaxed min-h-[72px]">
                {currentUnit.description}
              </p>
            </div>

            {/* Connected Systems */}
            <div className="border-t border-border/30 pt-3">
              <span className="text-muted block text-[10px] uppercase tracking-wider mb-2">[INTEGRATES_WITH]</span>
              {currentUnit.connections.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {currentUnit.connections.map((connId) => {
                    const connUnit = REGISTRY_UNITS.find(u => u.id === connId);
                    if (!connUnit) return null;
                    return (
                      <button
                        key={connId}
                        onClick={() => {
                          setActiveId(connId);
                        }}
                        className="px-2 py-1 border border-border bg-surface hover:text-accent hover:border-accent transition-colors duration-150 flex items-center gap-1.5 text-[10px]"
                      >
                        <span>{connUnit.name}</span>
                        <ArrowRight className="w-2.5 h-2.5 text-muted group-hover:text-accent" />
                      </button>
                    );
                  })}
                </div>
              ) : (
                <span className="text-muted italic text-[10px]">[NO_DIRECT_LINK_BOUND]</span>
              )}
            </div>
          </div>
        </aside>
      </div>
    </motion.section>
  );
}

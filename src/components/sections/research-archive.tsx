'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SystemAnnotation } from '@/components/ui/system-annotation';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

type LogStatus = 'RESOLVED' | 'ACTIVE_RESEARCH' | 'DEPRECATED' | 'OBSERVATION';

interface LogRecord {
  id: string;
  timestamp: string;
  systemTag: string;
  title: string;
  status: LogStatus;
  abstract: string;
}

const RESEARCH_LOGS: LogRecord[] = [
  {
    id: "REC_084",
    timestamp: "2026.04.12",
    systemTag: "DISTRIBUTED_CONSENSUS",
    title: "Evaluating Consensus Protocols in High-Latency Geographies",
    status: "ACTIVE_RESEARCH",
    abstract: "Observations on Raft vs Paxos performance degradation when nodes are separated by >150ms latency. Preliminary findings suggest aggressive leader-election tuning is required to prevent split-brain scenarios during transient network partitions in the AP-South region."
  },
  {
    id: "REC_072",
    timestamp: "2026.02.28",
    systemTag: "DATABASE_ARCH",
    title: "Zero-Downtime Migration Strategies for Monolithic PostgreSQL",
    status: "RESOLVED",
    abstract: "Successfully documented a dual-write pipeline using logical replication and application-level routing. The pattern allows seamless cutover for multi-terabyte tables without acquiring exclusive locks that would stall read-heavy traffic."
  },
  {
    id: "REC_061",
    timestamp: "2025.11.14",
    systemTag: "CACHE_TOPOLOGY",
    title: "Cache Invalidation Trade-offs in Distributed Graph Systems",
    status: "OBSERVATION",
    abstract: "Analyzing the overhead of strict cache invalidation vs TTL-based eventual consistency in social-graph queries. Strict invalidation via Redis PubSub introduces acceptable latency at P95, but cascades severely during thundering herd events."
  },
  {
    id: "REC_055",
    timestamp: "2025.09.02",
    systemTag: "TELEMETRY",
    title: "Observability Overhead in Microservice Service Meshes",
    status: "DEPRECATED",
    abstract: "Initial implementation of full-payload tracing injected unacceptably high CPU overhead at the sidecar proxy level. Sampling rates must be dynamically adjusted based on current cluster throughput rather than static percentages. Moving to eBPF-based instrumentation."
  }
];

function StatusIndicator({ status }: { status: LogStatus }) {
  switch(status) {
    case 'ACTIVE_RESEARCH':
      return <span className="text-amber-500/80">ACTIVE_RESEARCH</span>;
    case 'RESOLVED':
      return <span className="text-accent/80">RESOLVED</span>;
    case 'DEPRECATED':
      return <span className="text-red-400/80">DEPRECATED</span>;
    case 'OBSERVATION':
      return <span className="text-blue-400/80">OBSERVATION</span>;
    default:
      return <span className="text-muted">{status}</span>;
  }
}

function ArchiveRow({ log, isExpanded, onToggle }: { log: LogRecord, isExpanded: boolean, onToggle: () => void }) {
  return (
    <div className="group border-b border-border/50 first:border-t drafting-border transition-colors">
      
      {/* Row Header (Clickable) */}
      <button 
        onClick={onToggle}
        className={cn(
          "w-full flex flex-col md:flex-row md:items-center text-left py-4 px-4 sm:px-6 transition-colors duration-200",
          isExpanded ? "bg-surface/30" : "hover:bg-surface/20",
          "focus:outline-none"
        )}
      >
        <div className="flex items-center gap-4 md:w-1/4 mb-2 md:mb-0 shrink-0">
          <span className="font-mono text-[11px] text-muted group-hover:text-accent transition-colors">
            [{log.id}]
          </span>
          <span className="font-mono text-[11px] text-muted">
            {log.timestamp}
          </span>
        </div>
        
        <div className="flex-1 md:pr-8 w-full">
          <div className="flex items-center justify-between md:block mb-1">
            <span className="font-mono text-[11px] text-muted uppercase tracking-widest">
              {log.systemTag}
            </span>
            {/* Inline status tag for mobile */}
            <span className="inline-block md:hidden font-mono text-[9px] px-1.5 py-0.5 drafting-border bg-surface/30">
              <StatusIndicator status={log.status} />
            </span>
          </div>
          <h3 className="font-sans text-sm text-foreground/90 group-hover:text-foreground transition-colors flex items-center justify-between gap-4">
            <span>{log.title}</span>
            {/* Inline interactive chevron indicator for mobile */}
            <ChevronDown 
              className={cn(
                "inline-block md:hidden w-4 h-4 text-muted shrink-0 transition-transform duration-300", 
                isExpanded && "rotate-180 text-accent"
              )} 
            />
          </h3>
        </div>

        <div className="hidden md:flex items-center justify-between w-1/5 shrink-0 pl-4">
          <div className="font-mono text-[11px]">
            [<StatusIndicator status={log.status} />]
          </div>
          <ChevronDown 
            className={cn(
              "w-4 h-4 text-muted transition-transform duration-300", 
              isExpanded && "rotate-180 text-accent"
            )} 
          />
        </div>
      </button>

      {/* Accordion Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} // Calm, architectural ease
            className="overflow-hidden bg-surface/10"
          >
            <div className="p-4 sm:p-6 md:pl-[calc(25%+1.5rem)] pt-0 md:pt-4 pb-6">
              <div className="drafting-border p-4 bg-background/50 border-l-2 border-l-accent/50">
                <div className="font-mono text-[11px] text-accent/60 mb-2 uppercase">
                  {'//'} Field_Note_Abstract
                </div>
                <p className="font-mono text-xs text-muted leading-relaxed">
                  {log.abstract}
                </p>
                
                <div className="mt-4 pt-4 border-t border-border/50 flex justify-end">
                  <a href="#" className="font-mono text-xs text-accent hover:text-accent/80 transition-colors">
                    READ_FULL_LOG -&gt;
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ResearchArchive() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="relative">
      <div className="mb-12">
        <SystemAnnotation label="NODE_TYPE" value="RESEARCH_REGISTRY" className="mb-4" />
        <h2 className="text-2xl font-medium tracking-tight text-foreground uppercase mb-4">
          Field Notes & Logs
        </h2>
        <p className="font-sans text-muted max-w-2xl text-sm leading-relaxed">
          Classified architectural observations, deployment notes, and systems engineering research. 
          Documenting infrastructure behavior in production environments.
        </p>
      </div>

      <div className="w-full">
        {/* Table Header */}
        <div className="hidden md:flex items-center px-6 pb-3 font-mono text-[11px] text-muted uppercase tracking-widest border-b border-border/50">
          <div className="w-1/4">Identifier / Time</div>
          <div className="flex-1">System / Record Title</div>
          <div className="w-1/5 pl-4">State</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col">
          {RESEARCH_LOGS.map((log) => (
            <ArchiveRow 
              key={log.id} 
              log={log} 
              isExpanded={expandedId === log.id}
              onToggle={() => setExpandedId(expandedId === log.id ? null : log.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

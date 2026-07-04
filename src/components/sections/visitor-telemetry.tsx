'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { SystemAnnotation } from '@/components/ui/system-annotation';

function Counter({ value }: { value: number }) {
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (value === 0) return;
    const controls = animate(motionValue, value, {
      duration: 2.0,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [value, motionValue]);

  const displayValue = useTransform(motionValue, (latest) => {
    return Math.round(latest).toLocaleString();
  });

  return (
    <motion.span className="font-mono text-3xl md:text-4xl font-bold text-accent tracking-wider">
      {displayValue}
    </motion.span>
  );
}

interface CounterAPIResponse {
  id: number;
  name: string;
  count: number;
  created_at: string;
  updated_at: string;
  namespace_id: number;
}

export function VisitorTelemetry() {
  const [count, setCount] = useState<number | null>(null);
  const [status, setStatus] = useState<'CONNECTING' | 'ACTIVE' | 'OFFLINE'>('CONNECTING');

  useEffect(() => {
    // Unique namespace for Sumit Dixit's portfolio to keep count separate
    fetch('https://api.counterapi.dev/v1/sumitdixit_portfolio/visits/up')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json() as Promise<CounterAPIResponse>;
      })
      .then((data) => {
        if (data && typeof data.count === 'number') {
          const realCount = data.count;
          setCount(realCount);
          setStatus('ACTIVE');
          localStorage.setItem('portfolio_real_visitor_count', realCount.toString());
        } else {
          throw new Error('Invalid API response format');
        }
      })
      .catch((err) => {
        console.error('Counter API error:', err);
        // Fallback: use previously cached real count, or 0
        const cached = localStorage.getItem('portfolio_real_visitor_count');
        if (cached) {
          const parsed = parseInt(cached, 10);
          setCount(isNaN(parsed) ? 0 : parsed);
        } else {
          setCount(0);
        }
        setStatus('OFFLINE');
      });
  }, []);

  return (
    <section className="drafting-border p-6 md:p-8 bg-surface/30 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <SystemAnnotation label="SYS_TELEMETRY" value="LIVE_VISITOR_METRIC" className="mb-3" />
          <h3 className="text-sm font-mono text-muted uppercase tracking-wider mb-1">
            Global Connection Log
          </h3>
          <p className="text-[11px] text-muted max-w-md leading-relaxed">
            Real-time tracking of unique handshake operations initiated with this node registry.
          </p>
        </div>

        <div className="flex items-center gap-6 border-l border-border/50 pl-6 md:pl-8 self-start md:self-auto">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-muted tracking-widest uppercase mb-1">
              TOTAL_HANDSHAKES
            </span>
            <div className="flex items-baseline gap-2">
              {count !== null ? (
                <Counter value={count} />
              ) : (
                <span className="font-mono text-3xl font-bold text-accent">---</span>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <span className="font-mono text-[9px] text-muted tracking-widest uppercase mb-1">
              TELEMETRY_LINK
            </span>
            <div className="flex items-center gap-2 bg-background/50 border border-border/40 px-3 py-1.5 rounded-sm">
              <span className={`w-2 h-2 rounded-full ${
                status === 'ACTIVE' ? 'bg-accent animate-pulse' :
                status === 'CONNECTING' ? 'bg-yellow-500 animate-pulse' :
                'bg-red-500'
              }`} />
              <span className="font-mono text-[10px] tracking-widest text-foreground font-semibold">
                {status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

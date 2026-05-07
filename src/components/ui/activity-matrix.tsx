'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ContributionDay {
  contributionCount: number;
  contributionLevel: 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE';
  date: string;
}

interface ContributionData {
  totalContributions: number;
  contributions: ContributionDay[][];
}

export function ActivityMatrix() {
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTelemetry() {
      try {
        const res = await fetch('https://github-contributions-api.deno.dev/Sumitdixit2.json');
        if (!res.ok) throw new Error('Telemetry stream failed');
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Matrix Sync Error:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchTelemetry();
  }, []);

  // Map GitHub quartiles to Blueprint architectural LED colors
  const getIntensityClass = (level: string) => {
    switch (level) {
      case 'NONE':
        return 'bg-surface/50 border-background/50'; // Idle state
      case 'FIRST_QUARTILE':
        return 'bg-accent/20 border-accent/10'; // Low activity
      case 'SECOND_QUARTILE':
        return 'bg-accent/50 border-accent/20'; // Med activity
      case 'THIRD_QUARTILE':
        return 'bg-accent/80 border-accent/30'; // High activity
      case 'FOURTH_QUARTILE':
        return 'bg-accent border-accent/50 shadow-[0_0_8px_rgba(100,255,218,0.6)] z-10 relative'; // Peak operational surge
      default:
        return 'bg-surface/50 border-background';
    }
  };

  if (loading) {
    return (
      <div className="w-full h-40 flex items-center justify-center font-mono text-xs text-muted animate-pulse">
        [INITIALIZING_TELEMETRY_STREAM]...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-40 flex items-center justify-center font-mono text-xs text-red-400/80">
        [TELEMETRY_SYNC_FAILED]
      </div>
    );
  }

  // Calculate active days for operational metadata
  const activeDays = data.contributions.flat().filter(d => d.contributionCount > 0).length;

  return (
    <div className="w-full relative group">
      
      {/* Header Metadata */}
      <div className="flex justify-between items-end mb-4 border-b border-border/50 pb-2">
        <div>
          <div className="font-mono text-[11px] text-accent/80 uppercase tracking-widest mb-1">
            [COMMIT_TELEMETRY]
          </div>
          <div className="font-sans text-sm text-foreground/90 uppercase tracking-wide">
            Operational Consistency
          </div>
        </div>
        
        <div className="flex gap-6 text-right">
          <div className="flex flex-col">
            <span className="font-mono text-[8px] text-muted uppercase">Yearly_Commits</span>
            <span className="font-mono text-xs text-foreground">{data.totalContributions}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[8px] text-muted uppercase">Active_Days</span>
            <span className="font-mono text-xs text-accent">{activeDays}</span>
          </div>
        </div>
      </div>

      {/* 
        The LED Matrix Array
        Forces horizontal scrolling on mobile to preserve architectural density
        without crushing the grid into microscopic, unreadable pixels.
      */}
      <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-surface scrollbar-track-transparent">
        <div className="min-w-[800px] flex gap-[3px]">
          {data.contributions.map((week, weekIdx) => (
            <motion.div 
              key={weekIdx} 
              className="flex flex-col gap-[3px]"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: weekIdx * 0.01, duration: 0.3 }}
            >
              {week.map((day, dayIdx) => (
                <div
                  key={`${weekIdx}-${dayIdx}`}
                  title={`${day.contributionCount} operations on ${day.date}`}
                  className={cn(
                    "w-3 h-3 rounded-[1px] border-[0.5px] transition-all duration-300",
                    getIntensityClass(day.contributionLevel),
                    "hover:border-white hover:scale-110 hover:z-20 cursor-crosshair"
                  )}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Footer Legend */}
      <div className="flex justify-end items-center gap-2 mt-2 font-mono text-[8px] text-muted uppercase tracking-widest">
        <span>Idle</span>
        <div className="flex gap-[3px]">
          <div className="w-2.5 h-2.5 bg-surface/50 border border-background/50 rounded-[1px]" />
          <div className="w-2.5 h-2.5 bg-accent/20 border border-accent/10 rounded-[1px]" />
          <div className="w-2.5 h-2.5 bg-accent/50 border border-accent/20 rounded-[1px]" />
          <div className="w-2.5 h-2.5 bg-accent/80 border border-accent/30 rounded-[1px]" />
          <div className="w-2.5 h-2.5 bg-accent border border-accent/50 rounded-[1px]" />
        </div>
        <span>Peak</span>
      </div>

    </div>
  );
}

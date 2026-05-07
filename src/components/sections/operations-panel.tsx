import { SystemAnnotation } from '@/components/ui/system-annotation';
import { cn } from '@/lib/utils';
import { ActivityMatrix } from '@/components/ui/activity-matrix';

function PipelineNode({ label, status }: { label: string, status: 'success' | 'running' | 'pending' }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn(
        "w-3 h-3 drafting-border rotate-45 transition-colors",
        status === 'success' ? "bg-accent border-accent shadow-[0_0_8px_rgba(100,255,218,0.2)]" : 
        status === 'running' ? "border-accent bg-transparent animate-pulse" : 
        "border-border bg-transparent"
      )} />
      <span className={cn(
        "font-mono text-[11px] uppercase tracking-wider",
        status === 'pending' ? "text-muted" : "text-foreground"
      )}>{label}</span>
    </div>
  );
}

function PipelineStatus() {
  return (
    <div className="drafting-border p-6 bg-surface/30">
      <SystemAnnotation label="SYS_CD" value="DEPLOYMENT_PIPELINE" className="mb-6" />
      
      <div className="flex items-center justify-between relative px-2">
        {/* Connecting Line */}
        <div className="absolute left-4 right-4 top-1.5 h-[1px] bg-border -z-10" />
        {/* Active Line Progress */}
        <div className="absolute left-4 w-1/2 top-1.5 h-[1px] bg-accent/40 -z-10" />
        
        <PipelineNode label="LINT" status="success" />
        <PipelineNode label="TEST" status="success" />
        <PipelineNode label="BUILD" status="running" />
        <PipelineNode label="DEPLOY" status="pending" />
      </div>
    </div>
  );
}

function HealthMatrix() {
  const services = [
    { name: 'AUTH_API', uptime: '99.99%', status: 'nominal' },
    { name: 'DB_PRIMARY', uptime: '100.0%', status: 'nominal' },
    { name: 'REDIS_CACHE', uptime: '99.95%', status: 'nominal' },
    { name: 'WORKER_01', uptime: '98.20%', status: 'degraded' },
  ];

  return (
    <div className="drafting-border p-6 bg-surface/30">
      <SystemAnnotation label="SYS_OPS" value="SERVICE_HEALTH" className="mb-6" />
      
      <div className="grid grid-cols-2 gap-4">
        {services.map((svc) => (
          <div key={svc.name} className="flex justify-between items-center border-b border-border/50 pb-2">
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-1.5 h-1.5 rounded-full",
                svc.status === 'nominal' ? "bg-accent/80 animate-pulse" : "bg-yellow-500/80"
              )} />
              <span className="font-mono text-xs text-foreground">{svc.name}</span>
            </div>
            <span className="font-mono text-[11px] text-muted">{svc.uptime}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TelemetryStream() {
  return (
    <div className="drafting-border p-6 bg-surface/30 h-full flex flex-col">
      <SystemAnnotation label="SYS_LOG" value="LIVE_TELEMETRY" className="mb-4" />
      
      <div className="flex-1 overflow-hidden font-mono text-[11px] text-muted space-y-2 opacity-80">
        <div className="flex gap-4"><span>[14:02:01]</span><span className="text-foreground">INFO: Connection pool established</span></div>
        <div className="flex gap-4"><span>[14:02:05]</span><span>WARN: Rate limit threshold at 80%</span></div>
        <div className="flex gap-4"><span>[14:02:12]</span><span className="text-accent">SUCCESS: Container replicated (region=us-east)</span></div>
        <div className="flex gap-4"><span>[14:02:18]</span><span>INFO: Cache hit ratio: 0.94</span></div>
        <div className="flex gap-4"><span>[14:02:22]</span><span>INFO: Node metrics synced</span></div>
        <div className="flex gap-4"><span>[14:02:29]</span><span className="text-foreground animate-pulse">Awaiting input...</span></div>
      </div>
    </div>
  );
}

export function OperationsPanel() {
  return (
    <section className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Pipeline & Health */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <PipelineStatus />
          <HealthMatrix />
        </div>
        
        {/* Right Column: Live Logs */}
        <div className="md:col-span-1">
          <TelemetryStream />
        </div>
        
      </div>

      {/* Operational Consistency Telemetry (GitHub Matrix) */}
      <div className="drafting-border p-6 bg-surface/30 mt-6 overflow-hidden">
        <ActivityMatrix />
      </div>
    </section>
  );
}

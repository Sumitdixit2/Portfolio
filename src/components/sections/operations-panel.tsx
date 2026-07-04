import { ActivityMatrix } from '@/components/ui/activity-matrix';

export function OperationsPanel() {
  return (
    <section className="relative">
      {/* Operational Consistency Telemetry (GitHub Matrix) */}
      <div className="drafting-border p-6 bg-surface/30 overflow-hidden">
        <ActivityMatrix />
      </div>
    </section>
  );
}

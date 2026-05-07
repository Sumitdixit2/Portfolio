import { cn } from '@/lib/utils';

interface SystemAnnotationProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
}

export function SystemAnnotation({ label, value, className, ...props }: SystemAnnotationProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <span className="font-mono text-[11px] uppercase tracking-widest text-muted border-b border-border pb-1 mb-1 inline-block">
        [{label}]
      </span>
      <span className="font-mono text-xs text-foreground">
        {value}
      </span>
    </div>
  );
}

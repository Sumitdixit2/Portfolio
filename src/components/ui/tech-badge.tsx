import { cn } from '@/lib/utils';

interface TechBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function TechBadge({ children, className, ...props }: TechBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 text-xs font-mono rounded-md',
        'bg-white/[0.03] border border-white/[0.1] text-muted',
        'transition-colors hover:bg-white/[0.08] hover:text-foreground cursor-default',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, hoverable = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'glass-panel relative overflow-hidden transition-colors duration-500',
          hoverable && 'hover:bg-white/[0.04] hover:border-white/[0.12]',
          className
        )}
        whileHover={hoverable ? { y: -2 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

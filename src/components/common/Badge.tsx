import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type BadgeVariant = 'default' | 'personal' | 'team' | 'beta';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  personal: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  team: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  beta: 'bg-purple-500/15 text-purple-400 border-purple-500/30 text-[16px]',
};

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5',
        'rounded-full px-3 py-1.5',
        'border text-xs font-semibold',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

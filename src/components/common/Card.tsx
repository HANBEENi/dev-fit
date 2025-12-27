import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

type CardVariant = 'default' | 'interactive' | 'highlight';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: CardVariant;
  padding?: 'sm' | 'md' | 'lg';
}

const variantStyles: Record<CardVariant, string> = {
  default: `
    bg-[#1a1330] border border-purple-500/20
  `,
  interactive: `
    bg-[#1a1330] border-2 border-purple-500/20
    cursor-pointer
    hover:border-purple-500 hover:-translate-y-1
    hover:shadow-xl hover:shadow-purple-500/10
  `,
  highlight: `
    bg-gradient-to-br from-purple-500/10 to-pink-500/10
    border border-purple-500/30
  `,
};

const paddingStyles = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-300',
        variantStyles[variant],
        paddingStyles[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

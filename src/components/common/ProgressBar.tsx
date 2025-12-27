import { cn } from '../../lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export default function ProgressBar({ current, total, className }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className={cn('w-full', className)}>
      <div className='mb-2 flex items-center justify-between text-sm text-gray-400'>
        <span>
          {current}/{total}
        </span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className='h-1.5 w-full overflow-hidden rounded-full bg-white/10'>
        <div
          className='h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300'
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

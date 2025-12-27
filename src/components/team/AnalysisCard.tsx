import { Card } from '@/components/common';
import { cn } from '@/lib/utils';

type AnalysisType = 'strength' | 'weakness' | 'warning' | 'bias' | 'workflow' | 'comm';

interface AnalysisCardProps {
  type: AnalysisType;
  title: string;
  icon: string;
  content: string;
}

const typeStyles: Record<AnalysisType, string> = {
  strength: 'bg-emerald-500/5 border-emerald-500/20',
  weakness: 'bg-red-500/5 border-red-500/20',
  warning: 'bg-amber-500/5 border-amber-500/20',
  bias: 'bg-pink-500/5 border-pink-500/20',
  workflow: 'bg-blue-500/5 border-blue-500/20',
  comm: 'bg-purple-500/5 border-purple-500/20',
};

const titleStyles: Record<AnalysisType, string> = {
  strength: 'text-emerald-400',
  weakness: 'text-red-400',
  warning: 'text-amber-400',
  bias: 'text-pink-400',
  workflow: 'text-blue-400',
  comm: 'text-purple-400',
};

export default function AnalysisCard({ type, title, icon, content }: AnalysisCardProps) {
  return (
    <Card className={cn('mb-4', typeStyles[type])}>
      <h3 className={cn('mb-3 flex items-center gap-2 text-base font-bold', titleStyles[type])}>
        <span>{icon}</span>
        {title}
      </h3>
      <div
        className='text-sm leading-relaxed text-gray-400'
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Card>
  );
}

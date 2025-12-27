import { TypeAdvice } from '@/types';
import { Card } from '@/components/common';
import { cn } from '@/lib/utils';

interface AdviceListProps {
  adviceList: TypeAdvice[];
}

export default function AdviceList({ adviceList }: AdviceListProps) {
  if (adviceList.length === 0) return null;

  return (
    <div className='mb-5'>
      <h3 className='mb-4 text-center text-lg font-bold'>👤 유형별 맞춤 조언</h3>
      <div className='grid gap-4 sm:grid-cols-2'>
        {adviceList.map((advice) => (
          <Card key={advice.name} padding='md'>
            <div className='mb-4 flex items-center gap-3'>
              <span className='text-3xl'>{advice.icon}</span>
              <div>
                <h4 className='font-bold'>{advice.name}</h4>
                <span className='text-sm font-semibold text-purple-400'>{advice.count}명</span>
              </div>
            </div>
            <div className='space-y-2'>
              {advice.tips.map((tip, index) => (
                <div
                  key={index}
                  className={cn(
                    'border-l-2 pl-3 text-sm leading-relaxed',
                    tip.level === 'critical'
                      ? 'border-red-500 text-red-300'
                      : tip.level === 'warning'
                        ? 'border-amber-500 text-amber-300'
                        : 'border-purple-500/30 text-gray-400',
                  )}
                >
                  {tip.text}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { SynergyItem } from '@/types';
import { DEV_TYPES } from '@/data/types';
import { Card } from '@/components/common';
import { cn } from '@/lib/utils';

interface SynergyMatrixProps {
  synergies: SynergyItem[];
}

export default function SynergyMatrix({ synergies }: SynergyMatrixProps) {
  if (synergies.length === 0) {
    return (
      <Card className='mb-5'>
        <h3 className='mb-4 text-center text-base font-bold'>⚡ 유형 간 시너지 & 충돌</h3>
        <p className='text-center text-sm text-gray-500'>해당되는 시너지/충돌 조합이 없습니다</p>
      </Card>
    );
  }

  // 시너지와 충돌 분리 후 시너지 먼저 정렬
  const sortedSynergies = [...synergies].sort((a, b) => {
    if (a.result === 'good' && b.result === 'bad') return -1;
    if (a.result === 'bad' && b.result === 'good') return 1;
    return 0;
  });

  const goodCount = synergies.filter((s) => s.result === 'good').length;
  const badCount = synergies.filter((s) => s.result === 'bad').length;

  return (
    <Card className='mb-5'>
      <h3 className='mb-4 text-center text-base font-bold'>⚡ 유형 간 시너지 & 충돌</h3>

      {/* 요약 */}
      <div className='mb-4 flex justify-center gap-4 text-sm'>
        <span className='text-emerald-400'>✅ 시너지 {goodCount}개</span>
        <span className='text-red-400'>⚠️ 충돌 {badCount}개</span>
      </div>

      <div className='space-y-3'>
        {sortedSynergies.map((synergy, index) => {
          const type1 = DEV_TYPES[synergy.type1];
          const type2 = DEV_TYPES[synergy.type2];
          const isGood = synergy.result === 'good';

          return (
            <div
              key={index}
              className={cn(
                'flex items-center gap-3 rounded-xl p-3',
                isGood ? 'bg-emerald-500/10' : 'bg-red-500/10',
              )}
            >
              {/* 유형 표시 (이모지 + 이름) */}
              <div className='flex min-w-[140px] items-center gap-1 sm:min-w-[180px]'>
                <div className='flex flex-col items-center'>
                  <span className='text-xl'>{type1.icon}</span>
                  <span className='text-xs text-gray-400'>{type1.name}</span>
                </div>
                <span className='mx-1 text-gray-500'>×</span>
                <div className='flex flex-col items-center'>
                  <span className='text-xl'>{type2.icon}</span>
                  <span className='text-xs text-gray-400'>{type2.name}</span>
                </div>
              </div>

              {/* 설명 */}
              <p className='flex-1 text-sm text-gray-400'>{synergy.description}</p>

              {/* 뱃지 */}
              <span
                className={cn(
                  'flex-shrink-0 rounded px-2 py-1 text-xs font-bold',
                  isGood ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400',
                )}
              >
                {isGood ? '시너지' : '충돌'}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

import { TypeDistribution } from '@/types';
import { DEV_TYPES } from '@/data/types';
import { Card } from '@/components/common';
import { cn } from '@/lib/utils';

interface TypeDistributionChartProps {
  distribution: TypeDistribution[];
}

export default function TypeDistributionChart({ distribution }: TypeDistributionChartProps) {
  const [first, ...rest] = distribution;
  const firstType = DEV_TYPES[first.id];

  // 2위 이하 중 퍼센트가 0보다 큰 것만
  const others = rest.filter((d) => d.percentage > 0);

  // 그래프 너비: 실제 퍼센트 기반, 차이를 시각적으로 강조
  // 퍼센트를 3배로 확대하되 최대 100%
  const getBarWidth = (percentage: number) => {
    return Math.min(percentage * 3, 100);
  };

  return (
    <Card className='mb-4'>
      <h3 className='mb-4 text-center text-sm font-bold text-gray-400'>📊 나의 유형 분포</h3>

      {/* 1위 - 강도(intensity)로 표시 */}
      <div className='mb-4 rounded-xl border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4'>
        <div className='flex items-center gap-4'>
          <span className='text-5xl'>{firstType.icon}</span>
          <div className='flex-1'>
            <div className='mb-1 flex items-center gap-2'>
              <span className='rounded bg-purple-500/20 px-2 py-0.5 text-xs font-bold text-purple-400'>
                주요 성향
              </span>
              <span className='text-lg font-black'>{firstType.name}</span>
            </div>
            <div className='h-3 w-full overflow-hidden rounded-full bg-white/10'>
              <div
                className='h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500'
                style={{ width: `${first.intensity}%` }}
              />
            </div>
            <div className='mt-1 flex justify-between text-xs text-gray-400'>
              <span>성향 강도</span>
              <span className='font-bold text-purple-400'>{first.intensity}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2위 이하 */}
      {others.length > 0 && (
        <div className='space-y-3'>
          <p className='mb-2 text-xs text-gray-500'>함께 가진 성향</p>
          {others.map((item) => {
            const type = DEV_TYPES[item.id];
            const barWidth = getBarWidth(item.percentage);

            return (
              <div key={item.id} className='flex items-center gap-3'>
                <span className='text-xl'>{type.icon}</span>
                <div className='flex-1'>
                  <div className='mb-1 flex justify-between text-xs'>
                    <span className='text-gray-400'>{type.name}</span>
                    <span className='text-gray-500'>전체의 {item.percentage}%</span>
                  </div>
                  <div className='h-2 w-full overflow-hidden rounded-full bg-white/5'>
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-500',
                        item.rank === 2
                          ? 'bg-purple-400'
                          : item.rank === 3
                            ? 'bg-purple-400/70'
                            : item.rank === 4
                              ? 'bg-purple-400/50'
                              : 'bg-purple-400/30',
                      )}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 안내 문구 */}
      <p className='mt-4 border-t border-white/5 pt-3 text-center text-xs text-gray-500'>
        💡 사람은 하나의 유형으로 정의되지 않습니다.
        <br />
        상황에 따라 여러 성향이 함께 나타날 수 있어요.
      </p>
    </Card>
  );
}

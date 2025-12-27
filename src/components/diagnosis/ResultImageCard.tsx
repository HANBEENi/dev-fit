'use client';

import { forwardRef } from 'react';
import { DevType, TypeDistribution } from '@/types';

interface ResultImageCardProps {
  devType: DevType;
  distribution: TypeDistribution[];
}

// 이미지 생성용 카드 (캡처 대상)
const ResultImageCard = forwardRef<HTMLDivElement, ResultImageCardProps>(
  ({ devType, distribution }, ref) => {
    const top3 = distribution.slice(0, 3);

    return (
      <div
        ref={ref}
        className='w-[400px] rounded-2xl p-6'
        style={{
          background: 'linear-gradient(135deg, #1a1330 0%, #0f0a1f 100%)',
        }}
      >
        {/* 헤더 */}
        <div className='mb-4 text-center'>
          <p className='mb-1 text-xs font-bold text-purple-400'>DevFit 개발자 성향 진단</p>
          <div className='mb-2 text-5xl'>{devType.icon}</div>
          <h2 className='text-xl font-black text-white'>{devType.name}</h2>
          <p className='text-sm text-purple-300'>{devType.subtitle}</p>
        </div>

        {/* 분포 바 */}
        <div className='mb-4 rounded-xl bg-white/5 p-4'>
          <p className='mb-3 text-center text-xs text-gray-400'>나의 유형 분포</p>
          <div className='space-y-2'>
            {top3.map((item, index) => {
              const type = devType.id === item.id ? devType : null;
              const icons: Record<string, string> = {
                structure: '🏗️',
                executor: '🔥',
                collaborator: '🤝',
                analyst: '🔍',
                solver: '🔬',
                flexible: '🌊',
              };
              return (
                <div key={item.id} className='flex items-center gap-2'>
                  <span className='text-lg'>{icons[item.id]}</span>
                  <div className='flex-1'>
                    <div className='mb-1 flex justify-between text-xs'>
                      <span className='text-gray-300'>{item.id}</span>
                      <span className='text-purple-400'>{item.percentage}%</span>
                    </div>
                    <div className='h-2 w-full rounded-full bg-white/10'>
                      <div
                        className='h-full rounded-full'
                        style={{
                          width: `${item.percentage}%`,
                          background:
                            index === 0
                              ? 'linear-gradient(90deg, #a855f7, #ec4899)'
                              : index === 1
                                ? '#a855f7'
                                : '#6b21a8',
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 강점/주의점 */}
        <div className='mb-4 grid grid-cols-2 gap-2'>
          <div className='rounded-lg bg-emerald-500/10 p-3'>
            <p className='mb-1 text-xs font-bold text-emerald-400'>💪 강점</p>
            <p className='line-clamp-2 text-xs leading-relaxed text-gray-300'>{devType.strength}</p>
          </div>
          <div className='rounded-lg bg-red-500/10 p-3'>
            <p className='mb-1 text-xs font-bold text-red-400'>⚠️ 주의점</p>
            <p className='line-clamp-2 text-xs leading-relaxed text-gray-300'>{devType.weakness}</p>
          </div>
        </div>

        {/* 푸터 */}
        <div className='border-t border-white/10 pt-3 text-center'>
          <p className='text-xs text-gray-500'>devfit.vercel.app</p>
        </div>
      </div>
    );
  },
);

ResultImageCard.displayName = 'ResultImageCard';

export default ResultImageCard;

'use client';

import { forwardRef } from 'react';
import { DevType, TypeDistribution } from '@/types';

interface ResultImageCardProps {
  devType: DevType;
  distribution: TypeDistribution[];
}

const ResultImageCard = forwardRef<HTMLDivElement, ResultImageCardProps>(({ devType }, ref) => {
  return (
    <div
      ref={ref}
      className='w-[600px] rounded-3xl border border-purple-500/20 p-8'
      style={{
        background: 'linear-gradient(135deg, #1a1330 0%, #0f0a1f 100%)',
      }}
    >
      {/* 헤더 */}
      <div className='mb-6 text-center'>
        <div className='mb-8 text-7xl'>{devType.icon}</div>
        <h2 className='mb-5 text-3xl font-black text-white'>{devType.name}</h2>
        <p className='text-lg text-purple-300'>{devType.subtitle}</p>
      </div>

      {/* 설명 */}
      <div className='mb-6 rounded-2xl bg-purple-500/10 px-[10px] py-[20px]'>
        <p className='text-sm leading-relaxed text-gray-300'>{devType.desc}</p>
      </div>

      {/* 강점/주의점 */}
      <div className='mb-6 grid grid-cols-2 gap-4'>
        <div className='rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/10 p-5'>
          <p className='mb-3 text-center text-base font-bold text-emerald-400'>강점</p>
          <p className='text-sm leading-relaxed text-gray-300'>{devType.strength}</p>
        </div>
        <div className='rounded-2xl border-2 border-red-500/30 bg-red-500/10 p-5'>
          <p className='mb-3 text-center text-base font-bold text-red-400'>주의점</p>
          <p className='text-sm leading-relaxed text-gray-300'>{devType.weakness}</p>
        </div>
      </div>

      {/* 성장 포인트 */}
      <div className='mb-6 rounded-2xl border-2 border-yellow-500/30 bg-yellow-500/10 p-5'>
        <p className='mb-3 text-center text-base font-bold text-yellow-400'>💡 성장 포인트</p>
        <p className='text-sm leading-relaxed text-gray-300'>{devType.growth}</p>
      </div>

      {/* 푸터 */}
      <div className='border-t border-white/10 pt-4 text-center'>
        <p className='text-sm font-semibold text-purple-400'>DevFit 개발자 성향 진단</p>
        <p className='text-xs text-gray-500'>devfit.vercel.app</p>
      </div>
    </div>
  );
});

ResultImageCard.displayName = 'ResultImageCard';

export default ResultImageCard;

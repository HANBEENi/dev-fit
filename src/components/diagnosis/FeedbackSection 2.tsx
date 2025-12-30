'use client';

import { useState } from 'react';
import { DevTypeId, StressTypeId } from '@/types';
import { Card } from '@/components/common';
import { cn } from '@/lib/utils';
import { event } from '@/lib/gtag';

interface FeedbackSectionProps {
  resultType: DevTypeId;
  stressType: StressTypeId;
}

export default function FeedbackSection({ resultType, stressType }: FeedbackSectionProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (rating === null) return;

    // GA 이벤트로 피드백 전송
    event('feedback_submit', {
      accuracy_rating: rating,
      result_type: resultType,
      stress_type: stressType,
    });

    setSubmitted(true);
  };

  const labels = ['전혀 안 맞음', '조금 안 맞음', '보통', '꽤 맞음', '정확함'];

  if (submitted) {
    return (
      <Card className='mb-4 border-emerald-500/20 bg-emerald-500/10'>
        <div className='py-2 text-center'>
          <span className='mb-2 block text-2xl'>🙏</span>
          <p className='font-bold text-emerald-400'>피드백 감사합니다!</p>
          <p className='mt-1 text-xs text-gray-400'>더 정확한 테스트를 만드는 데 활용됩니다</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className='mb-4'>
      <h3 className='mb-3 text-center text-sm font-bold'>🎯 결과가 얼마나 맞나요?</h3>
      <p className='mb-4 text-center text-xs text-gray-500'>
        피드백을 주시면 테스트 개선에 활용됩니다
      </p>

      {/* 별점 */}
      <div className='mb-3 flex justify-center gap-2'>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            onClick={() => handleRating(value)}
            className={cn(
              'h-10 w-10 rounded-full text-xl transition-all',
              rating !== null && value <= rating
                ? 'scale-110 bg-yellow-500'
                : 'bg-white/10 hover:bg-white/20',
            )}
          >
            {rating !== null && value <= rating ? '⭐' : '☆'}
          </button>
        ))}
      </div>

      {/* 선택한 레이블 표시 */}
      <p className='mb-4 h-5 text-center text-sm'>
        {rating !== null && (
          <span
            className={cn(
              'font-semibold',
              rating <= 2 ? 'text-red-400' : rating === 3 ? 'text-gray-400' : 'text-emerald-400',
            )}
          >
            {labels[rating - 1]}
          </span>
        )}
      </p>

      {/* 제출 버튼 */}
      <button
        onClick={handleSubmit}
        disabled={rating === null}
        className={cn(
          'w-full rounded-lg py-2 text-sm font-semibold transition-all',
          rating !== null
            ? 'bg-purple-500 text-white hover:bg-purple-600'
            : 'cursor-not-allowed bg-white/10 text-gray-500',
        )}
      >
        피드백 보내기
      </button>
    </Card>
  );
}

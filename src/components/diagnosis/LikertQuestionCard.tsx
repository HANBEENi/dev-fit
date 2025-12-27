import { LikertQuestion } from '@/types';
import { Card, ProgressBar } from '@/components/common';
import { TEST_CONFIG } from '@/constants';
import { cn } from '@/lib/utils';

interface LikertQuestionCardProps {
  question: LikertQuestion;
  currentProgress: number;
  totalQuestions: number;
  onSelect: (score: number) => void;
}

export default function LikertQuestionCard({
  question,
  currentProgress,
  totalQuestions,
  onSelect,
}: LikertQuestionCardProps) {
  const { labels } = TEST_CONFIG.likertScale;

  return (
    <div className='mx-auto max-w-lg'>
      {/* 진행 상황 */}
      <div className='mb-6'>
        <div className='mb-2 flex items-center justify-between'>
          <span className='text-sm text-gray-400'>
            {currentProgress}/{totalQuestions}
          </span>
          <span className='rounded bg-purple-500/20 px-2 py-1 text-xs text-purple-400'>
            🎯 행동 경향
          </span>
        </div>
        <ProgressBar current={currentProgress} total={totalQuestions} />
      </div>

      {/* 질문 */}
      <Card className='mb-6'>
        <p className='text-center text-lg font-semibold leading-relaxed'>{question.text}</p>
      </Card>

      {/* 리커트 척도 */}
      <div className='space-y-3'>
        {/* 라벨 */}
        <div className='flex justify-between px-2 text-xs text-gray-500'>
          <span>{labels[0]}</span>
          <span>{labels[4]}</span>
        </div>

        {/* 버튼들 */}
        <div className='flex justify-center gap-2 sm:gap-3'>
          {[1, 2, 3, 4, 5].map((score) => (
            <button
              key={score}
              onClick={() => onSelect(score)}
              className={cn(
                'h-12 w-12 rounded-full text-lg font-bold transition-all sm:h-14 sm:w-14',
                'border-2 hover:scale-110',
                score <= 2
                  ? 'border-red-500/30 hover:border-red-500 hover:bg-red-500 hover:text-white'
                  : score === 3
                    ? 'border-gray-500/30 hover:border-gray-500 hover:bg-gray-500 hover:text-white'
                    : 'border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white',
              )}
            >
              {score}
            </button>
          ))}
        </div>

        {/* 중앙 라벨 */}
        <div className='text-center text-xs text-gray-500'>{labels[2]}</div>
      </div>

      {/* 안내 */}
      <p className='mt-6 text-center text-xs text-gray-600'>1 = 전혀 아니다 ~ 5 = 매우 그렇다</p>
    </div>
  );
}

import { LikertQuestion, JobRole } from '@/types';
import { Card, ProgressBar } from '@/components/common';
import { TEST_CONFIG } from '@/constants';
import { cn } from '@/lib/utils';

interface LikertQuestionCardProps {
  question: LikertQuestion;
  selectedRole: JobRole;
  currentProgress: number;
  totalQuestions: number;
  previousAnswer: number | null;
  canGoBack: boolean;
  onSelect: (score: number) => void;
  onBack: () => void;
}

export default function LikertQuestionCard({
  question,
  selectedRole,
  currentProgress,
  totalQuestions,
  previousAnswer,
  canGoBack,
  onSelect,
  onBack,
}: LikertQuestionCardProps) {
  const { labels } = TEST_CONFIG.likertScale;

  // 직무별 텍스트 가져오기
  const questionText =
    typeof question.text === 'string' ? question.text : question.text[selectedRole];

  return (
    <div className='mx-auto max-w-lg'>
      {/* 진행 상황 */}
      <div className='mb-6'>
        <div className='mb-2 flex items-center justify-end'>
          <span className='rounded bg-purple-500/20 px-2 py-1 text-xs text-purple-400'>
            🎯 행동 경향
          </span>
        </div>
        <ProgressBar current={currentProgress} total={totalQuestions} />
      </div>

      {/* 질문 */}
      <Card className='mb-6'>
        <p className='text-center text-lg font-semibold leading-relaxed'>{questionText}</p>
      </Card>

      {/* 리커트 척도 */}
      <div className='space-y-3'>
        {/* 라벨 */}
        <div className='mb-6 flex justify-between px-2 text-xs text-gray-600'>
          <span>{labels[0]} 1</span>
          <span>{labels[2]} 3</span>
          <span>{labels[4]} 5</span>
        </div>
        {/* 버튼들 */}
        <div className='mb-6 flex justify-center gap-4 sm:gap-4'>
          {[1, 2, 3, 4, 5].map((score) => {
            const isSelected = previousAnswer === score;
            return (
              <button
                key={score}
                onClick={() => onSelect(score)}
                className={cn(
                  'h-12 w-12 rounded-full text-lg font-bold transition-all sm:h-14 sm:w-14',
                  'border-2 hover:scale-110',
                  isSelected
                    ? score <= 2
                      ? 'scale-110 border-red-500 bg-red-500 text-white'
                      : score === 3
                        ? 'scale-110 border-gray-500 bg-gray-500 text-white'
                        : 'scale-110 border-emerald-500 bg-emerald-500 text-white'
                    : score <= 2
                      ? 'border-red-500/30 hover:border-red-500 hover:bg-red-500 hover:text-white'
                      : score === 3
                        ? 'border-gray-500/30 hover:border-gray-500 hover:bg-gray-500 hover:text-white'
                        : 'border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white',
                )}
              >
                {score}
              </button>
            );
          })}
        </div>
      </div>

      {/* 안내 + 뒤로가기 */}
      <div className='mt-10 flex items-center justify-between'>
        {canGoBack ? (
          <button
            onClick={onBack}
            className='flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-white'
          >
            <span>←</span>
            <span>이전</span>
          </button>
        ) : (
          <div />
        )}

        {/* 수정 안내 */}
        {previousAnswer !== null && (
          <p className='text-center text-xs text-purple-400'>
            ✓ 이전에 선택한 답변입니다. 다른 번호를 누르면 수정됩니다.
          </p>
        )}
        <div />

        {/* <p className='text-xs text-gray-700'>1 = 전혀 아니다 ~ 5 = 매우 그렇다</p> */}
      </div>
    </div>
  );
}

import { ScenarioQuestion, StressTypeId, JobRole } from '@/types';
import { Card, ProgressBar } from '@/components/common';
import { cn } from '@/lib/utils';

interface StressQuestionCardProps {
  question: ScenarioQuestion;
  options: ScenarioQuestion['options'];
  selectedRole: JobRole;
  currentProgress: number;
  totalQuestions: number;
  previousAnswer: StressTypeId | null;
  canGoBack: boolean;
  onSelect: (value: StressTypeId) => void;
  onBack: () => void;
}

const keyLabels = ['A', 'B', 'C', 'D'];

export default function StressQuestionCard({
  question,
  options,
  selectedRole,
  currentProgress,
  totalQuestions,
  previousAnswer,
  canGoBack,
  onSelect,
  onBack,
}: StressQuestionCardProps) {
  // 직무별 텍스트 가져오기
  const questionText =
    typeof question.text === 'string' ? question.text : question.text[selectedRole];

  return (
    <div className='mx-auto max-w-lg'>
      {/* 진행 상황 */}
      <div className='mb-6'>
        <div className='mb-2 flex items-center justify-end'>
          <span className='rounded bg-amber-500/20 px-2 py-1 text-xs text-amber-400'>
            🔥 스트레스 반응
          </span>
        </div>
        <ProgressBar current={currentProgress} total={totalQuestions} />
      </div>

      {/* 질문 */}
      <Card className='mb-4'>
        <p className='text-lg font-semibold leading-relaxed'>{questionText}</p>
      </Card>

      {/* 선택지 */}
      <div className='flex flex-col gap-3'>
        {options.map((option, index) => {
          const isSelected = previousAnswer === option.value;
          return (
            <button
              key={index}
              onClick={() => onSelect(option.value)}
              className={cn(
                'group flex items-center gap-3 rounded-xl p-4 text-left transition-all',
                isSelected
                  ? 'border-2 border-purple-500 bg-purple-500/20'
                  : 'border border-purple-500/20 bg-[#1a1330] hover:translate-x-1 hover:border-purple-500 hover:bg-purple-500/10',
              )}
            >
              <span
                className={cn(
                  'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm font-semibold transition-colors',
                  isSelected
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/5 text-gray-400 group-hover:bg-purple-500 group-hover:text-white',
                )}
              >
                {keyLabels[index]}
              </span>
              <span className='text-sm leading-relaxed'>{option.text}</span>
              {isSelected && <span className='ml-auto text-sm text-purple-400'>✓</span>}
            </button>
          );
        })}
      </div>

      {/* 뒤로가기 */}
      <div className='mt-6'>
        {canGoBack && (
          <button
            onClick={onBack}
            className='flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-white'
          >
            <span>←</span>
            <span>이전</span>
          </button>
        )}
      </div>

      {/* 수정 안내 */}
      {previousAnswer !== null && (
        <p className='mt-4 text-center text-xs text-purple-400'>
          ✓ 이전에 선택한 답변입니다. 다른 항목을 누르면 수정됩니다.
        </p>
      )}
    </div>
  );
}

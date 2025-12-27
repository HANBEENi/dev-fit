import { ScenarioQuestion, StressTypeId } from '@/types';
import { Card, ProgressBar } from '@/components/common';

interface StressQuestionCardProps {
  question: ScenarioQuestion;
  options: ScenarioQuestion['options'];
  currentProgress: number;
  totalQuestions: number;
  onSelect: (value: StressTypeId) => void;
}

const keyLabels = ['A', 'B', 'C', 'D'];

export default function StressQuestionCard({
  question,
  options,
  currentProgress,
  totalQuestions,
  onSelect,
}: StressQuestionCardProps) {
  return (
    <div className='mx-auto max-w-lg'>
      {/* 진행 상황 */}
      <div className='mb-6'>
        <div className='mb-2 flex items-center justify-between'>
          <span className='text-sm text-gray-400'>
            {currentProgress}/{totalQuestions}
          </span>
          <span className='rounded bg-amber-500/20 px-2 py-1 text-xs text-amber-400'>
            🔥 스트레스 반응
          </span>
        </div>
        <ProgressBar current={currentProgress} total={totalQuestions} />
      </div>

      {/* 질문 */}
      <Card className='mb-4'>
        <p className='text-lg font-semibold leading-relaxed'>{question.text}</p>
      </Card>

      {/* 선택지 */}
      <div className='flex flex-col gap-3'>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option.value)}
            className='group flex items-center gap-3 rounded-xl border border-purple-500/20 bg-[#1a1330] p-4 text-left transition-all hover:translate-x-1 hover:border-purple-500 hover:bg-purple-500/10'
          >
            <span className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 text-sm font-semibold text-gray-400 transition-colors group-hover:bg-purple-500 group-hover:text-white'>
              {keyLabels[index]}
            </span>
            <span className='text-sm leading-relaxed'>{option.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

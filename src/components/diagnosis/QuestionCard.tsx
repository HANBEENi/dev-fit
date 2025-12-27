import { Card, Badge, ProgressBar } from '@/components/common';
import { QuestionOption } from '@/types';

interface QuestionCardProps {
  questionNumber: number;
  questionText: string;
  options: QuestionOption[];
  currentProgress: number;
  totalQuestions: number;
  phase: 'basic' | 'stress';
  onSelect: (value: string) => void;
}

const keyLabels = ['A', 'B', 'C', 'D'];

export default function QuestionCard({
  questionNumber,
  questionText,
  options,
  currentProgress,
  totalQuestions,
  phase,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className='mx-auto max-w-lg'>
      {/* 진행 상황 */}
      <div className='mb-6'>
        <div className='mb-2 flex items-center justify-between'>
          <span className='text-sm text-gray-400'>
            {currentProgress}/{totalQuestions}
          </span>
          <Badge variant={phase === 'stress' ? 'team' : 'default'}>
            {phase === 'stress' ? '🔥 스트레스 반응' : '🎯 행동 경향'}
          </Badge>
        </div>
        <ProgressBar current={currentProgress} total={totalQuestions} />
      </div>

      {/* 질문 */}
      <Card className='mb-4'>
        <span className='mb-2 block text-xs font-semibold text-purple-400'>Q{questionNumber}</span>
        <p className='text-lg leading-relaxed font-semibold'>{questionText}</p>
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

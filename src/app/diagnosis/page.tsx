'use client';

import { useEffect } from 'react';
import { useDiagnosis } from '@/hooks/useDiagnosis';
import {
  DiagnosisIntro,
  QuestionCard,
  ResultCard,
  ResultActions,
  TypeDistributionChart,
  FeedbackSection,
} from '@/components/diagnosis';
import { DEV_TYPES } from '@/data/types';
import { STRESS_TYPES } from '@/data/stressTypes';
import { trackDiagnosisStart, trackDiagnosisComplete } from '@/lib/gtag';

export default function DiagnosisPage() {
  const {
    phase,
    currentQuestion,
    shuffledOptions,
    totalProgress,
    totalQuestions,
    resultDevType,
    resultStressType,
    typeDistribution,
    startTest,
    selectAnswer,
    resetTest,
  } = useDiagnosis();

  // GA 이벤트 추적
  useEffect(() => {
    if (phase === 'basic' && totalProgress === 1) {
      trackDiagnosisStart();
    }
    if (phase === 'result' && resultDevType && resultStressType) {
      trackDiagnosisComplete(resultDevType, resultStressType);
    }
  }, [phase, totalProgress, resultDevType, resultStressType]);

  return (
    <div className='min-h-screen px-4 pb-16 pt-8'>
      {/* 배경 */}
      <div className='pointer-events-none fixed inset-0'>
        <div
          className='absolute inset-0'
          style={{
            background: `
              radial-gradient(ellipse at 0% 0%, rgba(168, 85, 247, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse at 100% 100%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* 콘텐츠 */}
      <div className='relative z-10'>
        {phase === 'intro' && <DiagnosisIntro onStart={startTest} />}

        {(phase === 'basic' || phase === 'stress') && currentQuestion && (
          <QuestionCard
            questionNumber={totalProgress}
            questionText={currentQuestion.text}
            options={shuffledOptions}
            currentProgress={totalProgress}
            totalQuestions={totalQuestions}
            phase={phase}
            onSelect={selectAnswer}
          />
        )}

        {phase === 'result' && resultDevType && resultStressType && (
          <>
            {/* 유형 분포 차트 (결과 최상단) */}
            <div className='mx-auto max-w-lg'>
              <TypeDistributionChart distribution={typeDistribution} />
            </div>

            {/* 기존 결과 카드 */}
            <ResultCard
              devType={DEV_TYPES[resultDevType]}
              stressType={STRESS_TYPES[resultStressType]}
            />

            {/* 피드백 섹션 */}
            <div className='mx-auto max-w-lg'>
              <FeedbackSection resultType={resultDevType} stressType={resultStressType} />
            </div>

            {/* 액션 버튼 */}
            <ResultActions
              devType={DEV_TYPES[resultDevType]}
              distribution={typeDistribution}
              onRestart={resetTest}
            />
          </>
        )}
      </div>
    </div>
  );
}

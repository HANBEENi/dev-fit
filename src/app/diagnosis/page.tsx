'use client';

import { useEffect } from 'react';
import { useDiagnosis } from '@/hooks/useDiagnosis';
import {
  DiagnosisIntro,
  LikertQuestionCard,
  StressQuestionCard,
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
    currentLikertQuestion,
    currentStressQuestion,
    shuffledStressOptions,
    totalProgress,
    totalQuestions,
    resultDevType,
    resultStressType,
    typeDistribution,
    startTest,
    submitLikertAnswer,
    submitStressAnswer,
    resetTest,
  } = useDiagnosis();

  // GA 이벤트 추적
  useEffect(() => {
    if (phase === 'likert' && totalProgress === 1) {
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

        {phase === 'likert' && currentLikertQuestion && (
          <LikertQuestionCard
            question={currentLikertQuestion}
            currentProgress={totalProgress}
            totalQuestions={totalQuestions}
            onSelect={submitLikertAnswer}
          />
        )}

        {phase === 'stress' && currentStressQuestion && (
          <StressQuestionCard
            question={currentStressQuestion}
            options={shuffledStressOptions}
            currentProgress={totalProgress}
            totalQuestions={totalQuestions}
            onSelect={submitStressAnswer}
          />
        )}

        {phase === 'result' && resultDevType && resultStressType && (
          <>
            {/* 유형 분포 차트 */}
            <div className='mx-auto max-w-lg'>
              <TypeDistributionChart distribution={typeDistribution} />
            </div>

            {/* 결과 카드 */}
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

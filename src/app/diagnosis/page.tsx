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
    selectedRole,
    currentLikertQuestion,
    currentStressQuestion,
    shuffledStressOptions,
    totalProgress,
    totalQuestions,
    resultDevType,
    resultStressType,
    typeDistribution,
    currentLikertAnswer,
    currentStressAnswer,
    canGoBack,
    selectRole,
    startTest,
    submitLikertAnswer,
    submitStressAnswer,
    goBack,
    resetTest,
  } = useDiagnosis();

  // GA 이벤트 추적
  useEffect(() => {
    if (phase === 'likert' && totalProgress === 1 && selectedRole) {
      trackDiagnosisStart();
    }
    if (phase === 'result' && resultDevType && resultStressType) {
      trackDiagnosisComplete(resultDevType, resultStressType);
    }
  }, [phase, totalProgress, selectedRole, resultDevType, resultStressType]);

  return (
    <div className='min-h-screen px-4 pb-16 pt-24'>
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
      <div className='z-14 relative'>
        {phase === 'intro' && (
          <DiagnosisIntro
            onStart={startTest}
            selectedRole={selectedRole}
            onRoleSelect={selectRole}
          />
        )}

        {phase === 'likert' && currentLikertQuestion && selectedRole && (
          <LikertQuestionCard
            question={currentLikertQuestion}
            selectedRole={selectedRole}
            currentProgress={totalProgress}
            totalQuestions={totalQuestions}
            previousAnswer={currentLikertAnswer}
            canGoBack={canGoBack}
            onSelect={submitLikertAnswer}
            onBack={goBack}
          />
        )}

        {phase === 'stress' && currentStressQuestion && (
          <StressQuestionCard
            question={currentStressQuestion}
            options={shuffledStressOptions}
            currentProgress={totalProgress}
            totalQuestions={totalQuestions}
            previousAnswer={currentStressAnswer}
            canGoBack={canGoBack}
            onSelect={submitStressAnswer}
            onBack={goBack}
          />
        )}

        {phase === 'result' && resultDevType && resultStressType && (
          <>
            {/* 유형 분포 차트 */}
            {/* <div className='mx-auto max-w-lg'>
              <TypeDistributionChart distribution={typeDistribution} />
            </div> */}

            {/* 결과 카드 */}
            <ResultCard
              devType={DEV_TYPES[resultDevType]}
              stressType={STRESS_TYPES[resultStressType]}
              selectedRole={selectedRole ?? undefined}
            />

            {/* 피드백 섹션 */}
            <div className='mx-auto mt-4 max-w-lg'>
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

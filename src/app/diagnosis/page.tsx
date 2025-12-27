'use client';

import { useEffect } from 'react';
import { useDiagnosis } from '@/hooks/useDiagnosis';
import { DiagnosisIntro, QuestionCard, ResultCard, ResultActions } from '@/components/diagnosis';
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
    <div className='min-h-screen px-4 pt-8 pb-16'>
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
            <ResultCard
              devType={DEV_TYPES[resultDevType]}
              stressType={STRESS_TYPES[resultStressType]}
            />
            <ResultActions devType={DEV_TYPES[resultDevType]} onRestart={resetTest} />
          </>
        )}
      </div>
    </div>
  );
}

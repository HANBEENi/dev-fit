'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDiagnosis } from '@/hooks/useDiagnosis';
import {
  LikertQuestionCard,
  StressQuestionCard,
  ResultCard,
  ResultActions,
  FeedbackSection,
} from '@/components/diagnosis';
import { DEV_TYPES } from '@/data/types';
import { STRESS_TYPES } from '@/data/stressTypes';
import { trackDiagnosisStart, trackDiagnosisComplete } from '@/lib/gtag';
import { JobRole } from '@/types';

export default function DiagnosisTestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleFromUrl = searchParams.get('role') as JobRole | null;

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
    startTest,
    submitLikertAnswer,
    submitStressAnswer,
    goBack,
    resetTest,
  } = useDiagnosis();

  // URL에서 role을 읽어서 테스트 시작
  useEffect(() => {
    if (roleFromUrl && phase === 'intro') {
      startTest(roleFromUrl);
    }
  }, [roleFromUrl, phase, startTest]);

  // GA 이벤트 추적
  useEffect(() => {
    if (phase === 'likert' && totalProgress === 1 && selectedRole) {
      trackDiagnosisStart();
    }
    if (phase === 'result' && resultDevType && resultStressType) {
      trackDiagnosisComplete(resultDevType, resultStressType);
    }
  }, [phase, totalProgress, selectedRole, resultDevType, resultStressType]);

  const handleBack = () => {
    if (totalProgress === 1) {
      // 첫 번째 질문에서 뒤로가기 시 메인으로
      router.push('/diagnosis');
    } else {
      goBack();
    }
  };

  const handleRestart = () => {
    resetTest();
    router.push('/diagnosis');
  };

  // 로딩 중이면 로딩 표시
  if (phase === 'intro') {
    return (
      <div className='min-h-screen px-4 pb-16 pt-24'>
        <div className='flex items-center justify-center'>
          <div className='text-center'>
            <div className='mb-4 text-4xl'>⏳</div>
            <p className='text-gray-400'>진단을 시작하는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // 직무가 선택되지 않았으면 메인으로 리다이렉트
  if (!selectedRole) {
    router.replace('/diagnosis');
    return null;
  }

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
        {phase === 'likert' && currentLikertQuestion && (
          <LikertQuestionCard
            question={currentLikertQuestion}
            selectedRole={selectedRole}
            currentProgress={totalProgress}
            totalQuestions={totalQuestions}
            previousAnswer={currentLikertAnswer}
            canGoBack={true}
            onSelect={submitLikertAnswer}
            onBack={handleBack}
          />
        )}

        {phase === 'stress' && currentStressQuestion && (
          <StressQuestionCard
            question={currentStressQuestion}
            options={shuffledStressOptions}
            selectedRole={selectedRole}
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
            {/* 결과 카드 */}
            <ResultCard
              devType={DEV_TYPES[resultDevType]}
              stressType={STRESS_TYPES[resultStressType]}
              selectedRole={selectedRole}
            />

            {/* 피드백 섹션 */}
            <div className='mx-auto mt-4 max-w-lg'>
              <FeedbackSection resultType={resultDevType} stressType={resultStressType} />
            </div>

            {/* 액션 버튼 */}
            <ResultActions
              devType={DEV_TYPES[resultDevType]}
              distribution={typeDistribution}
              onRestart={handleRestart}
            />
          </>
        )}
      </div>
    </div>
  );
}

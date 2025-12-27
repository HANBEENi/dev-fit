'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  DevTypeId,
  StressTypeId,
  DevTypeScores,
  StressTypeScores,
  TypeDistribution,
  LikertQuestion,
  ScenarioQuestion,
  LikertResponse,
} from '@/types';
import { initDevTypeScores, initStressTypeScores, shuffleArray } from '@/lib/utils';
import { LIKERT_QUESTIONS, STRESS_QUESTIONS, LIKERT_QUESTION_COUNT } from '@/data/questions';
import { TEST_CONFIG } from '@/constants';

export type DiagnosisPhase = 'intro' | 'likert' | 'stress' | 'result';

interface DiagnosisState {
  phase: DiagnosisPhase;
  currentIndex: number;
  likertResponses: LikertResponse[];
  stressTypeScores: StressTypeScores;
  resultDevType: DevTypeId | null;
  resultStressType: StressTypeId | null;
}

const initialState: DiagnosisState = {
  phase: 'intro',
  currentIndex: 0,
  likertResponses: [],
  stressTypeScores: initStressTypeScores(),
  resultDevType: null,
  resultStressType: null,
};

// 유형별 점수 계산 (리커트 응답 기반)
function calculateDevTypeScores(responses: LikertResponse[]): DevTypeScores {
  const scores = initDevTypeScores();

  for (const response of responses) {
    const question = LIKERT_QUESTIONS.find((q) => q.id === response.questionId);
    if (!question) continue;

    // 역채점인 경우 점수 반전 (6 - score)
    const effectiveScore = question.reverse ? 6 - response.score : response.score;
    scores[question.targetType] += effectiveScore;
  }

  return scores;
}

// 정규화된 분포 계산 (0-100%)
function calculateDistribution(scores: DevTypeScores): TypeDistribution[] {
  const maxPossiblePerType = 4 * 5; // 4문항 × 최대 5점 = 20점

  const distribution = Object.entries(scores)
    .map(([id, score]) => ({
      id: id as DevTypeId,
      score,
      percentage: Math.round((score / maxPossiblePerType) * 100),
      rank: 0,
    }))
    .sort((a, b) => b.score - a.score);

  distribution.forEach((item, index) => {
    item.rank = index + 1;
  });

  return distribution;
}

// 최고 점수 유형 찾기 (동점 시 랜덤)
function getTopType(scores: DevTypeScores): DevTypeId {
  const entries = Object.entries(scores) as [DevTypeId, number][];
  const maxScore = Math.max(...entries.map(([_, s]) => s));
  const topTypes = entries.filter(([_, s]) => s === maxScore).map(([id]) => id);

  // 동점이면 랜덤 선택
  return topTypes[Math.floor(Math.random() * topTypes.length)];
}

function getTopStressType(scores: StressTypeScores): StressTypeId {
  const entries = Object.entries(scores) as [StressTypeId, number][];
  const maxScore = Math.max(...entries.map(([_, s]) => s));
  const topTypes = entries.filter(([_, s]) => s === maxScore).map(([id]) => id);

  return topTypes[Math.floor(Math.random() * topTypes.length)];
}

export function useDiagnosis() {
  const [state, setState] = useState<DiagnosisState>(initialState);

  // 셔플된 리커트 질문 (한 번만 생성)
  const [shuffledLikertQuestions] = useState(() => shuffleArray(LIKERT_QUESTIONS));

  // 현재 질문
  const currentLikertQuestion: LikertQuestion | null =
    state.phase === 'likert' ? shuffledLikertQuestions[state.currentIndex] : null;

  const currentStressQuestion: ScenarioQuestion | null =
    state.phase === 'stress' ? STRESS_QUESTIONS[state.currentIndex] : null;

  const shuffledStressOptions = currentStressQuestion
    ? shuffleArray(currentStressQuestion.options)
    : [];

  // 전체 진행률
  const totalProgress =
    state.phase === 'likert'
      ? state.currentIndex + 1
      : state.phase === 'stress'
        ? LIKERT_QUESTION_COUNT + state.currentIndex + 1
        : 0;

  // 점수 계산
  const devTypeScores = useMemo(
    () => calculateDevTypeScores(state.likertResponses),
    [state.likertResponses],
  );

  const typeDistribution = useMemo(() => calculateDistribution(devTypeScores), [devTypeScores]);

  // 테스트 시작
  const startTest = useCallback(() => {
    setState({
      ...initialState,
      phase: 'likert',
      likertResponses: [],
      stressTypeScores: initStressTypeScores(),
    });
  }, []);

  // 리커트 응답 제출
  const submitLikertAnswer = useCallback(
    (score: number) => {
      setState((prev) => {
        const question = shuffledLikertQuestions[prev.currentIndex];
        const newResponses = [...prev.likertResponses, { questionId: question.id, score }];

        const isLastLikert = prev.currentIndex >= LIKERT_QUESTION_COUNT - 1;

        if (isLastLikert) {
          return {
            ...prev,
            phase: 'stress',
            currentIndex: 0,
            likertResponses: newResponses,
          };
        }

        return {
          ...prev,
          currentIndex: prev.currentIndex + 1,
          likertResponses: newResponses,
        };
      });
    },
    [shuffledLikertQuestions],
  );

  // 스트레스 응답 제출
  const submitStressAnswer = useCallback((value: StressTypeId) => {
    setState((prev) => {
      const newStressScores = {
        ...prev.stressTypeScores,
        [value]: prev.stressTypeScores[value] + 1,
      };

      const isLastStress = prev.currentIndex >= STRESS_QUESTIONS.length - 1;

      if (isLastStress) {
        const finalDevScores = calculateDevTypeScores(prev.likertResponses);
        const resultDevType = getTopType(finalDevScores);
        const resultStressType = getTopStressType(newStressScores);

        return {
          ...prev,
          phase: 'result',
          stressTypeScores: newStressScores,
          resultDevType,
          resultStressType,
        };
      }

      return {
        ...prev,
        currentIndex: prev.currentIndex + 1,
        stressTypeScores: newStressScores,
      };
    });
  }, []);

  // 재시작
  const resetTest = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    phase: state.phase,
    currentIndex: state.currentIndex,
    currentLikertQuestion,
    currentStressQuestion,
    shuffledStressOptions,
    totalProgress,
    totalQuestions: TEST_CONFIG.totalQuestionCount,
    resultDevType: state.resultDevType,
    resultStressType: state.resultStressType,
    devTypeScores,
    typeDistribution,
    startTest,
    submitLikertAnswer,
    submitStressAnswer,
    resetTest,
  };
}

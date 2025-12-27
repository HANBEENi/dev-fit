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

interface StressResponse {
  questionId: number;
  value: StressTypeId;
}

interface DiagnosisState {
  phase: DiagnosisPhase;
  currentIndex: number;
  likertResponses: LikertResponse[];
  stressResponses: StressResponse[];
  resultDevType: DevTypeId | null;
  resultStressType: StressTypeId | null;
}

const initialState: DiagnosisState = {
  phase: 'intro',
  currentIndex: 0,
  likertResponses: [],
  stressResponses: [],
  resultDevType: null,
  resultStressType: null,
};

// 유형별 점수 계산 (리커트 응답 기반)
function calculateDevTypeScores(responses: LikertResponse[]): DevTypeScores {
  const scores = initDevTypeScores();

  for (const response of responses) {
    const question = LIKERT_QUESTIONS.find((q) => q.id === response.questionId);
    if (!question) continue;

    const effectiveScore = question.reverse ? 6 - response.score : response.score;
    scores[question.targetType] += effectiveScore;
  }

  return scores;
}

// 스트레스 점수 계산
function calculateStressScores(responses: StressResponse[]): StressTypeScores {
  const scores = initStressTypeScores();

  for (const response of responses) {
    scores[response.value] += 1;
  }

  return scores;
}

// 정규화된 분포 계산
function calculateDistribution(scores: DevTypeScores): TypeDistribution[] {
  const maxPossiblePerType = 4 * 5;

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

// 최고 점수 유형 찾기
function getTopType(scores: DevTypeScores): DevTypeId {
  const entries = Object.entries(scores) as [DevTypeId, number][];
  const maxScore = Math.max(...entries.map(([_, s]) => s));
  const topTypes = entries.filter(([_, s]) => s === maxScore).map(([id]) => id);
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

  // 셔플된 리커트 질문 (컴포넌트 마운트 시 한 번만)
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

  // 현재 질문에 대한 이전 응답 (수정 시 표시용)
  const currentLikertAnswer = useMemo(() => {
    if (!currentLikertQuestion) return null;
    const response = state.likertResponses.find((r) => r.questionId === currentLikertQuestion.id);
    return response?.score ?? null;
  }, [currentLikertQuestion, state.likertResponses]);

  const currentStressAnswer = useMemo(() => {
    if (!currentStressQuestion) return null;
    const response = state.stressResponses.find((r) => r.questionId === currentStressQuestion.id);
    return response?.value ?? null;
  }, [currentStressQuestion, state.stressResponses]);

  // 이전으로 갈 수 있는지
  const canGoBack =
    (state.phase === 'likert' && state.currentIndex > 0) || state.phase === 'stress';

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
      stressResponses: [],
    });
  }, []);

  // 리커트 응답 제출
  const submitLikertAnswer = useCallback(
    (score: number) => {
      setState((prev) => {
        const question = shuffledLikertQuestions[prev.currentIndex];

        // 기존 응답 제거 후 새 응답 추가
        const filteredResponses = prev.likertResponses.filter((r) => r.questionId !== question.id);
        const newResponses = [...filteredResponses, { questionId: question.id, score }];

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
      const question = STRESS_QUESTIONS[prev.currentIndex];

      // 기존 응답 제거 후 새 응답 추가
      const filteredResponses = prev.stressResponses.filter((r) => r.questionId !== question.id);
      const newResponses = [...filteredResponses, { questionId: question.id, value }];

      const isLastStress = prev.currentIndex >= STRESS_QUESTIONS.length - 1;

      if (isLastStress) {
        const finalDevScores = calculateDevTypeScores(prev.likertResponses);
        const finalStressScores = calculateStressScores(newResponses);
        const resultDevType = getTopType(finalDevScores);
        const resultStressType = getTopStressType(finalStressScores);

        return {
          ...prev,
          phase: 'result',
          stressResponses: newResponses,
          resultDevType,
          resultStressType,
        };
      }

      return {
        ...prev,
        currentIndex: prev.currentIndex + 1,
        stressResponses: newResponses,
      };
    });
  }, []);

  // 이전 질문으로
  const goBack = useCallback(() => {
    setState((prev) => {
      // 스트레스 첫 문항에서 뒤로 가면 리커트 마지막으로
      if (prev.phase === 'stress' && prev.currentIndex === 0) {
        return {
          ...prev,
          phase: 'likert',
          currentIndex: LIKERT_QUESTION_COUNT - 1,
        };
      }

      // 그 외에는 인덱스만 감소
      if (prev.currentIndex > 0) {
        return {
          ...prev,
          currentIndex: prev.currentIndex - 1,
        };
      }

      return prev;
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
    currentLikertAnswer,
    currentStressAnswer,
    canGoBack,
    startTest,
    submitLikertAnswer,
    submitStressAnswer,
    goBack,
    resetTest,
  };
}

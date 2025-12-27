'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  DevTypeId,
  StressTypeId,
  DevTypeScores,
  StressTypeScores,
  TypeDistribution,
} from '@/types';
import { initDevTypeScores, initStressTypeScores, getTopType, shuffleArray } from '@/lib/utils';
import { BASIC_QUESTIONS, STRESS_QUESTIONS } from '@/data/questions';
import { TEST_CONFIG } from '@/constants';

export type DiagnosisPhase = 'intro' | 'basic' | 'stress' | 'result';

interface DiagnosisState {
  phase: DiagnosisPhase;
  currentIndex: number;
  devTypeScores: DevTypeScores;
  stressTypeScores: StressTypeScores;
  resultDevType: DevTypeId | null;
  resultStressType: StressTypeId | null;
}

const initialState: DiagnosisState = {
  phase: 'intro',
  currentIndex: 0,
  devTypeScores: initDevTypeScores(),
  stressTypeScores: initStressTypeScores(),
  resultDevType: null,
  resultStressType: null,
};

export function useDiagnosis() {
  const [state, setState] = useState<DiagnosisState>(initialState);

  // 현재 질문 정보
  const currentQuestions = state.phase === 'basic' ? BASIC_QUESTIONS : STRESS_QUESTIONS;
  const currentQuestion = currentQuestions[state.currentIndex];
  const shuffledOptions = currentQuestion ? shuffleArray(currentQuestion.options) : [];

  // 전체 진행률 계산
  const totalProgress =
    state.phase === 'basic'
      ? state.currentIndex + 1
      : TEST_CONFIG.basicQuestionCount + state.currentIndex + 1;

  // 유형 분포 계산 (정렬된 순위)
  const typeDistribution = useMemo((): TypeDistribution[] => {
    const scores = state.devTypeScores;
    const totalScore = Object.values(scores).reduce((sum, s) => sum + s, 0);

    const distribution = Object.entries(scores)
      .map(([id, score]) => ({
        id: id as DevTypeId,
        score,
        percentage: totalScore > 0 ? Math.round((score / totalScore) * 100) : 0,
        rank: 0,
      }))
      .sort((a, b) => b.score - a.score);

    // 순위 부여
    distribution.forEach((item, index) => {
      item.rank = index + 1;
    });

    return distribution;
  }, [state.devTypeScores]);

  // 테스트 시작
  const startTest = useCallback(() => {
    setState({
      ...initialState,
      phase: 'basic',
      devTypeScores: initDevTypeScores(),
      stressTypeScores: initStressTypeScores(),
    });
  }, []);

  // 답변 선택
  const selectAnswer = useCallback((value: string) => {
    setState((prev) => {
      const isBasicPhase = prev.phase === 'basic';
      const questions = isBasicPhase ? BASIC_QUESTIONS : STRESS_QUESTIONS;
      const isLastQuestion = prev.currentIndex >= questions.length - 1;

      // 점수 업데이트
      const newDevTypeScores = isBasicPhase
        ? { ...prev.devTypeScores, [value]: prev.devTypeScores[value as DevTypeId] + 1 }
        : prev.devTypeScores;

      const newStressTypeScores = !isBasicPhase
        ? { ...prev.stressTypeScores, [value]: prev.stressTypeScores[value as StressTypeId] + 1 }
        : prev.stressTypeScores;

      // 다음 단계 결정
      if (isLastQuestion) {
        if (isBasicPhase) {
          return {
            ...prev,
            phase: 'stress',
            currentIndex: 0,
            devTypeScores: newDevTypeScores,
          };
        } else {
          const resultDevType = getTopType(newDevTypeScores);
          const resultStressType = getTopType(newStressTypeScores);
          return {
            ...prev,
            phase: 'result',
            devTypeScores: newDevTypeScores,
            stressTypeScores: newStressTypeScores,
            resultDevType,
            resultStressType,
          };
        }
      }

      return {
        ...prev,
        currentIndex: prev.currentIndex + 1,
        devTypeScores: newDevTypeScores,
        stressTypeScores: newStressTypeScores,
      };
    });
  }, []);

  // 테스트 재시작
  const resetTest = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    phase: state.phase,
    currentIndex: state.currentIndex,
    currentQuestion,
    shuffledOptions,
    totalProgress,
    totalQuestions: TEST_CONFIG.totalQuestionCount,
    resultDevType: state.resultDevType,
    resultStressType: state.resultStressType,
    devTypeScores: state.devTypeScores,
    typeDistribution,
    startTest,
    selectAnswer,
    resetTest,
  };
}

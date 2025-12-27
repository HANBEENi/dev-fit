'use client';

import { useState, useCallback } from 'react';
import { DevTypeId, StressTypeId, DevTypeScores, StressTypeScores } from '../types';
import { initDevTypeScores, initStressTypeScores, getTopType, shuffleArray } from '../lib/utils';
import { BASIC_QUESTIONS, STRESS_QUESTIONS } from '../data/questions';
import { TEST_CONFIG } from '../constants';

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
          // 기본 질문 완료 → 스트레스 질문으로
          return {
            ...prev,
            phase: 'stress',
            currentIndex: 0,
            devTypeScores: newDevTypeScores,
          };
        } else {
          // 스트레스 질문 완료 → 결과
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

      // 다음 질문으로
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
    startTest,
    selectAnswer,
    resetTest,
  };
}

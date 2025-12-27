// 6가지 개발자 유형
export type DevTypeId =
  | 'structure'
  | 'executor'
  | 'collaborator'
  | 'analyst'
  | 'solver'
  | 'flexible';

// 6가지 스트레스 반응 유형
export type StressTypeId =
  | 'responsibility'
  | 'control'
  | 'silence'
  | 'direct'
  | 'rationalize'
  | 'connection';

// 인지편향 정보
export interface CognitiveBias {
  name: string;
  desc: string;
}

// 개발자 유형 상세 정보
export interface DevType {
  id: DevTypeId;
  name: string;
  subtitle: string;
  icon: string;
  desc: string;
  strength: string;
  weakness: string;
  growth: string;
  biases: CognitiveBias[];
  sitReview: string;
  sitMeeting: string;
  sitIncident: string;
  sitSprint: string;
  doList: string[];
  dontList: string[];
  safety: string;
  goodMatch: string[];
  cautionMatch: string[];
  teamWarn: string;
  quotes: string[];
}

// 스트레스 반응 유형 상세 정보
export interface StressType {
  id: StressTypeId;
  trigger: string;
  appraisal: string;
  behavior: string;
  recovery: string;
}

// 리커트 척도 질문 (유형 측정용)
export interface LikertQuestion {
  id: number;
  text: string;
  targetType: DevTypeId;
  reverse?: boolean; // 역채점 여부
}

// 시나리오 질문 (기존 방식, 스트레스용으로 유지)
export interface ScenarioQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    value: StressTypeId;
  }[];
}

// 통합 타입
export type Question = LikertQuestion | ScenarioQuestion;

// 리커트 응답
export interface LikertResponse {
  questionId: number;
  score: number; // 1-5
}

// 진단 결과 점수
export type DevTypeScores = Record<DevTypeId, number>;
export type StressTypeScores = Record<StressTypeId, number>;

// 팀 구성 (유형별 인원수)
export type TeamComposition = Partial<Record<DevTypeId, number>>;

// 시너지 매트릭스 항목
export interface SynergyItem {
  type1: DevTypeId;
  type2: DevTypeId;
  result: 'good' | 'bad';
  description: string;
}

// 팀 분석 결과
export interface TeamAnalysis {
  teamName: string;
  strength: string;
  weakness: string;
  warning: string;
  biasRisk: string;
  workflow: string;
  communication: string;
}

// 유형별 맞춤 조언
export interface TypeAdvice {
  icon: string;
  name: string;
  count: number;
  tips: Array<{
    text: string;
    level?: 'critical' | 'warning';
  }>;
}

// 결과 점수 분포
export interface TypeDistribution {
  id: DevTypeId;
  score: number;
  percentage: number;
  rank: number;
}

// 피드백
export interface FeedbackData {
  accuracy: number; // 1-5
  resultType: DevTypeId;
  stressType: StressTypeId;
  timestamp: number;
}

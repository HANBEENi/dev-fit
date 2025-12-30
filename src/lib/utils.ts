import { DevTypeId, StressTypeId, DevTypeScores, StressTypeScores } from '../types';

// 점수 초기화 - 12가지 유형
export function initDevTypeScores(): DevTypeScores {
  return {
    structure: 0,
    executor: 0,
    collaborator: 0,
    analyst: 0,
    solver: 0,
    flexible: 0,
    explorer: 0,
    craftsman: 0,
    mentor: 0,
    innovator: 0,
    guardian: 0,
    optimizer: 0,
  };
}

export function initStressTypeScores(): StressTypeScores {
  return {
    responsibility: 0,
    control: 0,
    silence: 0,
    direct: 0,
    rationalize: 0,
    connection: 0,
  };
}

// 최고 점수 유형 찾기
export function getTopType<T extends string>(scores: Record<T, number>): T {
  return Object.entries(scores).reduce((a, b) =>
    (a[1] as number) > (b[1] as number) ? a : b,
  )[0] as T;
}

// 배열 셔플 (Fisher-Yates)
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 팀 총 인원 계산
export function getTotalTeamSize(composition: Partial<Record<DevTypeId, number>>): number {
  return Object.values(composition).reduce((sum, count) => sum + (count || 0), 0);
}

// 클래스네임 병합 (간단 버전)
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

// 클립보드 복사
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// 공유 기능
export async function shareContent(data: {
  title: string;
  text: string;
  url?: string;
}): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share(data);
      return true;
    } catch {
      return false;
    }
  }
  return copyToClipboard(data.text);
}

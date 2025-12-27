'use client';

import { useState, useCallback, useMemo } from 'react';
import { DevTypeId, TeamComposition, TeamAnalysis, TypeAdvice } from '@/types';
import { DEV_TYPES, DEV_TYPE_LIST } from '@/data/types';
import { findSynergies } from '@/data/synergy';
import { getTotalTeamSize } from '@/lib/utils';
import { TEST_CONFIG } from '@/constants';

export type TeamPhase = 'select' | 'result';

export function useTeamAnalysis() {
  const [phase, setPhase] = useState<TeamPhase>('select');
  const [composition, setComposition] = useState<TeamComposition>({});

  const totalMembers = useMemo(() => getTotalTeamSize(composition), [composition]);
  const canAnalyze = totalMembers >= TEST_CONFIG.minTeamSize;

  // 인원 수 변경
  const updateCount = useCallback((typeId: DevTypeId, delta: number) => {
    setComposition((prev) => {
      const current = prev[typeId] || 0;
      const newValue = Math.max(0, Math.min(TEST_CONFIG.maxTypeCount, current + delta));

      if (newValue === 0) {
        const { [typeId]: _, ...rest } = prev;
        return rest;
      }

      return { ...prev, [typeId]: newValue };
    });
  }, []);

  // 분석 시작
  const analyze = useCallback(() => {
    if (canAnalyze) {
      setPhase('result');
    }
  }, [canAnalyze]);

  // 초기화
  const reset = useCallback(() => {
    setPhase('select');
    setComposition({});
  }, []);

  // 팀 분석 결과 생성
  const analysisResult = useMemo((): TeamAnalysis | null => {
    if (phase !== 'result') return null;
    return generateTeamAnalysis(composition);
  }, [phase, composition]);

  // 시너지 목록
  const synergies = useMemo(() => {
    if (phase !== 'result') return [];
    return findSynergies(composition);
  }, [phase, composition]);

  // 유형별 조언
  const adviceList = useMemo((): TypeAdvice[] => {
    if (phase !== 'result') return [];
    return generateAdviceList(composition);
  }, [phase, composition]);

  return {
    phase,
    composition,
    totalMembers,
    canAnalyze,
    analysisResult,
    synergies,
    adviceList,
    updateCount,
    analyze,
    reset,
  };
}

// 팀 분석 결과 생성
function generateTeamAnalysis(composition: TeamComposition): TeamAnalysis {
  const total = getTotalTeamSize(composition);
  const c = composition;

  const exec = c.executor || 0;
  const struct = c.structure || 0;
  const collab = c.collaborator || 0;
  const analyst = c.analyst || 0;
  const solver = c.solver || 0;
  const flex = c.flexible || 0;

  // 팀 이름 생성
  let teamName = '🚀 개발팀';
  if (exec >= 3) teamName = '⚡💥 초고속 기술부채 생산팀';
  else if (struct >= 3) teamName = '🏗️📐 영원한 설계 회의팀';
  else if (collab >= 3) teamName = '🤝💬 회의는 많고 결론은 없는 팀';
  else if (analyst >= 3) teamName = '🔍🐢 분석 마비 위험팀';
  else if (solver >= 3) teamName = '🔬🏝️ 각자 섬에서 코딩하는 팀';
  else if (exec >= 2 && struct >= 1) teamName = '⚡🏗️ 설계-실행 균형팀';
  else if (collab >= 2 && flex >= 1) teamName = '🤝🌊 완벽한 조율팀';
  else if (exec >= 1 && analyst >= 1) teamName = '🔥🔍 속도와 품질의 균형팀';
  else if (solver >= 2 && collab >= 1) teamName = '🔬🤝 집중력과 협업의 조화팀';
  else if (flex >= 2) teamName = '🌊✨ 유연한 적응팀';

  // 강점 분석
  const strengths: string[] = [];
  if (exec >= 2)
    strengths.push(
      `<strong>압도적 실행력</strong> - 돌진형 ${exec}명으로 빠른 프로토타이핑이 가능합니다`,
    );
  else if (exec >= 1) strengths.push('빠른 실행력과 MVP 제작 능력을 갖추고 있습니다');
  if (struct >= 2)
    strengths.push(
      `<strong>견고한 설계</strong> - 구조형 ${struct}명으로 아키텍처 안정성을 확보합니다`,
    );
  else if (struct >= 1) strengths.push('체계적인 설계와 장기적 관점을 가지고 있습니다');
  if (collab >= 2)
    strengths.push(`<strong>뛰어난 팀 시너지</strong> - 협업형 ${collab}명으로 소통이 원활합니다`);
  else if (collab >= 1) strengths.push('팀 분위기 조성과 의견 조율 능력이 있습니다');
  if (analyst >= 1) strengths.push('꼼꼼한 검토와 품질 보장 능력을 갖추고 있습니다');
  if (solver >= 1) strengths.push('복잡한 문제 해결 능력이 뛰어납니다');
  if (flex >= 1) strengths.push('변화에 유연한 대응이 가능합니다');

  const strength =
    strengths.length > 0 ? strengths.join('. ') + '.' : '팀원들의 다양성이 강점입니다.';

  // 약점 분석
  const weaknesses: string[] = [];
  if (exec >= 3 && struct === 0)
    weaknesses.push('🚨 <strong>심각:</strong> 설계 없이 달리다 기술 부채가 폭발할 수 있습니다');
  else if (exec >= 2 && struct === 0) weaknesses.push('설계 부재로 기술 부채가 누적될 수 있습니다');
  if (struct >= 3 && exec === 0)
    weaknesses.push('🚨 <strong>심각:</strong> 설계만 하다 구현이 시작되지 않을 수 있습니다');
  if (collab >= 3 && flex === 0) weaknesses.push('회의가 길어지고 결론이 나지 않을 수 있습니다');
  if (analyst >= 3)
    weaknesses.push('🚨 <strong>위험:</strong> 분석 마비로 의사결정이 지연될 수 있습니다');
  if (solver >= 3 && collab === 0)
    weaknesses.push('🚨 <strong>위험:</strong> 각자 몰입하다 팀 협업이 붕괴될 수 있습니다');
  if (collab === 0 && total >= 4)
    weaknesses.push('갈등 조정자 부재로 충돌 시 해결이 어려울 수 있습니다');
  if (flex === 0 && total >= 5) weaknesses.push('변화 대응력이 부족할 수 있습니다');

  const weakness =
    weaknesses.length > 0
      ? weaknesses.join('. ') + '.'
      : '뚜렷한 약점은 없지만 균형 유지가 중요합니다.';

  // 핵심 주의사항
  let warning: string;
  if (exec >= 4) {
    warning =
      '🚨 <strong>긴급:</strong> 기술 부채가 폭발합니다. 매주 금요일 강제 리팩토링 데이를 운영하세요. 코드 리뷰 없이 머지 금지!';
  } else if (struct >= 4) {
    warning =
      '🚨 <strong>긴급:</strong> 설계 회의가 끝나지 않습니다. "구현 시작일"을 먼저 정하고, 그 전까지만 설계하세요. 80% 완성도에서 시작!';
  } else if (solver >= 3 && collab === 0) {
    warning =
      '🚨 <strong>위험:</strong> 팀원들이 각자의 섬에서 코딩합니다. 매일 15분 강제 스탠드업 미팅을 도입하세요.';
  } else if (analyst >= 3) {
    warning =
      '⚠️ 분석이 끝나지 않습니다. "이 정도면 충분하다"의 기준을 미리 정하고, 데드라인을 설정하세요.';
  } else if (exec >= 2 && struct >= 2) {
    warning =
      '✅ 균형 잡힌 팀! 설계 단계(전체의 30%)와 구현 단계를 명확히 구분하면 최고의 효율을 낼 수 있습니다.';
  } else if (collab >= 2 && flex >= 1) {
    warning = '✅ 훌륭한 협업 팀! 조율자들이 갈등을 잘 중재할 겁니다. 의사결정 속도만 주의하세요.';
  } else {
    warning = '✅ 큰 충돌 위험은 낮습니다. 정기적인 회고와 소통을 유지하세요.';
  }

  // 인지편향 위험
  const biases: string[] = [];
  if (exec >= 2)
    biases.push(
      '<strong>계획 오류</strong> - 일정을 낙관적으로 잡는 경향이 있습니다. 예상 시간의 1.5배로 계획하세요.',
    );
  if (struct >= 2)
    biases.push(
      '<strong>매몰비용 오류</strong> - 기존 설계에 집착할 수 있습니다. 정기적으로 "이 설계가 최선인가?" 질문하세요.',
    );
  if (collab >= 2)
    biases.push(
      '<strong>집단사고</strong> - 다수 의견에 동조할 수 있습니다. "악마의 대변인" 역할을 정하세요.',
    );
  if (analyst >= 2)
    biases.push(
      '<strong>분석 마비</strong> - 결정을 미루는 경향이 있습니다. "70% 확신이면 실행" 규칙을 정하세요.',
    );
  if (solver >= 2)
    biases.push(
      '<strong>터널 시야</strong> - 다른 맥락을 놓칠 수 있습니다. 주 1회 전체 그림 리뷰 시간을 가지세요.',
    );

  const biasRisk =
    biases.length > 0 ? biases.join('<br><br>') : '특별히 높은 인지편향 위험은 없습니다.';

  // 추천 워크플로우
  let workflow: string;
  if (exec >= 3 && analyst >= 1) {
    workflow = `돌진형 ${exec}명이 빠르게 구현 → 분석형 ${analyst}명이 리뷰하는 흐름. 하지만 리뷰가 병목될 수 있으니, <strong>비동기 코드 리뷰 + 24시간 내 피드백</strong> 규칙을 정하세요.`;
  } else if (struct >= 2 && exec >= 1) {
    workflow = `구조형 ${struct}명이 설계(30%) → 돌진형 ${exec}명이 구현(70%). <strong>설계 80% 완성 시점에 구현 시작</strong>하고, 나머지는 진행하며 조정하세요.`;
  } else if (collab >= 2) {
    workflow = `협업형 ${collab}명이 스크럼 마스터/PM 역할. <strong>데일리 스탠드업 15분 + 주간 회고</strong>를 주도하게 하세요.`;
  } else if (solver >= 2 && collab >= 1) {
    workflow = `몰입형 ${solver}명에게 복잡한 태스크를 배정하고, 협업형이 진행 상황을 체크. <strong>2일마다 짧은 동기화 미팅</strong>을 가지세요.`;
  } else if (total >= 5) {
    workflow =
      '대규모 팀이므로 <strong>2주 스프린트</strong>를 추천합니다. 스프린트 플래닝 → 데일리 스탠드업 → 스프린트 리뷰/회고 사이클을 유지하세요.';
  } else {
    workflow =
      '<strong>주 단위 목표 설정</strong>과 매일 15분 체크인 미팅을 추천합니다. 애자일하게 조정하세요.';
  }

  // 커뮤니케이션 전략
  let communication: string;
  if (struct >= 2 || analyst >= 2) {
    communication =
      '<strong>문서 중심 커뮤니케이션</strong>이 맞습니다. ADR(Architecture Decision Record), 회의록을 철저히 작성하세요. 구두 결정은 24시간 내 문서화.';
  } else if (exec >= 2) {
    communication =
      '<strong>실시간 빠른 소통</strong>이 필요합니다. 슬랙 허들/디스코드 활용하되, 중요한 결정은 반드시 이슈로 기록하세요.';
  } else if (solver >= 2) {
    communication =
      '<strong>비동기 커뮤니케이션</strong>을 기본으로 하되, 정해진 시간에 동기화. 몰입 시간을 방해하지 않도록 "방해 금지" 시간대를 정하세요.';
  } else {
    communication = '상황에 맞는 유연한 커뮤니케이션. 급할 땐 실시간, 중요할 땐 문서로 남기세요.';
  }

  return {
    teamName,
    strength,
    weakness,
    warning,
    biasRisk,
    workflow,
    communication,
  };
}

// 유형별 조언 생성
function generateAdviceList(composition: TeamComposition): TypeAdvice[] {
  const advice: TypeAdvice[] = [];

  for (const [typeId, count] of Object.entries(composition) as [DevTypeId, number][]) {
    if (!count) continue;

    const type = DEV_TYPES[typeId];
    const tips: TypeAdvice['tips'] = [];

    // 같은 유형 다수 경고
    if (count >= 3) {
      tips.push({
        text: `🚨 ${type.name}가 ${count}명! 같은 유형끼리 모이면 약점이 극대화됩니다.`,
        level: 'critical',
      });
    } else if (count >= 2) {
      tips.push({
        text: `⚠️ ${type.name}가 ${count}명입니다. 서로의 약점을 증폭시킬 수 있으니 주의하세요.`,
        level: 'warning',
      });
    }

    // 유형별 맞춤 조언
    switch (typeId) {
      case 'structure':
        if (composition.executor) {
          tips.push({
            text: `돌진형 ${composition.executor}명에게 프로토타입을 먼저 맡기세요. 완벽한 설계를 기다리지 마세요.`,
          });
        } else {
          tips.push({
            text: '팀에 실행형이 없습니다. 80% 설계 후 직접 구현을 시작하거나 외부 인력을 고려하세요.',
            level: 'warning',
          });
        }
        tips.push({ text: '"충분히 좋은 설계"의 기준을 정하고, 그 시점에서 구현을 시작하세요.' });
        break;

      case 'executor':
        if (composition.analyst) {
          tips.push({
            text: `분석형 ${composition.analyst}명이 코드 리뷰를 해줄 겁니다. 피드백을 열린 마음으로 받아들이세요.`,
          });
        } else {
          tips.push({
            text: '팀에 검토형이 없습니다. 자동화 테스트와 CI/CD를 강화하세요.',
            level: 'warning',
          });
        }
        tips.push({
          text: '속도의 10%는 리팩토링에 투자하세요. 기술 부채는 이자와 함께 돌아옵니다.',
        });
        break;

      case 'collaborator':
        if (composition.solver) {
          tips.push({
            text: `몰입형 ${composition.solver}명이 고립되지 않게 정기적으로 체크인해주세요.`,
          });
        }
        tips.push({
          text: '당신은 팀의 접착제입니다. 갈등 조정, 분위기 조성, 회의 진행 역할을 맡으세요.',
        });
        if (count >= 2) {
          tips.push({ text: '회의 시간을 제한하고, 결론을 문서로 남기는 습관을 들이세요.' });
        }
        break;

      case 'analyst':
        if (composition.executor) {
          tips.push({ text: '돌진형의 브레이크 역할을 하되, 너무 자주 밟으면 갈등이 생깁니다.' });
        }
        tips.push({
          text: '"70% 확신이면 실행"하는 연습을 하세요. 완벽한 정보는 영원히 오지 않습니다.',
        });
        if (count >= 2) {
          tips.push({ text: '분석 데드라인을 먼저 정하고, 시간 내에 결론을 내세요.' });
        }
        break;

      case 'solver':
        if (composition.collaborator) {
          tips.push({
            text: `협업형 ${composition.collaborator}명이 진행 상황을 체크할 겁니다. 중간 공유에 협조해주세요.`,
          });
        } else {
          tips.push({
            text: '팀에 조율자가 없습니다. 본인이 먼저 진행 상황을 공유하는 습관을 들이세요.',
            level: 'warning',
          });
        }
        tips.push({
          text: '하루 한 번, 다른 팀원에게 진행 상황을 공유하세요. 고립은 팀을 위험하게 합니다.',
        });
        break;

      case 'flexible':
        tips.push({
          text: '당신의 유연함은 팀에 큰 자산입니다. 급한 일이 생기면 먼저 나서주세요.',
        });
        if ((composition.structure || 0) >= 2) {
          tips.push({
            text: '구조형과 충돌할 수 있습니다. 원칙을 존중하면서 유연성을 발휘하세요.',
          });
        }
        tips.push({ text: '핵심 원칙 2-3개는 지키면서 나머지에서 유연하게 대응하세요.' });
        break;
    }

    advice.push({
      icon: type.icon,
      name: type.name,
      count,
      tips,
    });
  }

  return advice;
}

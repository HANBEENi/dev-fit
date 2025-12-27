import { SynergyItem, DevTypeId } from '../types';

export const SYNERGY_MATRIX: SynergyItem[] = [
  {
    type1: 'structure',
    type2: 'executor',
    result: 'good',
    description: '설계 후 빠른 구현으로 균형 잡힌 개발',
  },
  {
    type1: 'structure',
    type2: 'analyst',
    result: 'bad',
    description: '분석과 설계가 길어져 실행 지연 위험',
  },
  {
    type1: 'executor',
    type2: 'analyst',
    result: 'good',
    description: '실행력과 검증력의 좋은 균형',
  },
  {
    type1: 'executor',
    type2: 'executor',
    result: 'bad',
    description: '기술 부채 폭발, 아무도 정리 안 함',
  },
  {
    type1: 'collaborator',
    type2: 'solver',
    result: 'good',
    description: '협업으로 고립 방지, 난제 해결력 상승',
  },
  {
    type1: 'collaborator',
    type2: 'collaborator',
    result: 'bad',
    description: '회의만 하고 결론이 안 남',
  },
  {
    type1: 'analyst',
    type2: 'flexible',
    result: 'good',
    description: '신중함과 유연함의 좋은 조합',
  },
  {
    type1: 'solver',
    type2: 'solver',
    result: 'bad',
    description: '각자 몰입하다 팀 협업 붕괴',
  },
  {
    type1: 'structure',
    type2: 'flexible',
    result: 'bad',
    description: '원칙 vs 유연성 충돌 가능',
  },
  {
    type1: 'flexible',
    type2: 'collaborator',
    result: 'good',
    description: '팀 조율과 적응력의 최강 조합',
  },
];

// 팀 구성에서 해당되는 시너지/충돌 찾기
export function findSynergies(composition: Partial<Record<DevTypeId, number>>): SynergyItem[] {
  const result: SynergyItem[] = [];
  const presentTypes = Object.keys(composition) as DevTypeId[];

  for (const item of SYNERGY_MATRIX) {
    const count1 = composition[item.type1] || 0;
    const count2 = composition[item.type2] || 0;

    // 같은 유형끼리의 시너지/충돌
    if (item.type1 === item.type2) {
      if (count1 >= 2) {
        result.push(item);
      }
    }
    // 다른 유형 간의 시너지/충돌
    else {
      if (count1 > 0 && count2 > 0) {
        result.push(item);
      }
    }
  }

  return result;
}

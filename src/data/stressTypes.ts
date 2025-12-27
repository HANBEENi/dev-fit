import { StressType, StressTypeId } from '../types';

export const STRESS_TYPES: Record<StressTypeId, StressType> = {
  responsibility: {
    id: 'responsibility',
    trigger: '역할이 불명확하거나 마감이 촉박한 상황에서 스트레스 반응이 시작됩니다.',
    appraisal:
      "이 상황을 '내가 해결해야 할 책임'으로 인식하고, 혼자 감당해야 한다는 압박감을 느낍니다.",
    behavior:
      '모든 일을 혼자 떠안으려 하고, 도움 요청을 회피하며, 과도하게 일하는 경향이 나타납니다.',
    recovery: "'같이 하자'는 명시적 제안과 역할의 명확한 분담이 있을 때 안정을 되찾습니다.",
  },
  control: {
    id: 'control',
    trigger: '불확실하거나 예측 불가능한 상황에서 스트레스 반응이 시작됩니다.',
    appraisal: "이 상황을 '통제할 수 없는 위협'으로 인식하고, 예측 가능성에 대한 갈망이 커집니다.",
    behavior: '규칙과 체크리스트를 강화하고, 더 세밀하게 관리하려는 경향이 나타납니다.',
    recovery: '함께 기준을 문서화하고, 예측 가능한 프로세스를 정립하면 안정을 되찾습니다.',
  },
  silence: {
    id: 'silence',
    trigger: '공개적인 비판이나 갈등 상황에서 스트레스 반응이 시작됩니다.',
    appraisal: "이 상황을 '나를 향한 공격'으로 인식하고, 자기 보호 본능이 작동합니다.",
    behavior: '말수가 줄어들고 소통을 회피하며, 거리를 두려는 경향이 나타납니다.',
    recovery: '1:1 비공개 대화로 안전한 공간을 만들어주면 마음을 열기 시작합니다.',
  },
  direct: {
    id: 'direct',
    trigger: '비효율적인 상황이나 속도 압박에서 스트레스 반응이 시작됩니다.',
    appraisal: "이 상황을 '불필요한 장애물'로 인식하고, 좌절감과 짜증이 커집니다.",
    behavior: '말이 거칠어지고 직설적이 되며, 공격적인 표현을 하게 됩니다.',
    recovery: '감정과 작업을 분리해서 대화하고, 비효율의 원인을 함께 해결하면 진정됩니다.',
  },
  rationalize: {
    id: 'rationalize',
    trigger: '자신의 결정이 평가받거나 실패로 인식되는 상황에서 스트레스 반응이 시작됩니다.',
    appraisal: "이 상황을 '내 능력에 대한 의심'으로 인식하고, 자존감이 위협받는다고 느낍니다.",
    behavior: '설명과 변명이 많아지고, 논리적으로 자신을 방어하려는 경향이 나타납니다.',
    recovery: '의도와 노력을 먼저 인정해준 후에 피드백하면 받아들이기 쉬워집니다.',
  },
  connection: {
    id: 'connection',
    trigger: '고립되거나 팀과 단절된 느낌을 받는 상황에서 스트레스 반응이 시작됩니다.',
    appraisal: "이 상황을 '관계의 상실'로 인식하고, 외로움과 불안감이 커집니다.",
    behavior: '대화를 시도하고 감정을 나누려 하며, 연결을 회복하려는 행동이 나타납니다.',
    recovery: '공감을 먼저 표현해주고, 이야기를 들어주면 안정을 되찾습니다.',
  },
};

export const STRESS_TYPE_LIST: StressTypeId[] = [
  'responsibility',
  'control',
  'silence',
  'direct',
  'rationalize',
  'connection',
];

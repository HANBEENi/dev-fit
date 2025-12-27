import { Question, DevTypeId, StressTypeId } from '../types';

// 행동 경향 질문 (12문항)
export const BASIC_QUESTIONS: Question[] = [
  {
    id: 1,
    text: '새로운 프로젝트를 시작하게 되었습니다. 이 상황에서 가장 먼저 하고 싶은 행동은 무엇인가요?',
    options: [
      { text: '전체 구조와 아키텍처를 먼저 설계합니다', value: 'structure' as DevTypeId },
      { text: '간단한 프로토타입을 빠르게 만들어봅니다', value: 'executor' as DevTypeId },
      { text: '팀원들과 모여서 아이디어 회의를 합니다', value: 'collaborator' as DevTypeId },
      { text: '기존 레퍼런스를 충분히 분석합니다', value: 'analyst' as DevTypeId },
    ],
  },
  {
    id: 2,
    text: '복잡한 버그를 발견했습니다. 이 상황에서 당신의 접근 방식은?',
    options: [
      { text: '혼자 깊이 파고들어 원인을 찾습니다', value: 'solver' as DevTypeId },
      { text: '빠르게 여러 해결책을 시도해봅니다', value: 'executor' as DevTypeId },
      { text: '동료에게 같이 보자고 요청합니다', value: 'collaborator' as DevTypeId },
      { text: '로그와 데이터를 꼼꼼히 분석합니다', value: 'analyst' as DevTypeId },
    ],
  },
  {
    id: 3,
    text: '요구사항이 갑자기 크게 바뀌었습니다. 이 상황에서 당신의 첫 반응은?',
    options: [
      { text: '변경이 구조에 미치는 영향을 먼저 분석합니다', value: 'structure' as DevTypeId },
      { text: '일단 바뀐 대로 빠르게 수정을 시작합니다', value: 'executor' as DevTypeId },
      { text: '상황에 맞게 유연하게 계획을 조정합니다', value: 'flexible' as DevTypeId },
      { text: '리스크를 점검하고 신중하게 대응합니다', value: 'analyst' as DevTypeId },
    ],
  },
  {
    id: 4,
    text: '코드 리뷰를 할 때 주로 어떤 점에 집중하시나요?',
    options: [
      { text: '전체 설계와 구조적 일관성을 봅니다', value: 'structure' as DevTypeId },
      { text: '일단 동작하는지, 실용적인지를 봅니다', value: 'executor' as DevTypeId },
      { text: '대화하며 함께 개선점을 찾습니다', value: 'collaborator' as DevTypeId },
      { text: '잠재적 버그나 예외 케이스를 찾습니다', value: 'analyst' as DevTypeId },
    ],
  },
  {
    id: 5,
    text: '가장 일이 잘 되는 환경은 어떤 곳인가요?',
    options: [
      { text: '혼자 깊이 집중할 수 있는 환경입니다', value: 'solver' as DevTypeId },
      { text: '빠르게 시도하고 피드백 받는 환경입니다', value: 'executor' as DevTypeId },
      { text: '동료와 함께 일하는 환경입니다', value: 'collaborator' as DevTypeId },
      { text: '안정적이고 예측 가능한 환경입니다', value: 'analyst' as DevTypeId },
    ],
  },
  {
    id: 6,
    text: '팀 회의에서 당신이 주로 맡게 되는 역할은?',
    options: [
      { text: '큰 그림과 방향성을 제시합니다', value: 'structure' as DevTypeId },
      { text: '빨리 결론 내고 실행하자고 합니다', value: 'executor' as DevTypeId },
      { text: '다양한 의견을 조율하고 정리합니다', value: 'collaborator' as DevTypeId },
      { text: '리스크와 고려사항을 짚어냅니다', value: 'analyst' as DevTypeId },
    ],
  },
  {
    id: 7,
    text: '새로운 기술을 배울 때 선호하는 방식은?',
    options: [
      { text: '체계적으로 기초부터 공부합니다', value: 'structure' as DevTypeId },
      { text: '일단 만들어보면서 배웁니다', value: 'executor' as DevTypeId },
      { text: '스터디나 동료와 함께 배웁니다', value: 'collaborator' as DevTypeId },
      { text: '깊이 파고들어 원리를 이해합니다', value: 'solver' as DevTypeId },
    ],
  },
  {
    id: 8,
    text: '팀에서 의견 충돌이 생겼을 때 당신의 대응 방식은?',
    options: [
      { text: '논리와 근거로 내 의견을 설명합니다', value: 'structure' as DevTypeId },
      { text: '빠르게 결론 내고 진행합니다', value: 'executor' as DevTypeId },
      { text: '중간 지점을 찾아 합의를 이끕니다', value: 'collaborator' as DevTypeId },
      { text: '상황을 보며 유연하게 대응합니다', value: 'flexible' as DevTypeId },
    ],
  },
  {
    id: 9,
    text: '문서화에 대한 당신의 생각은 어떤가요?',
    options: [
      { text: '중요합니다, 꼼꼼히 작성해야 합니다', value: 'structure' as DevTypeId },
      { text: '필요하면 하지만 코드가 우선입니다', value: 'executor' as DevTypeId },
      { text: '팀원을 위해 설명하듯 작성합니다', value: 'collaborator' as DevTypeId },
      { text: '상황에 따라 적절히 합니다', value: 'flexible' as DevTypeId },
    ],
  },
  {
    id: 10,
    text: '마감이 촉박한 상황에서 당신의 대응은?',
    options: [
      { text: '구조를 단순화해서라도 품질을 유지합니다', value: 'structure' as DevTypeId },
      { text: '일단 돌아가게 만들고 나중에 정리합니다', value: 'executor' as DevTypeId },
      { text: '팀원들과 역할을 나눠 함께 해결합니다', value: 'collaborator' as DevTypeId },
      { text: '집중해서 끝까지 파고듭니다', value: 'solver' as DevTypeId },
    ],
  },
  {
    id: 11,
    text: '어려운 결정을 내려야 할 때 당신은 어떻게 하나요?',
    options: [
      { text: '장기적 영향을 고려해 신중하게 결정합니다', value: 'structure' as DevTypeId },
      { text: '빠르게 결정하고 결과를 보며 조정합니다', value: 'executor' as DevTypeId },
      { text: '팀원들의 의견을 들어보고 결정합니다', value: 'collaborator' as DevTypeId },
      { text: '데이터와 근거를 충분히 모읍니다', value: 'analyst' as DevTypeId },
    ],
  },
  {
    id: 12,
    text: '가장 보람을 느끼는 순간은 언제인가요?',
    options: [
      { text: '깔끔하게 설계된 코드를 완성했을 때입니다', value: 'structure' as DevTypeId },
      { text: '빠르게 결과물을 만들어냈을 때입니다', value: 'executor' as DevTypeId },
      { text: '팀과 함께 문제를 해결했을 때입니다', value: 'collaborator' as DevTypeId },
      { text: '어려운 문제를 깊이 파고들어 해결했을 때입니다', value: 'solver' as DevTypeId },
    ],
  },
];

// 스트레스 반응 질문 (8문항)
export const STRESS_QUESTIONS: Question[] = [
  {
    id: 13,
    text: '마감이 촉박하고 일이 밀릴 때 당신은 어떻게 반응하나요?',
    options: [
      {
        text: '다른 사람에게 맡기기보다 내가 직접 처리하려고 합니다',
        value: 'responsibility' as StressTypeId,
      },
      {
        text: '할 일 목록을 정리하고 우선순위를 더 꼼꼼히 세웁니다',
        value: 'control' as StressTypeId,
      },
      { text: '평소보다 말이 줄고 조용히 집중하게 됩니다', value: 'silence' as StressTypeId },
      { text: '답답한 마음에 평소보다 말이 직설적으로 변합니다', value: 'direct' as StressTypeId },
    ],
  },
  {
    id: 14,
    text: '내 코드나 결정이 비판받았을 때 당신의 반응은?',
    options: [
      { text: '왜 그렇게 했는지 논리적으로 설명합니다', value: 'rationalize' as StressTypeId },
      { text: '누군가와 이야기하며 감정을 나누고 싶습니다', value: 'connection' as StressTypeId },
      { text: '더 열심히 해서 만회하려 합니다', value: 'responsibility' as StressTypeId },
      { text: '잠시 조용히 있고 싶습니다', value: 'silence' as StressTypeId },
    ],
  },
  {
    id: 15,
    text: '예상치 못한 장애나 문제가 터지면 당신은 어떻게 하나요?',
    options: [
      { text: '내가 책임지고 해결하려 합니다', value: 'responsibility' as StressTypeId },
      { text: '원인을 파악하고 절차대로 대응합니다', value: 'control' as StressTypeId },
      { text: '빠르게 해결하려다 말이 날카로워집니다', value: 'direct' as StressTypeId },
      { text: '왜 이렇게 됐는지 맥락을 먼저 설명합니다', value: 'rationalize' as StressTypeId },
    ],
  },
  {
    id: 16,
    text: '팀에서 갈등이 생기면 당신은 어떻게 대응하나요?',
    options: [
      { text: '관계 회복을 위해 먼저 대화를 시도합니다', value: 'connection' as StressTypeId },
      { text: '일단 거리를 두고 조용히 있습니다', value: 'silence' as StressTypeId },
      { text: '내 입장을 논리적으로 정리해서 설명합니다', value: 'rationalize' as StressTypeId },
      { text: '답답해서 직설적으로 말하게 됩니다', value: 'direct' as StressTypeId },
    ],
  },
  {
    id: 17,
    text: '번아웃이 오거나 지칠 때 당신은 어떻게 하나요?',
    options: [
      { text: '그래도 책임은 다하려고 버팁니다', value: 'responsibility' as StressTypeId },
      { text: '규칙적인 루틴으로 나를 잡으려 합니다', value: 'control' as StressTypeId },
      { text: '사람들과의 대화로 에너지를 얻습니다', value: 'connection' as StressTypeId },
      { text: '혼자만의 시간이 필요합니다', value: 'silence' as StressTypeId },
    ],
  },
  {
    id: 18,
    text: '역할이 불명확하거나 기대가 애매할 때 당신의 반응은?',
    options: [
      { text: '일단 내가 다 맡아서 처리합니다', value: 'responsibility' as StressTypeId },
      { text: '기준과 범위를 명확히 정하려 합니다', value: 'control' as StressTypeId },
      { text: '불만이 쌓이다 한번에 터뜨립니다', value: 'direct' as StressTypeId },
      { text: '상황이 정리될 때까지 조용히 기다립니다', value: 'silence' as StressTypeId },
    ],
  },
  {
    id: 19,
    text: '내 노력이 인정받지 못한다고 느낄 때 당신은?',
    options: [
      { text: '왜 이렇게 했는지 설명하고 싶습니다', value: 'rationalize' as StressTypeId },
      { text: '누군가에게 속상함을 이야기하고 싶습니다', value: 'connection' as StressTypeId },
      { text: '더 열심히 해서 증명하려 합니다', value: 'responsibility' as StressTypeId },
      { text: '말을 아끼고 거리를 둡니다', value: 'silence' as StressTypeId },
    ],
  },
  {
    id: 20,
    text: '일이 내 통제를 벗어날 때 당신은 어떻게 하나요?',
    options: [
      { text: '더 세밀하게 관리하려 합니다', value: 'control' as StressTypeId },
      { text: '직접적으로 문제를 지적합니다', value: 'direct' as StressTypeId },
      { text: '상황을 정리해서 이해시키려 합니다', value: 'rationalize' as StressTypeId },
      { text: '일단 물러나서 지켜봅니다', value: 'silence' as StressTypeId },
    ],
  },
];

// 전체 질문
export const ALL_QUESTIONS: Question[] = [...BASIC_QUESTIONS, ...STRESS_QUESTIONS];

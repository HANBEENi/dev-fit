import { LikertQuestion, ScenarioQuestion, DevTypeId, StressTypeId } from '@/types';

// ========================================
// 행동 경향 질문 (24문항, 리커트 척도)
// 유형당 4문항씩
// ========================================

export const LIKERT_QUESTIONS: LikertQuestion[] = [
  // 🏗️ 구조 설계자 (structure) - 4문항
  {
    id: 1,
    text: '새 프로젝트를 시작할 때, 코드를 작성하기 전에 전체 구조를 먼저 설계하는 편이다.',
    targetType: 'structure',
  },
  {
    id: 2,
    text: '기술 부채가 쌓이는 것이 신경 쓰여서, 당장 급하지 않아도 리팩토링을 미리 하는 편이다.',
    targetType: 'structure',
  },
  {
    id: 3,
    text: '코드 리뷰를 할 때 세부 구현보다 전체 설계와 아키텍처를 더 중요하게 본다.',
    targetType: 'structure',
  },
  {
    id: 4,
    text: '"일단 돌아가게 만들자"는 접근보다 "제대로 설계하고 시작하자"는 쪽에 가깝다.',
    targetType: 'structure',
  },

  // 🔥 돌진형 실행가 (executor) - 4문항
  {
    id: 5,
    text: '완벽하게 계획하기보다 일단 만들어보면서 방향을 잡는 게 더 효율적이라고 생각한다.',
    targetType: 'executor',
  },
  {
    id: 6,
    text: '회의에서 논의가 길어지면 "일단 해보고 판단하자"고 제안하는 편이다.',
    targetType: 'executor',
  },
  {
    id: 7,
    text: '프로토타입이나 MVP를 빠르게 만들어서 피드백 받는 방식을 선호한다.',
    targetType: 'executor',
  },
  {
    id: 8,
    text: '마감이 다가오면 완성도보다 일단 동작하는 결과물을 내는 것이 중요하다고 생각한다.',
    targetType: 'executor',
  },

  // 🤝 협업 촉진자 (collaborator) - 4문항
  {
    id: 9,
    text: '혼자 고민하기보다 동료와 함께 이야기하면서 해결책을 찾는 것을 선호한다.',
    targetType: 'collaborator',
  },
  {
    id: 10,
    text: '팀 내 의견이 다를 때, 중간 지점을 찾아 합의를 이끌어내는 역할을 자주 맡는다.',
    targetType: 'collaborator',
  },
  {
    id: 11,
    text: '코드 리뷰나 설계 논의를 할 때, 일방적으로 피드백하기보다 대화하며 함께 개선하는 방식을 선호한다.',
    targetType: 'collaborator',
  },
  {
    id: 12,
    text: '팀 분위기와 동료들의 컨디션에 신경을 많이 쓰는 편이다.',
    targetType: 'collaborator',
  },

  // 🔍 신중한 분석가 (analyst) - 4문항
  {
    id: 13,
    text: '결정을 내리기 전에 가능한 많은 정보와 데이터를 수집하려고 한다.',
    targetType: 'analyst',
  },
  {
    id: 14,
    text: '새로운 기술이나 방법을 도입할 때 충분한 검증 없이 적용하는 것이 불안하다.',
    targetType: 'analyst',
  },
  {
    id: 15,
    text: '코드를 작성할 때 예외 케이스와 엣지 케이스를 미리 꼼꼼히 고려하는 편이다.',
    targetType: 'analyst',
  },
  {
    id: 16,
    text: '"빠른 실패"보다 "신중한 성공"이 더 낫다고 생각한다.',
    targetType: 'analyst',
  },

  // 🔬 몰입형 해결사 (solver) - 4문항
  {
    id: 17,
    text: '복잡한 문제를 만나면 해결될 때까지 깊이 파고드는 것을 즐긴다.',
    targetType: 'solver',
  },
  {
    id: 18,
    text: '어려운 버그를 추적할 때 시간 가는 줄 모르고 몰입하는 경우가 많다.',
    targetType: 'solver',
  },
  {
    id: 19,
    text: '남들이 포기한 문제를 끝까지 파서 해결했을 때 큰 성취감을 느낀다.',
    targetType: 'solver',
  },
  {
    id: 20,
    text: '작업 중에는 방해받지 않고 혼자 집중하는 환경을 선호한다.',
    targetType: 'solver',
  },

  // 🌊 유연한 적응자 (flexible) - 4문항
  {
    id: 21,
    text: '계획이 바뀌어도 크게 스트레스 받지 않고 새로운 방향에 맞춰 조정하는 편이다.',
    targetType: 'flexible',
  },
  {
    id: 22,
    text: '정해진 방식보다 상황에 따라 유연하게 접근하는 것이 더 효과적이라고 생각한다.',
    targetType: 'flexible',
  },
  {
    id: 23,
    text: '팀에서 필요하다면 내 역할 범위 밖의 일도 기꺼이 맡는 편이다.',
    targetType: 'flexible',
  },
  {
    id: 24,
    text: '원칙을 고수하는 것보다 실용적인 해결책을 찾는 것이 더 중요하다고 생각한다.',
    targetType: 'flexible',
  },

  // 🧭 탐구형 실험가 (explorer) - 4문항
  {
    id: 25,
    text: '새로운 기술이나 라이브러리가 나오면 직접 써보고 싶어진다.',
    targetType: 'explorer',
  },
  {
    id: 26,
    text: '기술 블로그나 컨퍼런스를 통해 최신 트렌드를 파악하는 것을 즐긴다.',
    targetType: 'explorer',
  },
  {
    id: 27,
    text: '익숙한 방법보다 더 나은 새로운 방법이 있다면 적극적으로 시도해본다.',
    targetType: 'explorer',
  },
  {
    id: 28,
    text: '기존 코드베이스를 개선할 수 있는 새로운 도구나 패턴을 찾으면 팀에 제안하는 편이다.',
    targetType: 'explorer',
  },

  // 💎 완벽주의 장인 (craftsman) - 4문항
  {
    id: 29,
    text: '코드를 작성할 때 동작 여부뿐만 아니라 가독성과 구조도 중요하게 생각한다.',
    targetType: 'craftsman',
  },
  {
    id: 30,
    text: '완성도가 낮은 코드를 제출하는 것이 불편하고, 더 다듬고 싶어진다.',
    targetType: 'craftsman',
  },
  {
    id: 31,
    text: '코드 리뷰를 할 때 네이밍, 포맷팅 등 세세한 부분까지 신경 쓰는 편이다.',
    targetType: 'craftsman',
  },
  {
    id: 32,
    text: '작업 속도보다 결과물의 품질을 우선으로 생각한다.',
    targetType: 'craftsman',
  },

  // 🌟 성장 지원자 (mentor) - 4문항
  {
    id: 33,
    text: '동료가 막혔을 때 도와주는 것을 즐기고, 함께 성장하는 느낌이 좋다.',
    targetType: 'mentor',
  },
  {
    id: 34,
    text: '내가 알고 있는 지식이나 노하우를 팀원들과 공유하는 것을 좋아한다.',
    targetType: 'mentor',
  },
  {
    id: 35,
    text: '신입이나 주니어 개발자를 가르치고 성장하는 모습을 보면 뿌듯함을 느낀다.',
    targetType: 'mentor',
  },
  {
    id: 36,
    text: '코드 리뷰를 할 때 단순히 지적하기보다 이유를 설명하고 함께 배우려 한다.',
    targetType: 'mentor',
  },

  // 💡 창의적 혁신가 (innovator) - 4문항
  {
    id: 37,
    text: '문제를 만나면 기존 방식보다 전혀 다른 창의적인 해결법을 시도해보고 싶어진다.',
    targetType: 'innovator',
  },
  {
    id: 38,
    text: '"왜 항상 이렇게 했는가"라는 질문을 자주 하며, 더 나은 방법을 고민한다.',
    targetType: 'innovator',
  },
  {
    id: 39,
    text: '남들이 생각하지 못한 독창적인 아이디어를 내는 것을 즐긴다.',
    targetType: 'innovator',
  },
  {
    id: 40,
    text: '정형화된 틀보다 자유로운 발상으로 문제를 푸는 것을 선호한다.',
    targetType: 'innovator',
  },

  // 🛡️ 안정성 수호자 (guardian) - 4문항
  {
    id: 41,
    text: '새로운 기능을 추가할 때 기존 시스템에 미칠 영향을 먼저 걱정한다.',
    targetType: 'guardian',
  },
  {
    id: 42,
    text: '에러 처리, 예외 상황, 보안 등을 꼼꼼하게 챙기는 편이다.',
    targetType: 'guardian',
  },
  {
    id: 43,
    text: '빠른 배포보다 충분한 테스트와 검증을 거친 안정적인 배포를 선호한다.',
    targetType: 'guardian',
  },
  {
    id: 44,
    text: '장애가 발생하지 않도록 사전에 리스크를 파악하고 예방하는 것을 중요하게 생각한다.',
    targetType: 'guardian',
  },

  // ⚡ 효율 최적화자 (optimizer) - 4문항
  {
    id: 45,
    text: '코드가 동작하더라도 더 빠르고 효율적으로 만들 방법을 고민하게 된다.',
    targetType: 'optimizer',
  },
  {
    id: 46,
    text: '성능 프로파일링 결과나 메트릭을 보면서 개선점을 찾는 것을 좋아한다.',
    targetType: 'optimizer',
  },
  {
    id: 47,
    text: '불필요한 연산이나 리소스 낭비를 발견하면 최적화하고 싶어진다.',
    targetType: 'optimizer',
  },
  {
    id: 48,
    text: '알고리즘 복잡도나 성능 개선에 관심이 많고, 이를 위한 리팩토링을 즐긴다.',
    targetType: 'optimizer',
  },
];

// ========================================
// 스트레스 반응 질문 (8문항, 시나리오 방식 유지)
// ========================================

export const STRESS_QUESTIONS: ScenarioQuestion[] = [
  {
    id: 49,
    text: '마감이 촉박하고 일이 밀릴 때 당신은 어떻게 반응하나요?',
    options: [
      { text: '다른 사람에게 맡기기보다 내가 직접 처리하려고 합니다', value: 'responsibility' },
      { text: '할 일 목록을 정리하고 우선순위를 더 꼼꼼히 세웁니다', value: 'control' },
      { text: '평소보다 말이 줄고 조용히 집중하게 됩니다', value: 'silence' },
      { text: '답답한 마음에 평소보다 말이 직설적으로 변합니다', value: 'direct' },
    ],
  },
  {
    id: 50,
    text: '내 코드나 결정에 대해 부정적인 피드백을 받았을 때 당신은?',
    options: [
      { text: '왜 그런 선택을 했는지 배경을 설명하고 싶어집니다', value: 'rationalize' },
      { text: '믿을 수 있는 사람에게 이야기하며 마음을 정리합니다', value: 'connection' },
      { text: '더 잘해서 만회해야겠다는 생각이 먼저 듭니다', value: 'responsibility' },
      { text: '일단 혼자 생각을 정리할 시간이 필요합니다', value: 'silence' },
    ],
  },
  {
    id: 51,
    text: '예상치 못한 장애나 긴급 상황이 발생하면 당신은?',
    options: [
      { text: '내가 나서서 해결해야 한다는 책임감이 먼저 듭니다', value: 'responsibility' },
      { text: '상황을 파악하고 체계적인 순서로 대응하려 합니다', value: 'control' },
      { text: '빠르게 해결하고 싶은 마음에 말투가 급해집니다', value: 'direct' },
      { text: '왜 이런 일이 생겼는지 원인부터 파악하려 합니다', value: 'rationalize' },
    ],
  },
  {
    id: 52,
    text: '팀 내에서 의견 충돌이나 갈등이 생기면 당신은?',
    options: [
      { text: '관계가 틀어지지 않도록 먼저 대화를 시도합니다', value: 'connection' },
      { text: '상황이 정리될 때까지 한 발 물러서서 지켜봅니다', value: 'silence' },
      { text: '내 생각을 논리적으로 정리해서 전달하려 합니다', value: 'rationalize' },
      { text: '돌려 말하기보다 솔직하게 이야기하는 편입니다', value: 'direct' },
    ],
  },
  {
    id: 53,
    text: '업무가 과중하거나 지칠 때 당신은 어떻게 하나요?',
    options: [
      { text: '힘들어도 맡은 일은 끝까지 해내려고 합니다', value: 'responsibility' },
      { text: '생활 패턴을 유지하며 컨디션을 관리하려 합니다', value: 'control' },
      { text: '사람들과 이야기하면서 에너지를 충전합니다', value: 'connection' },
      { text: '혼자만의 시간을 가지며 재충전합니다', value: 'silence' },
    ],
  },
  {
    id: 54,
    text: '역할이 불명확하거나 기대하는 바가 애매할 때 당신은?',
    options: [
      { text: '일단 할 수 있는 것부터 내가 챙기게 됩니다', value: 'responsibility' },
      { text: '범위와 기준을 명확하게 정하고 싶어집니다', value: 'control' },
      { text: '불만이 쌓이면 어느 순간 직접적으로 표현하게 됩니다', value: 'direct' },
      { text: '상황이 정리될 때까지 조용히 기다리는 편입니다', value: 'silence' },
    ],
  },
  {
    id: 55,
    text: '열심히 했는데 성과가 인정받지 못한다고 느낄 때 당신은?',
    options: [
      { text: '어떤 과정으로 진행했는지 공유하고 싶어집니다', value: 'rationalize' },
      { text: '속상한 마음을 누군가에게 이야기하고 싶습니다', value: 'connection' },
      { text: '결과로 증명해야겠다는 생각에 더 몰두합니다', value: 'responsibility' },
      { text: '티 내지 않고 조용히 넘어가는 편입니다', value: 'silence' },
    ],
  },
  {
    id: 56,
    text: '상황이 내 예상대로 흘러가지 않을 때 당신은?',
    options: [
      { text: '계획을 더 세밀하게 수정하고 관리하려 합니다', value: 'control' },
      { text: '문제점을 바로 짚어서 이야기하는 편입니다', value: 'direct' },
      { text: '왜 이렇게 됐는지 상황을 분석하고 설명하려 합니다', value: 'rationalize' },
      { text: '일단 지켜보면서 상황을 파악하려 합니다', value: 'silence' },
    ],
  },
];

// 전체 문항 수
export const LIKERT_QUESTION_COUNT = LIKERT_QUESTIONS.length; // 48 (12가지 유형 × 4문항)
export const STRESS_QUESTION_COUNT = STRESS_QUESTIONS.length; // 8
export const TOTAL_QUESTION_COUNT = LIKERT_QUESTION_COUNT + STRESS_QUESTION_COUNT; // 56

// 색상 팔레트
export const COLORS = {
  bgDark: '#0f0a1f',
  bgCard: '#1a1330',
  bgInner: '#231a3d',
  accentPurple: '#a855f7',
  accentPink: '#ec4899',
  accentMint: '#00d4aa',
  accentBlue: '#3b82f6',
  accentOrange: '#f59e0b',
  accentRed: '#ef4444',
  accentCyan: '#06b6d4',
  textWhite: '#f0f0f5',
  textGray: '#b8b8c8',
  textMuted: '#7a7a8c',
} as const;

// 메타데이터
export const SITE_CONFIG = {
  name: 'DevFit',
  title: 'DevFit | 개발자 협업 성향 테스트',
  description: '20문항으로 알아보는 나의 개발 스타일과 팀 궁합. 당신은 어떤 타입의 개발자인가요?',
  url: 'https://devfit.io',
} as const;

// 테스트 설정
export const TEST_CONFIG = {
  likertQuestionCount: 24,
  stressQuestionCount: 8,
  totalQuestionCount: 32,
  minTeamSize: 2,
  maxTypeCount: 10,
  likertScale: {
    min: 1,
    max: 5,
    labels: ['전혀 아니다', '아니다', '보통이다', '그렇다', '매우 그렇다'],
  },
} as const;

// 외부 링크
export const EXTERNAL_LINKS = {
  feedback: '#',
  updateNote: '#',
  email: 'mailto:your@email.com',
} as const;

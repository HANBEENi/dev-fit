import Link from 'next/link';
import { Card, Badge, Button, Icon } from '../../components/common';

interface TestCardData {
  id: string;
  badge: string;
  badgeVariant: 'personal' | 'team';
  icon: string;
  title: string;
  hook: string;
  description: string;
  meta: Array<{
    icon: 'clock' | 'question' | 'user' | 'users' | 'clipboard';
    text: string;
  }>;
  href: string;
}

const testCards: TestCardData[] = [
  {
    id: 'diagnosis',
    badge: '👤 개인',
    badgeVariant: 'personal',
    icon: '🧬',
    title: '개발자 작업유형 테스트',
    hook: '"작업할 때 나는 어떤 스타일?"',
    description:
      '상황별 질문을 통해 나의 업무 스타일과 스트레스 대처 패턴을 진단합니다. 강점, 주의점, 인지편향까지 알려드려요.',
    meta: [
      { icon: 'clock', text: '약 3~5분' },
      { icon: 'question', text: '20문항' },
      { icon: 'user', text: '개인' },
    ],
    href: '/diagnosis',
  },
  {
    id: 'team',
    badge: '👥 팀',
    badgeVariant: 'team',
    icon: '🤝',
    title: '팀 궁합 분석기',
    hook: '"이 팀, 잘 굴러갈까?"',
    description:
      '팀원들의 유형을 입력하면 팀 시너지와 잠재적 충돌을 분석합니다. 추천 워크플로우와 주의점까지 알려드려요.',
    meta: [
      { icon: 'clock', text: '약 1~2분' },
      { icon: 'clipboard', text: '유형별 인원 선택' },
      { icon: 'users', text: '팀 궁합' },
    ],
    href: '/team',
  },
];

export default function TestSelector() {
  return (
    <section id='tests' className='py-24'>
      <div className='mx-auto max-w-5xl px-5'>
        {/* 헤더 */}
        <div className='mb-12 text-center'>
          <span className='mb-4 inline-block text-xs font-bold uppercase tracking-widest text-purple-400'>
            Choose Test
          </span>
          <h2 className='mb-3 text-3xl font-extrabold'>어떤 테스트를 해볼까요?</h2>
          <p className='text-gray-400'>목적에 맞는 테스트를 선택하세요</p>
        </div>

        {/* 테스트 카드 */}
        <div className='grid gap-6 md:grid-cols-2'>
          {testCards.map((card) => (
            <Card
              key={card.id}
              variant='interactive'
              padding='lg'
              className='group relative overflow-hidden'
            >
              {/* 상단 바 (호버 시 표시) */}
              <div className='absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 transition-opacity group-hover:opacity-100' />

              {/* 뱃지 */}
              <Badge variant={card.badgeVariant} className='mb-4'>
                {card.badge}
              </Badge>

              {/* 아이콘 */}
              <div className='mb-4 text-5xl'>{card.icon}</div>

              {/* 제목 */}
              <h3 className='mb-2 text-2xl font-extrabold'>{card.title}</h3>

              {/* 후킹 문구 */}
              <p className='mb-4 font-semibold text-purple-400'>{card.hook}</p>

              {/* 설명 */}
              <p className='mb-6 text-sm leading-relaxed text-gray-400'>{card.description}</p>

              {/* 메타 정보 */}
              <div className='mb-5 flex flex-wrap gap-4 border-t border-purple-500/20 pt-4'>
                {card.meta.map((item, index) => (
                  <div key={index} className='flex items-center gap-1.5 text-sm text-gray-500'>
                    <Icon name={item.icon} size={16} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* 버튼 */}
              <Link href={card.href}>
                <Button fullWidth icon={<Icon name='arrow-right' size={18} />}>
                  {card.id === 'diagnosis' ? '테스트 시작' : '분석 시작'} →
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

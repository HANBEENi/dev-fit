import { Card, Badge, Button } from '@/components/common';

interface DiagnosisIntroProps {
  onStart: () => void;
}

const features = [
  { icon: '🎯', title: '행동 경향', desc: '상황별 선호 패턴' },
  { icon: '⚠️', title: '인지편향', desc: '빠지기 쉬운 함정' },
  { icon: '🔥', title: '스트레스 대처', desc: '압박 시 반응 패턴' },
  { icon: '🤝', title: '상황별 가이드', desc: '코드리뷰, 회의, 장애대응' },
];

const theories = [
  'Lazarus 스트레스-대처 이론',
  '심리적 안전감 모델',
  '인지편향 연구',
  '팀 역학 이론',
];

export default function DiagnosisIntro({ onStart }: DiagnosisIntroProps) {
  return (
    <div className='mx-auto max-w-lg'>
      {/* 헤더 */}
      <div className='mb-8 text-center'>
        <Badge className='mb-4'>🧠 조직심리학 기반</Badge>
        <div className='mb-4 text-6xl'>🧬</div>
        <h1 className='mb-3 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-2xl font-black text-transparent'>
          개발자 협업 성향 진단
        </h1>
        <p className='text-gray-400'>
          나는 어떤 상황에서 어떤 행동을 선택할까?
          <br />
          20문항으로 알아보는 협업 패턴 분석
        </p>
      </div>

      {/* 특징 카드 */}
      <div className='mb-6 grid grid-cols-2 gap-3'>
        {features.map((feature) => (
          <Card key={feature.title} padding='sm' className='text-center'>
            <div className='mb-2 text-2xl'>{feature.icon}</div>
            <h3 className='mb-1 text-sm font-bold'>{feature.title}</h3>
            <p className='text-xs text-gray-500'>{feature.desc}</p>
          </Card>
        ))}
      </div>

      {/* 이론적 배경 */}
      <Card className='mb-6'>
        <h3 className='mb-3 text-sm font-bold text-purple-400'>📚 이론적 배경</h3>
        <div className='flex flex-wrap gap-2'>
          {theories.map((theory) => (
            <span key={theory} className='rounded bg-white/5 px-2 py-1 text-xs text-gray-400'>
              {theory}
            </span>
          ))}
        </div>
      </Card>

      {/* 시작 버튼 */}
      <Button fullWidth size='lg' onClick={onStart}>
        진단 시작하기 →
      </Button>
    </div>
  );
}

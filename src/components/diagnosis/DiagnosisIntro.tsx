import { useRouter } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';
import { Card, Badge, Button } from '@/components/common';
import { TEST_CONFIG } from '@/constants';
import { JobRole } from '@/types';

interface DiagnosisIntroProps {
  onStart: (role: JobRole) => void;
  selectedRole: JobRole | null;
  onRoleSelect: (role: JobRole) => void;
}

const features = [
  { icon: '🎯', title: '행동 경향', desc: '24문항 리커트 척도' },
  { icon: '⚠️', title: '인지편향', desc: '빠지기 쉬운 함정' },
  { icon: '🔥', title: '스트레스 대처', desc: '8문항 시나리오' },
  { icon: '🤝', title: '상황별 가이드', desc: '코드리뷰, 회의, 장애대응' },
];

const theories = [
  'Lazarus 스트레스-대처 이론',
  '심리적 안전감 모델',
  '인지편향 연구',
  '팀 역학 이론',
];

const roleOptions: Array<{
  role: JobRole;
  icon: string;
  name: string;
  desc: string;
}> = [
  { role: 'frontend', icon: '💻', name: 'Frontend', desc: '프론트엔드 개발자' },
  { role: 'backend', icon: '⚙️', name: 'Backend', desc: '백엔드 개발자' },
  { role: 'designer', icon: '🎨', name: 'Designer', desc: '디자이너' },
  { role: 'pm', icon: '📋', name: 'PM·기획자', desc: '기획·프로덕트 매니저' },
];

export default function DiagnosisIntro({
  onStart,
  selectedRole,
  onRoleSelect,
}: DiagnosisIntroProps) {
  const router = useRouter();
  const roleSelectionRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);

  // 페이지 로드 시 직무 선택 섹션으로 스크롤
  useEffect(() => {
    const timer = setTimeout(() => {
      if (roleSelectionRef.current) {
        roleSelectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer로 직무 선택 섹션이 보이는지 감지
  useEffect(() => {
    if (!roleSelectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 직무 선택 섹션이 화면에 보이지 않으면 힌트 표시, 보이면 숨김
        setShowScrollHint(!entry.isIntersecting);
        console.log('Intersection:', entry.isIntersecting, 'Show hint:', !entry.isIntersecting);
      },
      {
        threshold: 0.1, // 10% 이상 보이면 감지
        rootMargin: '0px',
      }
    );

    observer.observe(roleSelectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleStart = () => {
    if (!selectedRole) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onStart(selectedRole);
    // URL 파라미터로 직무를 전달하며 이동
    router.push(`/diagnosis/test?role=${selectedRole}`);
  };

  const scrollToRoleSelection = () => {
    roleSelectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <div className='relative'>
      {/* 화면 하단 고정 스크롤 힌트 */}
      {showScrollHint && (
        <div className='fixed bottom-8 left-0 right-0 z-50 flex justify-center animate-bounce pointer-events-none'>
          <button
            onClick={scrollToRoleSelection}
            className='pointer-events-auto flex flex-col items-center gap-1 rounded-full bg-purple-500/20 px-6 py-3 backdrop-blur-sm transition-all hover:bg-purple-500/30 hover:scale-105'
          >
            <span className='text-sm font-bold text-purple-300'>직무를 선택하세요</span>
            <svg
              className='h-5 w-5 text-purple-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </button>
        </div>
      )}

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
          <strong className='text-purple-400'>{TEST_CONFIG.totalQuestionCount}문항</strong>
          으로 알아보는 협업 패턴 분석
        </p>
      </div>

      {/* 소요 시간 */}
      <Card className='mb-4 border-purple-500/20 bg-purple-500/10 text-center'>
        <div className='flex items-center justify-center gap-6'>
          <div>
            <p className='text-2xl font-black text-purple-400'>{TEST_CONFIG.totalQuestionCount}</p>
            <p className='text-xs text-gray-500'>문항</p>
          </div>
          <div className='h-10 w-px bg-purple-500/30' />
          <div>
            <p className='text-2xl font-black text-purple-400'>8~10</p>
            <p className='text-xs text-gray-500'>분 소요</p>
          </div>
        </div>
      </Card>

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

      {/* 직무 선택 - 강조된 섹션 */}
      <div
        ref={roleSelectionRef}
        className='relative mb-6 overflow-hidden rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-purple-500/10 p-6'
      >
        {/* 배경 효과 */}
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.15),transparent_50%)]' />

        <div className='relative'>
          <div className='mb-4 text-center'>
            <div className='mb-2 text-5xl'>👤</div>
            <h3 className='mb-2 text-lg font-black text-white'>당신의 직무를 선택하세요</h3>
            <p className='text-sm text-purple-300'>선택한 직무에 맞춰 문항이 표시됩니다</p>
          </div>

          <div className='grid grid-cols-2 gap-3'>
            {roleOptions.map((option) => (
              <button
                key={option.role}
                onClick={() => onRoleSelect(option.role)}
                className={`group relative overflow-hidden rounded-xl border-2 p-5 text-center transition-all hover:scale-105 ${
                  selectedRole === option.role
                    ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20'
                    : 'border-white/20 bg-white/5 hover:border-purple-500/50 hover:bg-purple-500/10'
                }`}
              >
                {selectedRole === option.role && (
                  <div className='absolute right-2 top-2 text-purple-400'>✓</div>
                )}
                <div className='mb-2 text-4xl transition-transform group-hover:scale-110'>{option.icon}</div>
                <div className='mb-1 text-sm font-bold'>{option.name}</div>
                <div className='text-xs text-gray-400'>{option.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 시작 버튼 */}
      <Button fullWidth size='lg' onClick={handleStart} disabled={!selectedRole}>
        {selectedRole ? '진단 시작하기' : '직무를 먼저 선택하세요'}
      </Button>
      </div>
    </div>
  );
}

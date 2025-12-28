import Link from 'next/link';
import { Badge, Button, Icon } from '../../components/common';

export default function Hero() {
  return (
    <section className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-10 text-center'>
      {/* 배경 그라데이션 */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div
          className='absolute -left-1/2 -top-1/2 h-[200%] w-[200%] animate-float'
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* 콘텐츠 */}
      <div className='relative z-10 max-w-2xl'>
        <Badge variant='beta' className='mb-6'>
          🧪 Beta
        </Badge>

        <h1 className='mb-6 bg-gradient-to-r from-white via-purple-400 to-pink-400 bg-clip-text text-4xl font-black leading-tight text-transparent sm:text-5xl lg:text-6xl'>
          당신은 어떤 타입의
          <br />
          개발자인가요?
        </h1>

        <p className='mb-10 text-lg leading-relaxed text-gray-400 sm:text-xl'>
          혼자 깊이 파고드는 타입? 일단 만들고 보는 타입?
          <br />
          20문항으로 알아보는 나의 개발 스타일과 팀 궁합
        </p>

        <div className='flex flex-wrap justify-center gap-4'>
          <Link href='#tests' className='flex-1'>
            <Button variant='primary' size='lg' fullWidth>
              테스트 시작하기
            </Button>
          </Link>
          <Link href='#about' className='flex-1'>
            <Button variant='secondary' size='lg' fullWidth>
              이 테스트는 뭔가요?
            </Button>
          </Link>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <div className='absolute bottom-10 left-0 right-0 flex animate-bounce justify-center'>
        <div className='flex flex-col items-center gap-2 text-sm text-gray-500'>
          <span>아래로 스크롤</span>
          <Icon name='arrow-down' size={20} />
        </div>
      </div>
      {/* <div className='absolute bottom-10 left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center gap-2 text-sm text-gray-500'>
        <span>아래로 스크롤</span>
        <Icon name='arrow-down' size={20} />
      </div> */}
    </section>
  );
}

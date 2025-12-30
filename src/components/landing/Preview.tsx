import { Card } from '../../components/common';
import { DEV_TYPE_SIMPLE } from '../../data/types';

export default function Preview() {
  return (
    <section className='bg-[#1a1330] py-20'>
      <div className='mx-auto max-w-5xl px-5'>
        {/* 헤더 */}
        <div className='mb-12 text-center'>
          <span className='mb-4 inline-block text-xs font-bold tracking-widest text-purple-400 uppercase'>
            Result Preview
          </span>
          <h2 className='mb-3 text-3xl font-extrabold'>12가지 개발자 유형</h2>
          <p className='text-gray-400'>테스트를 완료하면 당신의 유형을 알려드려요</p>
        </div>

        {/* 유형 카드 그리드 */}
        <div className='mx-auto grid max-w-4xl grid-cols-3 gap-4 sm:grid-cols-6'>
          {DEV_TYPE_SIMPLE.map((type) => (
            <Card
              key={type.id}
              variant='interactive'
              padding='sm'
              className='bg-[#0f0a1f] text-center'
            >
              <div className='mb-2 text-3xl'>{type.icon}</div>
              <div className='text-sm font-semibold text-white'>{type.name}</div>
            </Card>
          ))}
        </div>

        {/* 팀 궁합 정보 */}
        <div className='mt-16 text-center'>
          <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500/10 to-pink-500/10 px-6 py-3 backdrop-blur-sm'>
            <span className='text-2xl'>🤝</span>
            <span className='text-lg font-bold text-transparent bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text'>
              팀 구성별 맞춤 궁합 분석
            </span>
          </div>
          <p className='text-sm text-gray-400'>
            12가지 유형의 조합에 따른 시너지와 주의점을 조직심리학 기반으로 분석합니다
          </p>
        </div>
      </div>
    </section>
  );
}

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
          <h2 className='mb-3 text-3xl font-extrabold'>6가지 개발자 유형</h2>
          <p className='text-gray-400'>테스트를 완료하면 당신의 유형을 알려드려요</p>
        </div>

        {/* 유형 카드 그리드 */}
        <div className='mx-auto grid max-w-3xl grid-cols-3 gap-4 sm:grid-cols-6'>
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
      </div>
    </section>
  );
}

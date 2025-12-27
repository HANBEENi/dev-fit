import { Card } from '../../components/common';

export default function About() {
  return (
    <section id='about' className='bg-[#1a1330] py-24'>
      <div className='mx-auto max-w-4xl px-5'>
        {/* 헤더 */}
        <div className='mb-12 text-center'>
          <span className='mb-4 inline-block text-xs font-bold tracking-widest text-purple-400 uppercase'>
            About
          </span>
          <h2 className='text-3xl font-extrabold'>이 테스트는요</h2>
        </div>

        {/* 콘텐츠 그리드 */}
        <div className='mb-8 grid gap-8 sm:grid-cols-2'>
          {/* 만든 이유 */}
          <div>
            <h3 className='mb-4 flex items-center gap-2 text-xl font-bold'>🎯 만든 이유</h3>
            <p className='leading-relaxed text-gray-400'>
              팀 프로젝트를 하다 보면 &quot;왜 저 사람은 저렇게 일할까?&quot; 싶을 때가 있죠. 서로의
              업무 스타일을 이해하면 불필요한 갈등을 줄이고 더 잘 협업할 수 있지 않을까 하는
              생각에서 시작했습니다.
            </p>
          </div>

          {/* 설계 기준 */}
          <div>
            <h3 className='mb-4 flex items-center gap-2 text-xl font-bold'>📐 설계 기준</h3>
            <p className='leading-relaxed text-gray-400'>
              조직심리학의 상황-행동 프레임, Lazarus의 스트레스-대처 이론, 인지편향 연구를
              참고했습니다. &quot;고정된 성격&quot;이 아닌 &quot;상황에서의 행동 경향&quot;에 초점을
              맞췄어요.
            </p>
          </div>
        </div>

        {/* 주의사항 */}
        <Card className='border-amber-500/30 bg-amber-500/10'>
          <div className='flex gap-4'>
            <div className='flex-shrink-0 text-2xl'>💡</div>
            <div className='leading-relaxed text-gray-400'>
              <strong className='text-amber-400'>
                이 테스트는 재미와 가벼운 자기 인식을 위한 콘텐츠입니다.
              </strong>
              <br />
              사람을 6가지 유형으로 완벽히 분류할 수는 없어요. &quot;이런 경향이 있을 수
              있구나&quot; 정도로 가볍게 참고해주세요. 결과를 맹신하거나 사람에게 라벨을 붙이는
              용도로 사용하지 마세요.
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

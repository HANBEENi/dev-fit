import { Card } from '@/components/common';
import { DevType, StressType } from '@/types';

interface ResultCardProps {
  devType: DevType;
  stressType: StressType;
}

export default function ResultCard({ devType, stressType }: ResultCardProps) {
  return (
    <div className='mx-auto max-w-lg space-y-4'>
      {/* 메인 결과 */}
      <Card className='text-center'>
        <div className='mb-4 text-6xl'>{devType.icon}</div>
        <h1 className='mb-1 text-2xl font-black'>{devType.name}</h1>
        <p className='mb-4 font-medium text-purple-400'>{devType.subtitle}</p>

        {/* 안내 문구 */}
        <div className='mb-4 rounded-lg bg-purple-500/10 p-3 text-sm text-gray-400'>
          ⚠️ 이 결과는 고정된 성격이 아닌,{' '}
          <strong className='text-white'>특정 상황에서 선호하는 행동 경향</strong>
          입니다.
          <br />
          상황과 맥락에 따라 다르게 행동할 수 있습니다.
        </div>

        {/* 설명 */}
        <p className='mb-6 text-sm leading-relaxed text-gray-400'>{devType.desc}</p>

        {/* 강점/주의점 */}
        <div className='mb-4 grid grid-cols-2 gap-3'>
          <div className='rounded-lg border-l-4 border-emerald-500 bg-[#231a3d] p-4'>
            <span className='mb-2 block text-xs font-bold text-emerald-400'>강점</span>
            <p className='text-sm text-gray-400'>{devType.strength}</p>
          </div>
          <div className='rounded-lg border-l-4 border-red-500 bg-[#231a3d] p-4'>
            <span className='mb-2 block text-xs font-bold text-red-400'>주의점</span>
            <p className='text-sm text-gray-400'>{devType.weakness}</p>
          </div>
        </div>

        {/* 성장 포인트 */}
        <div className='rounded-lg bg-[#231a3d] p-4'>
          <span className='mb-2 block text-xs font-bold text-amber-400'>💡 성장 포인트</span>
          <p className='text-sm text-gray-400'>{devType.growth}</p>
        </div>
      </Card>

      {/* 인지편향 */}
      <Card className='border-amber-500/20 bg-amber-500/5'>
        <h3 className='mb-4 text-base font-bold text-amber-400'>⚠️ 빠지기 쉬운 인지편향</h3>
        <div className='space-y-3'>
          {devType.biases.map((bias) => (
            <div key={bias.name} className='rounded-lg bg-black/20 p-3'>
              <h4 className='mb-1 text-sm font-bold text-amber-400'>{bias.name}</h4>
              <p className='text-xs leading-relaxed text-gray-400'>{bias.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* 스트레스 반응 */}
      <Card className='border-red-500/20 bg-red-500/5'>
        <h3 className='mb-4 text-base font-bold text-red-400'>🔥 스트레스 반응 패턴</h3>
        <div className='space-y-3'>
          {[
            { num: 1, label: '촉발 상황', value: stressType.trigger },
            { num: 2, label: '인지적 평가', value: stressType.appraisal },
            { num: 3, label: '대처 행동', value: stressType.behavior },
            { num: 4, label: '회복 조건', value: stressType.recovery },
          ].map((step) => (
            <div key={step.num} className='rounded-lg bg-black/20 p-3'>
              <div className='mb-1 flex items-center gap-2'>
                <span className='flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
                  {step.num}
                </span>
                <span className='text-xs text-gray-500'>{step.label}</span>
              </div>
              <p className='text-sm text-white'>{step.value}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* 상황별 협업 가이드 */}
      <Card>
        <h3 className='mb-4 text-base font-bold'>📍 상황별 협업 가이드</h3>
        <div className='space-y-3'>
          {[
            { icon: '💻', label: '코드리뷰', value: devType.sitReview },
            { icon: '🗣️', label: '회의', value: devType.sitMeeting },
            { icon: '🚨', label: '장애대응', value: devType.sitIncident },
            { icon: '📅', label: '스프린트', value: devType.sitSprint },
          ].map((item) => (
            <div key={item.label} className='rounded-lg bg-[#231a3d] p-3'>
              <div className='mb-1 flex items-center gap-2'>
                <span>{item.icon}</span>
                <span className='text-xs font-bold text-blue-400'>{item.label}</span>
              </div>
              <p className='text-sm text-gray-400'>{item.value}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* 협업할 때 */}
      <Card>
        <h3 className='mb-4 text-base font-bold'>👥 이 유형과 협업할 때</h3>
        <div className='space-y-3'>
          {/* Do */}
          <div className='rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4'>
            <h4 className='mb-3 text-sm font-bold text-emerald-400'>✅ 효과적인 접근</h4>
            <ul className='space-y-2'>
              {devType.doList.map((item, i) => (
                <li key={i} className='border-l-2 border-emerald-500/50 pl-3 text-sm text-gray-400'>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* Don't */}
          <div className='rounded-lg border border-red-500/20 bg-red-500/5 p-4'>
            <h4 className='mb-3 text-sm font-bold text-red-400'>❌ 피해야 할 접근</h4>
            <ul className='space-y-2'>
              {devType.dontList.map((item, i) => (
                <li key={i} className='border-l-2 border-red-500/50 pl-3 text-sm text-gray-400'>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* 심리적 안전감 */}
      <Card className='border-blue-500/20 bg-blue-500/5'>
        <h3 className='mb-3 text-base font-bold text-blue-400'>🛡️ 심리적 안전감 확보</h3>
        <p className='text-sm leading-relaxed text-gray-400'>{devType.safety}</p>
      </Card>

      {/* 협업 궁합 */}
      <Card>
        <h3 className='mb-4 text-base font-bold'>🔗 협업 궁합</h3>
        <div className='space-y-3'>
          <div className='flex items-start gap-3'>
            <span className='w-12 pt-1 text-xs text-gray-500'>시너지</span>
            <div className='flex flex-wrap gap-2'>
              {devType.goodMatch.map((match) => (
                <span
                  key={match}
                  className='rounded bg-emerald-500/15 px-2 py-1 text-xs text-emerald-400'
                >
                  {match}
                </span>
              ))}
            </div>
          </div>
          <div className='flex items-start gap-3'>
            <span className='w-12 pt-1 text-xs text-gray-500'>주의</span>
            <div className='flex flex-wrap gap-2'>
              {devType.cautionMatch.map((match) => (
                <span
                  key={match}
                  className='rounded bg-amber-500/15 px-2 py-1 text-xs text-amber-400'
                >
                  {match}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 팀 구성 참고 */}
        <div className='mt-4 rounded-lg border border-pink-500/20 bg-pink-500/10 p-3'>
          <h4 className='mb-1 text-xs font-bold text-pink-400'>⚡ 팀 구성 참고</h4>
          <p className='text-xs text-gray-400'>{devType.teamWarn}</p>
        </div>

        {/* 자주 하는 말 */}
        <div className='mt-4'>
          <h4 className='mb-2 text-xs text-gray-500'>💬 자주 하는 말</h4>
          <div className='flex flex-col gap-2'>
            {devType.quotes.map((quote, i) => (
              <span key={i} className='rounded-lg bg-purple-500/10 px-3 py-2 text-sm'>
                &quot;{quote}&quot;
              </span>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

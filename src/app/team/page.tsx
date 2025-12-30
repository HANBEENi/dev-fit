'use client';

import { useEffect } from 'react';
import { useTeamAnalysis } from '@/hooks/useTeamAnalysis';
import { DEV_TYPE_LIST, DEV_TYPES } from '@/data/types';
import { Card, Badge, Button } from '@/components/common';
import {
  TypeCounter,
  TeamComposition,
  AnalysisCard,
  SynergyMatrix,
  AdviceList,
} from '@/components/team';
import { trackTeamAnalysisStart, trackTeamAnalysisComplete } from '@/lib/gtag';

export default function TeamPage() {
  const {
    phase,
    composition,
    totalMembers,
    canAnalyze,
    analysisResult,
    synergies,
    adviceList,
    updateCount,
    analyze,
    reset,
  } = useTeamAnalysis();

  // GA 이벤트 추적
  useEffect(() => {
    if (phase === 'result' && analysisResult) {
      trackTeamAnalysisComplete(totalMembers, analysisResult.teamName);
    }
  }, [phase, totalMembers, analysisResult]);

  const handleAnalyze = () => {
    trackTeamAnalysisStart();
    analyze();
  };

  return (
    <div className='min-h-screen px-4 pb-16 pt-24'>
      <div className='mx-auto max-w-3xl'>
        {/* 선택 화면 */}
        {phase === 'select' && (
          <>
            {/* 헤더 */}
            <div className='mb-8 text-center'>
              <div className='mb-4 text-5xl'>🤝</div>
              <h1 className='mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-2xl font-black text-transparent'>
                개발 팀 궁합 분석기
              </h1>
              <p className='text-sm text-gray-400'>
                팀원들의 유형과 인원수를 선택하면
                <br />팀 시너지와 주의점을 분석해드립니다
              </p>
              <p className='mt-2 text-xs text-gray-600'>조직심리학 기반 협업 패턴 분석</p>
            </div>

            {/* 요약 바 (sticky) */}
            <div className='sticky top-16 z-10 mb-6 bg-[#0f0a1f] pb-4 pt-2'>
              <Card>
                <div className='mb-3 flex items-center justify-between'>
                  <div className='text-lg font-bold'>
                    총 팀원: <span className='text-purple-400'>{totalMembers}</span>명
                  </div>
                  <Button size='sm' disabled={!canAnalyze} onClick={handleAnalyze}>
                    ✨ 분석하기
                  </Button>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {totalMembers === 0 ? (
                    <span className='text-sm text-gray-500'>아래에서 팀원 유형을 선택하세요</span>
                  ) : (
                    Object.entries(composition).map(([typeId, count]) => {
                      if (!count) return null;
                      const type = DEV_TYPES[typeId as keyof typeof DEV_TYPES];
                      if (!type) return null;
                      return (
                        <Badge key={typeId} variant='default'>
                          {type.name} × {count}
                        </Badge>
                      );
                    })
                  )}
                </div>
              </Card>
            </div>

            {/* 유형 그리드 */}
            <div className='mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3'>
              {DEV_TYPE_LIST.map((typeId) => (
                <TypeCounter
                  key={typeId}
                  typeId={typeId}
                  count={composition[typeId] || 0}
                  onIncrement={() => updateCount(typeId, 1)}
                  onDecrement={() => updateCount(typeId, -1)}
                />
              ))}
            </div>

            {/* 팁 */}
            <div className='space-y-1 text-center text-sm text-gray-500'>
              <p>💡 팀원들이 각자 진단을 받고 결과를 모아서 입력하세요</p>
              <p>🔥 같은 유형이 3명 이상이면 특별 경고가 나옵니다!</p>
            </div>
          </>
        )}

        {/* 결과 화면 */}
        {phase === 'result' && analysisResult && (
          <>
            {/* 헤더 */}
            <div className='mb-6 text-center'>
              <h1 className='mb-2 text-2xl font-black'>{analysisResult.teamName}</h1>
              <p className='text-gray-400'>총 {totalMembers}명의 팀 분석 결과</p>
            </div>

            {/* 팀 구성 */}
            <TeamComposition composition={composition} />

            {/* 분석 카드들 */}
            <AnalysisCard
              type='strength'
              icon='💪'
              title='팀의 강점'
              content={analysisResult.strength}
            />
            <AnalysisCard
              type='weakness'
              icon='⚠️'
              title='팀의 약점'
              content={analysisResult.weakness}
            />
            <AnalysisCard
              type='warning'
              icon='🚨'
              title='핵심 주의사항'
              content={analysisResult.warning}
            />
            <AnalysisCard
              type='bias'
              icon='🧠'
              title='팀 전체 인지편향 위험'
              content={analysisResult.biasRisk}
            />
            <AnalysisCard
              type='workflow'
              icon='🔄'
              title='추천 워크플로우'
              content={analysisResult.workflow}
            />
            <AnalysisCard
              type='comm'
              icon='💬'
              title='커뮤니케이션 전략'
              content={analysisResult.communication}
            />

            {/* 시너지 매트릭스 */}
            <SynergyMatrix synergies={synergies} />

            {/* 유형별 조언 */}
            <AdviceList adviceList={adviceList} />

            {/* 버튼 */}
            <Button fullWidth size='lg' onClick={reset}>
              새로운 팀 분석하기
            </Button>

            {/* 팁 */}
            <div className='mt-6 space-y-1 text-center text-xs text-gray-500'>
              <p>💡 결과를 스크린샷으로 저장해서 팀원들과 공유하세요!</p>
              <p>📊 이 분석은 팀의 협업 패턴을 예측한 것으로, 실제와 다를 수 있습니다</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

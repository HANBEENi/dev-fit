import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

const TYPE_DATA: Record<string, { icon: string; name: string; subtitle: string }> = {
  structure: { icon: '🏗️', name: '구조 설계자', subtitle: '큰 그림을 먼저 그립니다' },
  executor: { icon: '🔥', name: '돌진형 실행가', subtitle: '일단 만들어보면서 답을 찾습니다' },
  collaborator: { icon: '🤝', name: '협업 촉진자', subtitle: '함께할 때 더 좋은 답이 나옵니다' },
  analyst: { icon: '🔍', name: '신중한 분석가', subtitle: '충분히 검토한 후에 움직입니다' },
  solver: { icon: '🔬', name: '몰입형 해결사', subtitle: '깊이 파고들어 답을 찾습니다' },
  flexible: { icon: '🌊', name: '유연한 적응자', subtitle: '상황에 맞게 유연하게 대응합니다' },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'structure';
  const typeData = TYPE_DATA[type] || TYPE_DATA.structure;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1330 0%, #0f0a1f 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* 배경 장식 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(ellipse at 20% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
          }}
        />

        {/* 콘텐츠 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          {/* 아이콘 */}
          <div style={{ fontSize: '120px', marginBottom: '30px' }}>{typeData.icon}</div>

          {/* 타이틀 */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: 900,
              color: 'white',
              marginBottom: '20px',
            }}
          >
            {typeData.name}
          </div>

          {/* 서브타이틀 */}
          <div
            style={{
              fontSize: '36px',
              color: '#c084fc',
              marginBottom: '60px',
            }}
          >
            {typeData.subtitle}
          </div>

          {/* 브랜드 */}
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              background: 'linear-gradient(to right, #c084fc, #f472b6)',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            DevFit 개발자 성향 진단
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

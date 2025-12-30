import { Metadata } from 'next';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ share?: string }>;
}): Promise<Metadata> {
  const typeMap: Record<string, { name: string; subtitle: string }> = {
    structure: { name: '구조 설계자', subtitle: '큰 그림을 먼저 그립니다' },
    executor: { name: '돌진형 실행가', subtitle: '일단 만들어보면서 답을 찾습니다' },
    collaborator: { name: '협업 촉진자', subtitle: '함께할 때 더 좋은 답이 나옵니다' },
    analyst: { name: '신중한 분석가', subtitle: '충분히 검토한 후에 움직입니다' },
    solver: { name: '몰입형 해결사', subtitle: '깊이 파고들어 답을 찾습니다' },
    flexible: { name: '유연한 적응자', subtitle: '상황에 맞게 유연하게 대응합니다' },
  };

  const params = await searchParams;
  const shareType = params?.share;
  const typeData = shareType && typeMap[shareType] ? typeMap[shareType] : null;

  if (typeData) {
    const ogImageUrl = `/api/og?type=${shareType}`;

    return {
      title: `${typeData.name} - DevFit 개발자 성향 진단`,
      description: `나의 개발자 협업 성향: ${typeData.name}. ${typeData.subtitle}`,
      openGraph: {
        title: `${typeData.name} - DevFit`,
        description: typeData.subtitle,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: `${typeData.name} - DevFit`,
          },
        ],
        type: 'website',
        locale: 'ko_KR',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${typeData.name} - DevFit`,
        description: typeData.subtitle,
        images: [ogImageUrl],
      },
    };
  }

  return {
    title: '개발자 협업 성향 진단 - DevFit',
    description: '나의 개발 스타일과 협업 패턴을 진단하세요',
    openGraph: {
      title: '개발자 협업 성향 진단 - DevFit',
      description: '나의 개발 스타일과 협업 패턴을 진단하세요',
      images: [
        {
          url: '/api/og',
          width: 1200,
          height: 630,
        },
      ],
      type: 'website',
      locale: 'ko_KR',
    },
  };
}

export default function DiagnosisLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

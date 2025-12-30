'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Button } from '@/components/common';
import { DevType, TypeDistribution } from '@/types';
import { shareContent, copyToClipboard } from '@/lib/utils';
import { trackShare } from '@/lib/gtag';
import ResultImageCard from './ResultImageCard';

interface ResultActionsProps {
  devType: DevType;
  distribution: TypeDistribution[];
  onRestart: () => void;
}

export default function ResultActions({ devType, distribution, onRestart }: ResultActionsProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleShare = async () => {
    // 현재 사이트 URL
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://devfit.vercel.app';
    const shareUrl = `${siteUrl}/diagnosis?share=${devType.id}`;

    const text = `🧬 나의 개발자 협업 성향

${devType.icon} ${devType.name}
"${devType.subtitle}"

${devType.desc.slice(0, 80)}...

👉 나도 테스트하기: ${shareUrl}

#DevFit #개발자유형진단`;

    const success = await shareContent({
      title: `DevFit - ${devType.name}`,
      text,
      url: shareUrl,
    });

    if (success) {
      trackShare('share_api', 'diagnosis_result');
    } else {
      await copyToClipboard(text);
      alert('결과가 클립보드에 복사되었습니다!');
      trackShare('clipboard', 'diagnosis_result');
    }
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current || isGenerating) return;

    setIsGenerating(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0f0a1f',
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const link = document.createElement('a');
      link.download = `devfit-${devType.id}-result.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      trackShare('image_download', 'diagnosis_result');
    } catch (error) {
      console.error('이미지 생성 실패:', error);
      alert('이미지 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* 숨겨진 이미지 카드 (캡처용) */}
      <div className='fixed -left-[9999px] top-0'>
        <ResultImageCard ref={cardRef} devType={devType} distribution={distribution} />
      </div>

      {/* 버튼들 */}
      <div className='mx-auto mt-6 max-w-lg space-y-3'>
        <Button fullWidth size='lg' onClick={handleDownloadImage} disabled={isGenerating}>
          {isGenerating ? '이미지 생성 중...' : '📷 결과 이미지 저장'}
        </Button>
        <Button fullWidth size='lg' variant='secondary' onClick={handleShare}>
          📤 결과 공유하기
        </Button>
        <Button fullWidth size='lg' variant='ghost' onClick={onRestart}>
          🔄 다시 진단하기
        </Button>
      </div>
    </>
  );
}

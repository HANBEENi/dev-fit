'use client';

import { Button } from '@/components/common';
import { DevType } from '@/types';
import { shareContent, copyToClipboard } from '@/lib/utils';
import { trackShare } from '@/lib/gtag';

interface ResultActionsProps {
  devType: DevType;
  onRestart: () => void;
}

export default function ResultActions({ devType, onRestart }: ResultActionsProps) {
  const handleShare = async () => {
    const text = `🧬 나의 개발자 협업 성향

${devType.icon} ${devType.name}
"${devType.subtitle}"

${devType.desc.slice(0, 80)}...

#DevFit #개발자유형진단`;

    const success = await shareContent({
      title: 'DevFit - 개발자 협업 성향 진단',
      text,
    });

    if (success) {
      trackShare('share_api', 'diagnosis_result');
    } else {
      await copyToClipboard(text);
      alert('결과가 클립보드에 복사되었습니다!');
      trackShare('clipboard', 'diagnosis_result');
    }
  };

  return (
    <div className='mx-auto mt-6 max-w-lg space-y-3'>
      <Button fullWidth size='lg' onClick={onRestart}>
        다시 진단하기
      </Button>
      <Button fullWidth size='lg' variant='secondary' onClick={handleShare}>
        결과 공유하기
      </Button>
    </div>
  );
}

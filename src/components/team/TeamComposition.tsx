import { TeamComposition as TeamCompositionType } from '@/types';
import { DEV_TYPES } from '@/data/types';
import { Card } from '@/components/common';

interface TeamCompositionProps {
  composition: TeamCompositionType;
}

export default function TeamComposition({ composition }: TeamCompositionProps) {
  const entries = Object.entries(composition).filter(([_, count]) => count > 0);

  if (entries.length === 0) return null;

  return (
    <Card className='mb-5'>
      <h3 className='mb-4 text-center text-sm font-bold'>👥 팀 구성</h3>
      <div className='flex flex-wrap justify-center gap-3'>
        {entries.map(([typeId, count]) => {
          const type = DEV_TYPES[typeId as keyof typeof DEV_TYPES];
          return (
            <div
              key={typeId}
              className='min-w-[100px] rounded-xl bg-[#231a3d] px-4 py-3 text-center'
            >
              <div className='mb-1 text-2xl'>{type.icon}</div>
              <div className='mb-1 text-xs text-gray-400'>{type.name}</div>
              <div className='text-lg font-black text-purple-400'>{count}명</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

import { DevTypeId } from '@/types';
import { DEV_TYPES } from '@/data/types';
import { cn } from '@/lib/utils';

interface TypeCounterProps {
  typeId: DevTypeId;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function TypeCounter({ typeId, count, onIncrement, onDecrement }: TypeCounterProps) {
  const type = DEV_TYPES[typeId];
  const isSelected = count > 0;

  return (
    <div
      className={cn(
        'rounded-2xl border-2 p-4 text-center transition-all',
        isSelected ? 'border-purple-500 bg-purple-500/10' : 'border-purple-500/20 bg-[#1a1330]',
      )}
    >
      <div className='mb-2 text-4xl'>{type.icon}</div>
      <div className='mb-3 text-sm font-bold'>{type.name}</div>

      <div className='flex items-center justify-center gap-3'>
        <button
          onClick={onDecrement}
          disabled={count === 0}
          className={cn(
            'h-9 w-9 rounded-full text-lg font-bold transition-all',
            count === 0
              ? 'cursor-not-allowed bg-[#231a3d] text-gray-600'
              : 'bg-[#231a3d] text-gray-400 hover:bg-red-500 hover:text-white',
          )}
        >
          −
        </button>

        <span className='min-w-[2rem] text-xl font-black'>{count}</span>

        <button
          onClick={onIncrement}
          className='h-9 w-9 rounded-full bg-purple-500 text-lg font-bold text-white transition-all hover:bg-pink-500'
        >
          +
        </button>
      </div>
    </div>
  );
}

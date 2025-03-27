import EmotionBadge from '@/components/EmotionBadge';
import { EMOTIONS } from '@/constants';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

interface EmotionFilterProps {
  selectedEmotion: string | null;
  onEmotionClick: (emotion: string) => void;
}

const EmotionFilter = ({ selectedEmotion, onEmotionClick }: EmotionFilterProps) => {
  return (
    <div className="w-fit h-fit grid grid-cols-4 gap-y-3 gap-x-5">
      {EMOTIONS.map((emotion) => (
        <EmotionBadge
          key={emotion.key}
          size="large"
          emotion={emotion.key}
          isClickable={true}
          onClick={onEmotionClick}
          className={twMerge(
            'transition-opacity duration-100 hover:opacity-70',
            selectedEmotion && selectedEmotion !== emotion.key ? 'opacity-40' : 'opacity-100',
          )}
        />
      ))}
    </div>
  );
};

export default memo(EmotionFilter);

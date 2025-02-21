import { EMOTIONS } from '@/constants';
import { twMerge } from 'tailwind-merge';

interface EmotionBadgeProps {
  size: 'small' | 'large';
  emotion: string;
  isClickable?: boolean; // 클릭 가능 여부
  onClick?: (emotion: string) => void;
  className?: string;
}

function EmotionBadge({
  size,
  emotion,
  isClickable = false,
  onClick,
  className,
}: EmotionBadgeProps) {
  // 사이즈별 클래스
  const sizeClass = {
    small: 'w-[30px] h-[18px] text-[10px] font-bold',
    large: 'w-[50px] h-[30px] caption-b',
  };

  // emotion에 해당하는 색상 찾기
  const emotionData = EMOTIONS.find((e) => e.key === emotion);

  return (
    <div
      className={twMerge(
        'flex items-center justify-center rounded-[50px]',
        sizeClass[size],
        emotionData?.bgColor,
        emotionData?.textColor,
        isClickable && 'cursor-pointer', // 클릭 가능할 때만 커서 변경
        className,
      )}
      onClick={isClickable && onClick ? () => onClick(emotion) : undefined} // 클릭 가능할 때만 onClick 이벤트 등록
    >
      {emotionData?.label}
    </div>
  );
}

export default EmotionBadge;

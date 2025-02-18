import { EMOTIONS } from "@/constants";
import { twMerge } from "tailwind-merge";

interface EmotionBadgeProps {
  size: "small" | "large";
  emotion: string;
}

function EmotionBadge({ size, emotion }: EmotionBadgeProps) {
  // 사이즈별 클래스
  const sizeClass = {
    small: "w-[30px] h-[18px] text-[10px] font-bold ",
    large: "w-[50px] h-[30px] caption-b",
  };

  // emotion에 해당하는 색상 찾기
  const emotionData = EMOTIONS.find((e) => e.key === emotion);

  return (
    <div
      className={twMerge(
        "flex items-center justify-center rounded-[50px]",
        sizeClass[size],
        emotionData?.bgColor,
        emotionData?.textColor
      )}
    >
      {emotionData?.label}
    </div>
  );
}

export default EmotionBadge;

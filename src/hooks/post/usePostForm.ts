import { useCallback, useState } from 'react';

export default function usePostForm() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null); // 선택된 감정
  const [comment, setComment] = useState<string>(''); // 코멘트

  const onEmotionClick = useCallback((emotion: string) => {
    setSelectedEmotion((prev) => (prev === emotion ? null : emotion));
  }, []);

  const onChangeComment = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  }, []);

  // 기록 완료 조건 확인
  const isFilled = selectedEmotion && comment.trim().length > 0;

  return {
    selectedEmotion,
    setSelectedEmotion,
    comment,
    setComment,
    onEmotionClick,
    onChangeComment,
    isFilled,
  };
}

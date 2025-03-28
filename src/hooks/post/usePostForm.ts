import { useState } from 'react';

interface FormData {
  emotion: string | null; // 감정
  comment: string; // 코멘트
}

const usePostForm = () => {
  const [formData, setFormData] = useState<FormData>({
    emotion: null,
    comment: '',
  });

  const setEmotion = (emotion: string | null) => {
    console.log('emotion:', emotion);
    setFormData((prev) =>
      prev.emotion === emotion ? { ...prev, emotion: null } : { ...prev, emotion },
    );
  };
  const setComment = (comment: string) => {
    setFormData((prev) => ({ ...prev, comment }));
  };

  // 폼 초기화
  const clearForm = () => {
    setFormData({ emotion: null, comment: '' });
  };

  // 코멘트가 비어있지 않은 경우
  const isComment = formData.comment.trim().length > 0;

  return {
    formData,
    setEmotion,
    setComment,
    isComment,
    clearForm,
  };
};

export default usePostForm;

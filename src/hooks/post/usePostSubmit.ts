import { postEmotionRecord, putEmotionRecord } from '@/apis/emotionRecord';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';

interface RequestDataType {
  spotifyId: string;
  videoId: string | null;
  title: string;
  artist: string;
  albumImage: string;
  emotion: string;
  comment: string;
}

interface UsePostSubmitProps {
  mode: 'create' | 'edit';
  postId?: string;
  onSuccess: () => void;
  onError: (error: Error) => void;
}

const usePostSubmit = ({
  mode, // 'create' | 'edit'
  postId,
  onSuccess,
  onError,
}: UsePostSubmitProps) => {
  const idempotencyKeyRef = useRef(crypto.randomUUID()); // idempotency key 생성 (새 글 작성 시 중복 방지)
  // ✅ useMutation 설정 (작성, 수정)
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (requestData: RequestDataType) => {
      if (mode === 'edit') return putEmotionRecord(Number(postId), requestData); // 수정 모드
      console.log('idempotencyKeyRef', idempotencyKeyRef);
      if (mode === 'create') return postEmotionRecord(requestData, idempotencyKeyRef.current); // 새 글 작성 모드
    },
    onSuccess,
    onError,
  });

  // 기록 완료
  const onSubmit = async (data: RequestDataType) => {
    mutate(data); // useMutation 실행
  };
  return { onSubmit, isPending, isSuccess, isError };
};

export default usePostSubmit;

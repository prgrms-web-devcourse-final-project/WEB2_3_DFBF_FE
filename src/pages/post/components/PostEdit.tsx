import { useEffect } from 'react';
import PostForm from '@/pages/post/components/PostForm';
import usePostForm from '@/hooks/post/usePostForm';
import useMusicSelection from '@/hooks/post/useMusicSelection';
import usePostSubmit from '@/hooks/post/usePostSubmit';
import useEditInit from '@/hooks/post/useEditInit';
import PostSubmitButton from '@/pages/post/components/PostSubmitButton';
import usePostSubmitHandler from '@/hooks/post/usePostSubmitHandler';
import usePostCompletion from '@/hooks/post/usePostCompletion';

export default function PostEdit({ postId }: { postId: string }) {
  const mode = 'edit';

  const { formData, setEmotion, setComment, isComment } = usePostForm(); // 폼 관련 훅(감정, 코멘트)
  const { selectedPostMusic, isMusicSelect, clearPostMusic } = useMusicSelection(); // 음악 선택 상태
  useEditInit({ postId: mode === 'edit' ? Number(postId) : null, setEmotion, setComment }); // 수정 모드 초기값
  const { handlePostError, handlePostSuccess } = usePostSubmitHandler({
    mode,
  }); // 글 등록 성공, 실패 핸들러

  // 글 등록
  const { onSubmit, isPending, isSuccess, isError } = usePostSubmit({
    mode, // create, edit
    postId,
    onSuccess: handlePostSuccess,
    onError: handlePostError,
  });

  // 기록 완료 조건 확인
  const isCompletePost = Boolean(selectedPostMusic && isComment && formData.emotion);

  // 기록 완료
  const { completePost } = usePostCompletion({
    formData,
    isCompletePost,
    selectedPostMusic,
    onSubmit,
  });

  useEffect(() => {
    return () => {
      clearPostMusic();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-between w-full pb-10">
      <PostForm
        onEmotionClick={setEmotion}
        selectedEmotion={formData.emotion}
        selectedPostMusic={selectedPostMusic}
        isMusicSelect={isMusicSelect}
        comment={formData.comment}
        onChangeComment={(e) => setComment(e.target.value)}
      />
      {/* 버튼 */}
      <PostSubmitButton
        mode={mode}
        isCompletePost={isCompletePost}
        isPending={isPending}
        isSuccess={isSuccess}
        isError={isError}
        onCompletePost={completePost}
      />
    </div>
  );
}

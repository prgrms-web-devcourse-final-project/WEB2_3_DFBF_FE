import { useEffect } from 'react';
import { useParams } from 'react-router';
import PostForm from '@/pages/post/components/PostForm';
import { fetchSpotifyVideoId } from '@/utils/fetchSpotifyVideoId';
import usePostForm from '@/hooks/post/usePostForm';
import useMusicSelection from '@/hooks/post/useMusicSelection';
import usePostSubmit from '@/hooks/post/usePostSubmit';
import useEditInit from '@/hooks/post/useEditInit';
import PostSubmitButton from '@/pages/post/components/PostSubmitButton';
import usePostSubmitHandler from '@/hooks/post/usePostSubmitHandler';

export default function Post() {
  const { postId } = useParams();
  const isEditMode = Boolean(postId); // 수정 모드인지 확인
  const mode = isEditMode ? 'edit' : 'create';

  const { formData, setEmotion, setComment, isComment } = usePostForm(); // 폼 관련 훅(감정, 코멘트)
  const { selectedPostMusic, isMusicSelect, clearPostMusic } = useMusicSelection(); // 음악 선택 상태
  useEditInit({ postId: isEditMode ? Number(postId) : null, setEmotion, setComment }); // 수정 모드일 때 초기값
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
  const isCompletePost = selectedPostMusic && isComment && formData.emotion !== null;

  // 기록 완료
  const onCompletePost = async () => {
    if (!isCompletePost) return;

    // videoId 조회
    const videoId = await fetchSpotifyVideoId(
      selectedPostMusic?.spotifyId,
      selectedPostMusic?.artist,
      selectedPostMusic?.title,
    );

    const data: EmotionRecordRequest = {
      spotifyId: selectedPostMusic?.spotifyId,
      videoId,
      title: selectedPostMusic?.title,
      artist: selectedPostMusic?.artist,
      albumImage: selectedPostMusic?.albumImage,
      emotion: formData.emotion as string,
      comment: formData.comment,
    };

    onSubmit(data);
  };

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
        isEditMode={isEditMode}
        isCompletePost={isCompletePost}
        isPending={isPending}
        isSuccess={isSuccess}
        isError={isError}
        onCompletePost={onCompletePost}
      />
    </div>
  );
}

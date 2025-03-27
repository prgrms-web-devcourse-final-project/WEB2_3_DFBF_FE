import Button from '@/components/Button';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import SpinLoading from '@/components/loading/SpinLoading';
import Complete from '@/components/loading/Complete';
import ErrorShake from '@/components/loading/ErrorShake';
import { useQueryClient } from '@tanstack/react-query';
import usePostForm from '@/hooks/post/usePostForm';
import useMusicSelection from '@/hooks/post/useMusicSelection';
import PostForm from '@/pages/post/components/PostForm';
import usePostSubmit from '@/hooks/post/usePostSubmit';
import { fetchSpotifyVideoId } from '@/utils/fetchSpotifyVideoId';
import useEditInit from '@/hooks/post/useEditInit';
import usePostModals from '@/hooks/post/usePostModals';

export default function Post() {
  const { postId } = useParams();
  const isEditMode = Boolean(postId); // 수정 모드인지 확인
  const mode = isEditMode ? 'edit' : 'create';

  const queryClient = useQueryClient();

  const { selectedEmotion, comment, onEmotionClick, onChangeComment, isFilled } = usePostForm();
  const { selectedPostMusic, isMusicSelect, clearPostMusic } = useMusicSelection(); // 음악 선택 상태
  const { showSuccessModal, showFailModal } = usePostModals(isEditMode); // 모달 관련 훅
  useEditInit(isEditMode ? Number(postId) : null); // 수정 모드일 때 초기값

  // 기록 완료 조건 확인
  const isCompletePost = selectedPostMusic && isFilled;

  // 글 등록 성공
  const handlePostSuccess = () => {
    showSuccessModal();
    queryClient.invalidateQueries({ queryKey: ['userPosts', 'me'] });
  };

  // 글 등록 실패
  const handlePostError = (error: Error) => {
    console.error(error);
    showFailModal();
  };

  // 글 등록
  const { onSubmit, isPending, isSuccess, isError } = usePostSubmit({
    mode,
    postId,
    onSuccess: handlePostSuccess,
    onError: handlePostError,
  });

  // 기록 완료
  const onCompletePost = async () => {
    if (!isCompletePost || !selectedEmotion) return;

    // videoId 조회
    const videoId = await fetchSpotifyVideoId(
      selectedPostMusic?.spotifyId,
      selectedPostMusic?.artist,
      selectedPostMusic?.title,
    );

    const data = {
      spotifyId: selectedPostMusic?.spotifyId,
      videoId,
      title: selectedPostMusic?.title,
      artist: selectedPostMusic?.artist,
      albumImage: selectedPostMusic?.albumImage,
      emotion: selectedEmotion,
      comment,
    };

    onSubmit(data);
  };

  const renderButtonContent = () => {
    if (isPending) {
      return <SpinLoading />;
    } else if (isSuccess) {
      return <Complete />;
    } else if (isError) {
      return <ErrorShake />;
    } else return isEditMode ? <span>수정 완료</span> : <span>기록 완료</span>;
  };

  useEffect(() => {
    return () => {
      clearPostMusic();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-between w-full pb-10">
      <PostForm
        onEmotionClick={onEmotionClick}
        selectedEmotion={selectedEmotion}
        selectedPostMusic={selectedPostMusic}
        isMusicSelect={isMusicSelect}
        comment={comment}
        onChangeComment={onChangeComment}
      />
      {/* 버튼 */}
      <Button
        variant={isCompletePost ? 'primary' : 'disabled'}
        className={isError ? 'bg-functional-danger' : ''}
        onClick={onCompletePost}
      >
        {renderButtonContent()}
      </Button>
    </div>
  );
}

import Button from '@/components/Button';
import { useEffect } from 'react';
import { getEmotionRecordById } from '@/apis/emotionRecord';
import { useModalStore } from '@/store/modalStore';
import { useNavigate, useParams } from 'react-router';
import SpinLoading from '@/components/loading/SpinLoading';
import Complete from '@/components/loading/Complete';
import ErrorShake from '@/components/loading/ErrorShake';
import { useQueryClient } from '@tanstack/react-query';
import usePostForm from '@/hooks/post/usePostForm';
import useMusicSelection from '@/hooks/post/useMusicSelection';
import PostForm from '@/pages/post/components/PostForm';
import usePostSubmit from '@/hooks/post/usePostSubmit';
import { fetchSpotifyVideoId } from '@/utils/fetchSpotifyVideoId';

export default function Post() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const isEditMode = Boolean(postId); // 수정 모드인지 확인
  const mode = isEditMode ? 'edit' : 'create';

  const { openModal, closeModal } = useModalStore();

  const queryClient = useQueryClient();

  const {
    selectedEmotion,
    setSelectedEmotion,
    comment,
    setComment,
    onEmotionClick,
    onChangeComment,
    isFilled,
  } = usePostForm();
  const { selectedPostMusic, isMusicSelect, clearPostMusic, selectPostMusic } = useMusicSelection();

  // 수정모드
  useEffect(() => {
    if (isEditMode && postId) {
      // 수정 데이터 가져오기
      const getEmotionRecord = async (postId: number) => {
        const { data } = await getEmotionRecordById(postId);
        const { comment, emotion, spotifyMusic } = data;

        // 'artist' → 'artistName', 'title' → 'songTitle'
        const editMusic = {
          albumImage: spotifyMusic.albumImage,
          artist: spotifyMusic.artist, // 변환
          title: spotifyMusic.title, // 변환
          spotifyId: spotifyMusic.spotifyId,
        };

        setSelectedEmotion(emotion);
        setComment(comment);
        selectPostMusic(editMusic);
        console.log('음악 선택됨:', selectedPostMusic);
        console.log('수정 데이터:', data);
      };

      getEmotionRecord(Number(postId));
    }
  }, []);

  // 기록 완료 조건 확인
  const isCompletePost = selectedPostMusic && isFilled;

  // 글 등록 성공 모달
  const handlePostSuccessModal = () => {
    openModal({
      title: isEditMode ? '글 수정 성공' : '글 등록 성공',
      message: '내가 쓴 글을 확인하러 가 볼까요?',
      confirmText: '확인하러 가기',
      cancelText: '홈으로 가기',
      onConfirm: () => {
        navigate('/mypage', { replace: true });
        closeModal();
      },
      onCancel: () => {
        navigate('/home', { replace: true });
        closeModal();
      },
    });
  };

  // 글 등록 실패 모달
  const handlePostFailModal = () => {
    openModal({
      title: isEditMode ? '글 수정 실패' : '글 등록 실패',
      message: '잠시 후 다시 시도해 주세요.',
      confirmText: '확인',
      onConfirm: async () => {
        closeModal();
        navigate(-1);
      },
    });
  };

  const onSuccess = () => {
    handlePostSuccessModal();
    queryClient.invalidateQueries({ queryKey: ['userPosts', 'me'] });
  };

  const onError = (error: Error) => {
    console.error(error);
    handlePostFailModal();
  };

  const { onSubmit, isPending, isSuccess, isError } = usePostSubmit({
    mode,
    postId,
    onSuccess,
    onError,
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

import Button from '@/components/Button';
import EmotionFilter from '@/components/EmotionFilter';
import MusicCard from '@/components/MusicCard';
import Comment from '@/pages/post/components/Comment';
import { useEffect, useState } from 'react';
import { useSheetStore } from '@/store/sheetStore';
import { postEmotionRecord } from '@/apis/emotionRecord';
import { useModalStore } from '@/store/modalStore';
import { useNavigate } from 'react-router';
import { useMusicCardStore } from '@/store/MusicCardStore';
import SpinLoading from '@/components/loading/SpinLoading';
import Complete from '@/components/loading/Complete';
import Error from '@/components/loading/Error';

export default function Post() {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalStore();
  const { selectedPostMusic, clearPostMusic } = useMusicCardStore();
  const { closeAllSheets } = useSheetStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isError, setIsError] = useState(false);
  //음악 선택 상태 확인
  const [isMusicSelect, setIsMusicSelect] = useState(false);

  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null); // 선택된 감정
  const [comment, setComment] = useState<string>(''); // 코멘트

  // 음악 선택 됨 -> 아티스트 폰트 스타일 변경, 모달 닫기
  useEffect(() => {
    if (selectedPostMusic) {
      setIsMusicSelect(true);
      closeAllSheets();
      console.log('음악 선택됨:', selectedPostMusic);
    } else {
      setIsMusicSelect(false);
    }
  }, [selectedPostMusic]);

  // 감정 선택 시
  const onEmotionClick = (emotion: string) => {
    setSelectedEmotion((prev) => (prev === emotion ? null : emotion));
  };

  // 코멘트 입력 시
  const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value.trim());
  };

  // 기록 완료 조건 확인
  const isCompletePost = selectedPostMusic && selectedEmotion && comment.length > 0;

  // 글 등록 성공 모달
  const handlePostSuccessModal = () => {
    openModal({
      title: '글 등록 성공',
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
      title: '글 등록 실패',
      message: '잠시 후 다시 시도해 주세요.',
      confirmText: '확인',
      onConfirm: async () => {
        closeModal();
        navigate(-1);
      },
    });
  };

  // 기록 완료
  const onCompletePost = async () => {
    if (!isCompletePost) return;

    try {
      setIsLoading(true);

      const requestData = {
        spotifyId: selectedPostMusic?.spotifyId,
        title: selectedPostMusic?.songTitle,
        artist: selectedPostMusic?.artistName,
        albumImage: selectedPostMusic?.albumImage,
        emotion: selectedEmotion,
        comment: comment,
      };

      const data = await postEmotionRecord(requestData);
      // TODO: 로딩 추가
      console.log('기록 완료:', data);

      setIsComplete(true);
      handlePostSuccessModal();
    } catch (error) {
      console.error(error);
      setIsError(true);
      handlePostFailModal();
    } finally {
      setIsLoading(false);
    }
  };

  const renderButtonContent = () => {
    if (isLoading) {
      return <SpinLoading />;
    } else if (isComplete) {
      return <Complete />;
    } else if (isError) {
      return <Error />;
    } else return <span>기록 완료</span>;
  };

  useEffect(() => {
    return () => {
      clearPostMusic();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-between w-full pb-10">
      <div className="flex flex-col items-center gap-6 mt-5 w-fit">
        {/* 감정 선택 */}
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-2xl font-saeeum text-gray-60">이 순간, 어떤 감정이 떠오르나요?</h2>
          <EmotionFilter onEmotionClick={onEmotionClick} selectedEmotion={selectedEmotion} />
        </div>

        {/* 음악 검색 */}
        <MusicCard
          image={selectedPostMusic?.albumImage}
          title={selectedPostMusic?.songTitle}
          artist={selectedPostMusic?.artistName}
          isMusicSelect={isMusicSelect}
          buttonContent={isMusicSelect ? '변경' : '등록'}
          buttonType={isMusicSelect ? 'secondary' : 'primary'}
          rightElement="button"
        />

        {/* 사용자 코멘트 */}
        <Comment
          selectedEmotion={selectedEmotion}
          comment={comment}
          onChangeComment={onChangeComment}
        />
      </div>
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

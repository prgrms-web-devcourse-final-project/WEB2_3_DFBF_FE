import Button from '@/components/Button';
import EmotionFilter from '@/components/EmotionFilter';
import MusicCard from '@/components/MusicCard';
import Comment from '@/pages/post/components/Comment';
import { useContext, useEffect, useState } from 'react';
import { PostMusicContext } from '@/pages/post/context/PostMusicContext';
import { useSheetStore } from '@/store/sheetStore';
import { postEmotionRecord } from '@/apis/emotionRecord';
import { useModalStore } from '@/store/modalStore';
import { useNavigate } from 'react-router';

export default function PostPage() {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalStore();
  const { selectedPostMusic } = useContext(PostMusicContext)!;
  const { closeAllSheets } = useSheetStore();

  //음악 선택 상태 확인
  const [isMusicSelect, setIsMusicSelect] = useState(false);

  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null); // 선택된 감정
  const [comment, setComment] = useState<string>(''); // 코멘트

  // 음악 선택 됨 -> 아티스트 폰트 스타일 변경, 모달 닫기
  useEffect(() => {
    if (selectedPostMusic) {
      setIsMusicSelect(true);
      closeAllSheets();
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
        closeModal();
        navigate('/mypage', { replace: true });
      },
      onCancel: () => {
        closeModal();
        navigate('/home', { replace: true });
      },
    });
  };

  // 글 등록 실패 모달
  const handlePostFailModal = () => {
    openModal({
      title: '글 등록 실패',
      message: '잠시 후 다시 시도해 주세요.',
      onConfirm: () => {
        closeModal();
        navigate(-1);
      },
    });
  };

  // 기록 완료
  const onCompletePost = async () => {
    if (!isCompletePost) return;

    try {
      const requestData = {
        spotifyId: selectedPostMusic?.spotifyId,
        title: selectedPostMusic?.songTitle,
        artist: selectedPostMusic?.artistName,
        albumImage: selectedPostMusic?.albumImage,
        emotion: selectedEmotion,
        comment: comment,
      };

      const data = await postEmotionRecord(requestData);
      console.log('기록 완료:', data);

      handlePostSuccessModal();
    } catch (error) {
      console.error(error);
      handlePostFailModal();
    }
  };

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
      <Button variant={isCompletePost ? 'primary' : 'disabled'} onClick={onCompletePost}>
        기록 완료
      </Button>
    </div>
  );
}

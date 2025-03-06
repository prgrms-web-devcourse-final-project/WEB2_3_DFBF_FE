import Button from '@/components/Button';
import EmotionFilter from '@/components/EmotionFilter';
import MusicCard from '@/components/MusicCard';
import Comment from '@/pages/post/components/Comment';
import { useEffect, useState } from 'react';
import { useSheetStore } from '@/store/sheetStore';
import {
  getEmotionRecordById,
  getSpotifyVideoId,
  postEmotionRecord,
  putEmotionRecord,
} from '@/apis/emotionRecord';
import { useModalStore } from '@/store/modalStore';
import { useNavigate, useParams } from 'react-router';
import { useMusicCardStore } from '@/store/MusicCardStore';
import SpinLoading from '@/components/loading/SpinLoading';
import Complete from '@/components/loading/Complete';
import ErrorShake from '@/components/loading/ErrorShake';
import { searchYoutubeVideo } from '@/apis/youtube';

export default function Post() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const isEditMode = Boolean(postId); // 수정 모드인지 확인

  const { openModal, closeModal } = useModalStore();
  const { selectedPostMusic, selectPostMusic, clearPostMusic } = useMusicCardStore();
  const { closeAllSheets } = useSheetStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isMusicSelect, setIsMusicSelect] = useState(false); //음악 선택 상태 확인
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null); // 선택된 감정
  const [comment, setComment] = useState<string>(''); // 코멘트

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
          artistName: spotifyMusic.artist, // 변환
          songTitle: spotifyMusic.title, // 변환
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
    setComment(e.target.value);
  };

  // 기록 완료 조건 확인
  const isCompletePost = selectedPostMusic && selectedEmotion && comment.trim().length > 0;

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

  // spotifyId로 videoId 조회
  const fetchSpotifyVideoId = async (spotifyId: string, artist: string, title: string) => {
    try {
      const data = await getSpotifyVideoId(spotifyId); // 서버에 videoId 조회
      console.log('videoId 조회 결과:', data);

      // 서버에 videoId 가 있으면
      if (data.code === 200 && data.data) return data.videoId;
      // 서버에 videoId 가 없으면
      else {
        // youtube 검색
        const videoId = await searchYoutubeVideo(`${artist} - ${title} lyrics`);
        console.log('유튜브 videoId:', videoId);
        return videoId;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 기록 완료
  const onCompletePost = async () => {
    if (!isCompletePost) return;

    // 음악 선택 시 videoId 조회
    const videoId = await fetchSpotifyVideoId(
      selectedPostMusic?.spotifyId,
      selectedPostMusic?.artistName,
      selectedPostMusic?.songTitle,
    );

    try {
      setIsLoading(true);

      const requestData = {
        spotifyId: selectedPostMusic?.spotifyId,
        videoId: videoId,
        title: selectedPostMusic?.songTitle,
        artist: selectedPostMusic?.artistName,
        albumImage: selectedPostMusic?.albumImage,
        emotion: selectedEmotion,
        comment: comment,
      };

      let data;
      if (isEditMode) {
        // 수정 모드
        data = await putEmotionRecord(Number(postId), requestData);
      } else {
        // 새 글 작성
        data = await postEmotionRecord(requestData);
      }
      console.log(isEditMode ? '수정 완료' : '기록 완료:', data);
      console.log('요청 데이터:', requestData);

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

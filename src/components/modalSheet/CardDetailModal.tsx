import EmotionBadge from '@/components/EmotionBadge';
import headsetIcon from '@/assets/icons/headset-icon.svg';
import ChatActionButtons from '@/components/modalSheet/ChatActionButtons';
import ModalSheetLayout from '@/layouts/ModalSheetLayout';
import { useSheetStore } from '@/store/sheetStore';
import { useYouTubeStore } from '@/store/youtubeStore';
import defaultImage from '@assets/images/default.png';
import { useQuery } from '@tanstack/react-query';
import { getEmotionRecordById } from '@/apis/emotionRecord';
import { formatDate } from '@/utils/formatDate';
import { useEffect } from 'react';
import { searchYoutubeVideo } from '@/apis/youtube';

interface CardDetailModalProps {
  // emotion: string; // 감정
  // albumImage: string; // 앨범이미지
  // songTitle: string; // 노래 제목
  // artistName: string; // 가수
  // date: string; // 날짜
  // authorName: string; // 글작성자
  isChatting: boolean; // 현재 채팅중인지 (임시)
  // isOwnPost: boolean; // 본인 글 여부(임시)
  recordId: number; // 감정기록 id
  handleDelete?: () => void; // 삭제 함수
  handleEdit?: () => void; // 수정 함수
}

function CardDetailModal({
  // emotion,
  // albumImage,
  // songTitle,
  // artistName,
  // date,
  // authorName,
  isChatting,
  // isOwnPost,
  recordId,
  handleDelete,
  handleEdit,
}: CardDetailModalProps) {
  const { isCardSheetOpen } = useSheetStore();
  const { setVideoId, players, setIsPlaying } = useYouTubeStore();
  const isPlaying = players['3']?.isPlaying || false;

  const { data } = useQuery({
    queryKey: ['emotionRecord', recordId],
    queryFn: () => getEmotionRecordById(recordId),
  });

  useEffect(() => {
    if (!data?.data?.spotifyMusic) return; // 데이터가 없으면 실행하지 않음

    const artistName = data.data.spotifyMusic.artist;
    const songTitle = data.data.spotifyMusic.title;

    const getVideoId = async () => {
      const id = await searchYoutubeVideo(`${artistName} - ${songTitle} lyrics`);
      setVideoId('3', id);
    };
    getVideoId();
  }, [data]);

  //sheet open 시 스크롤 제거
  useEffect(() => {
    if (isCardSheetOpen) {
      document.body.style.overflow = 'hidden'; // 스크롤 막기
    } else {
      document.body.style.overflow = 'auto'; // 스크롤 복원
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCardSheetOpen]);

  if (!isCardSheetOpen) {
    return null;
  }

  return (
    <ModalSheetLayout isOwnPost={!data?.data?.disable} handleDelete={handleDelete}>
      <div className="px-[36.5px] flex flex-col items-center gap-4">
        <div className="flex flex-col max-w-[250px] gap-4">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 caption-r text-gray-60">
              <span>{data?.data?.nickName}</span>
              {isChatting && <img src={headsetIcon} alt="헤드셋 아이콘" />}
            </div>
            <div className="flex items-center gap-2">
              <span className=" font-light text-gray-60 text-[10px]">
                {formatDate(data?.data?.createdAt)}
              </span>
              <EmotionBadge size="small" emotion={data?.data?.emotion} />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col items-center gap-2">
                <img
                  src={data?.data?.spotifyMusic?.albumImage}
                  alt="앨범 이미지"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // 무한 루프 방지
                    target.src = defaultImage; // 기본 이미지로 변경
                  }}
                  className="w-[80px] h-[80px] rounded-[8px]"
                />
                <div className="flex flex-col items-center min-w-0">
                  <span className="overflow-hidden body-large-b text-ellipsis whitespace-nowrap">
                    {data?.data?.spotifyMusic?.title}
                  </span>
                  <span className="overflow-hidden body-m text-ellipsis whitespace-nowrap">
                    {data?.data?.spotifyMusic?.artist}
                  </span>
                </div>
              </div>
              <div className="flex gap-10">
                <ChatActionButtons
                  isChatting={isChatting}
                  isPlaying={isPlaying}
                  isOwnPost={!data?.data?.disable}
                  authorId={data?.data?.loginId}
                  onPlayPauseToggle={() => setIsPlaying('3', !isPlaying)}
                />
              </div>
            </div>

            <span className="body-r">{data?.data?.comment}</span>
          </div>
        </div>
      </div>
    </ModalSheetLayout>
  );
}

export default CardDetailModal;

// 사용예시

// <CardDetailModal recordId={selectedRecordId} isChatting={true} />;

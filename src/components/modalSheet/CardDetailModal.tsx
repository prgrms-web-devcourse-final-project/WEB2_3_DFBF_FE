import EmotionBadge from '@/components/EmotionBadge';
import headsetIcon from '@/assets/icons/headset-icon.svg';
import ChatActionButtons from '@/components/modalSheet/ChatActionButtons';
import ModalSheetLayout from '@/layouts/ModalSheetLayout';
import { useSheetStore } from '@/store/sheetStore';
import { useYouTubeStore } from '@/store/youtubeStore';
import defaultImage from '@assets/images/default.png';
import { useQuery } from '@tanstack/react-query';
import { getEmotionRecordById, getSpotifyVideoId } from '@/apis/emotionRecord';
import { formatDate } from '@/utils/formatDate';
import { useEffect, useState } from 'react';

interface CardDetailModalProps {
  isChatting: boolean; // 현재 채팅중인지 (임시)
  recordId: number; // 감정기록 id
  handleDelete?: () => void; // 삭제 함수
  handleEdit?: () => void; // 수정 함수
}

function CardDetailModal({ isChatting, recordId, handleDelete, handleEdit }: CardDetailModalProps) {
  const { isCardSheetOpen, setCurrentRecord } = useSheetStore();
  const { setVideoId, players, setIsPlaying } = useYouTubeStore();
  const isPlaying = players['3']?.isPlaying || false;

  const { data } = useQuery({
    queryKey: ['emotionRecord', recordId],
    queryFn: () => getEmotionRecordById(recordId),
  });

  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);

  useEffect(() => {
    console.log(recordId)
    if (!data?.data?.spotifyMusic) return; // 데이터가 없으면 실행하지 않음

    setCurrentRecord(data.data);

    const getVideoId = async () => {
      if (!data?.data?.spotifyMusic) return; // 데이터가 없으면 실행하지 않음
      //videoId 없으면 검색
      try {
        const currentMusicId = data.data.spotifyMusic.spotifyId;
        const res = await getSpotifyVideoId(currentMusicId);
        const savedVideoId = res.data;
        setCurrentVideoId(savedVideoId);
      } catch (error) {
        console.log(error);
      }
    };

    if (data.data.spotifyMusic.videoId) {
      setCurrentVideoId(data.data.spotifyMusic.videoId);
    } else {
      getVideoId();
    }

    return () => {
      setCurrentRecord(null);
    };
  }, [data]);

  // videoId가 변경될 때마다 zustand store의 videoId를 업데이트
  useEffect(() => {
    if (currentVideoId) {
      setVideoId('3', currentVideoId); // YouTube store의 videoId를 업데이트
    }
  }, [currentVideoId]);

  if (!isCardSheetOpen) {
    return null;
  }

  return (
    <ModalSheetLayout
      isOwnPost={!data?.data?.disable}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    >
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
                  recordId={recordId}
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

import EmotionBadge from '@/components/EmotionBadge';
import headsetIcon from '@/assets/icons/headset-icon.svg';
import ChatActionButtons from '@/components/modalSheet/ChatActionButtons';
import ModalSheetLayout from '@/layouts/ModalSheetLayout';
import { useEffect } from 'react';
import { searchYoutubeVideo } from '@/apis/youtube';
import { useSheetStore } from '@/store/sheetStore';
import { useYouTubeStore } from '@/store/youtubeStore';

interface CardDetailModalProps {
  emotion: string; // 감정
  albumImage: string; // 앨범이미지
  songTitle: string; // 노래 제목
  artistName: string; // 가수
  date: string; // 날짜
  authorName: string; // 글작성자
  isChatting: boolean; // 현재 채팅중인지 (임시)
  isOwnPost: boolean; // 본인 글 여부(임시)
}

function CardDetailModal({
  emotion,
  albumImage,
  songTitle,
  artistName,
  date,
  authorName,
  isChatting,
  isOwnPost,
}: CardDetailModalProps) {
  const { isSheetOpen } = useSheetStore();

  const { setVideoId, players, setIsPlaying } = useYouTubeStore();

  const isPlaying = players['3']?.isPlaying || false;

  useEffect(() => {
    const getVideoId = async () => {
      const id = await searchYoutubeVideo(`${artistName} - ${songTitle} lyrics`);
      setVideoId('3', id);
    };
    getVideoId();
  }, []);

  if (!isSheetOpen) {
    return null;
  }

  return (
    <ModalSheetLayout isOwnPost={isOwnPost}>
      <div className="px-[36.5px] flex flex-col items-center gap-4">
        <div className="flex flex-col max-w-[250px] gap-4">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 caption-r text-gray-60">
              <span>{authorName}</span>
              {isChatting && <img src={headsetIcon} alt="헤드셋 아이콘" />}
            </div>
            <div className="flex items-center gap-2">
              <span className=" font-light text-gray-60 text-[10px]">{date}</span>
              <EmotionBadge size="small" emotion={emotion} />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col gap-2">
                <img
                  src={albumImage}
                  alt="앨범 이미지"
                  className="w-[80px] h-[80px] rounded-[8px]"
                />
                <div className="flex flex-col items-center min-w-0">
                  <span className="overflow-hidden body-large-b text-ellipsis whitespace-nowrap">
                    {songTitle}
                  </span>
                  <span className="overflow-hidden body-m text-ellipsis whitespace-nowrap">
                    {artistName}
                  </span>
                </div>
              </div>
              <div className="flex gap-10">
                <ChatActionButtons
                  isChatting={isChatting}
                  isPlaying={isPlaying}
                  isOwnPost={isOwnPost}
                  onPlayPauseToggle={() => setIsPlaying('3', !isPlaying)}
                />
              </div>
            </div>

            <span className="body-r">
              오늘은 날씨가 정말 좋다... 졸리다... 드디어 금요일이다. 내일은 주말이다. 주말엔 알바
              간다. 귀찮다.오늘은 날씨가 정말 좋다... 졸리다ㅏㅏ
            </span>
          </div>
        </div>
      </div>
    </ModalSheetLayout>
  );
}

export default CardDetailModal;

// 사용예시

//  <CardDetailModal
//    emotion="HAPPY"
//    albumImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDr6SB_fokX3TJBAFcrIisQ_YGwVVO0F8PCw&s"
//    songTitle="hypeboy"
//    artistName="뉴진스"
//    date="2025.02.15"
//    authorName="하입보이"
//    isChatting={false}
//    isOwnPost={true}
//  />;

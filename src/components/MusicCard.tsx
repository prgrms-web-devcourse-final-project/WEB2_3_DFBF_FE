import Button from '@/components/Button';
import defaultImage from '@assets/images/default.png';
import play from '@assets/icons/play/play-circle.svg';
import pause from '@assets/icons/pause-circle.svg';
import YouTubeAudioPlayer from './YouTubeAudioPlayer';
import { useEffect, useState } from 'react';
import { searchYoutubeVideo } from '@/apis/youtube';
import { useSheetStore } from '@/store/sheetStore';
import MusicSearchSheet from './modalSheet/MusicSearchSheet';

interface MusicCardProps {
  image?: string; // 음악 이미지
  title?: string; // 음악 제목
  artist?: string; // 음악 설명
  buttonContent?: string; // 버튼 텍스트
  buttonType?: 'primary' | 'secondary'; // 버튼 타입
  rightElement?: 'none' | 'play' | 'button'; // 오른쪽 요소 타입
}

export default function MusicCard({
  image = defaultImage,
  title = '음악을 등록해 주세요',
  artist = ' 지금 생각나는 음악이 있나요?',
  buttonContent = '등록',
  buttonType = 'primary',
  rightElement = 'button',
}: MusicCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { isSheetOpen, openSheet } = useSheetStore();

  useEffect(() => {
    const getVideoId = async () => {
      const id = await searchYoutubeVideo(`${artist} - ${title} lyrics`);
      setVideoId(id);
    };
    getVideoId();
  }, []);
  return (
    <>
      <div className="flex gap-2 p-[10px] w-[296px] rounded-lg bg-white/80 card-shadow">
        <div className="w-[58px] h-[58px] rounded-lg overflow-hidden flex-shrink-0">
          <img
            className="object-cover w-full h-full"
            src={image}
            alt={`${title || '음악'} 앨범 커버`}
          />
        </div>
        <div className="flex flex-1 items-center justify-between min-w-0 gap-0.5">
          <div className="flex flex-col flex-1 min-w-0">
            <div className="overflow-hidden  body-large-m whitespace-nowrap text-ellipsis">
              {title}
            </div>
            <div className="font-saeeum text-[14px] leading-[18px] whitespace-nowrap text-ellipsis overflow-hidden">
              {artist}
            </div>
          </div>
          {rightElement === 'button' && (
            <Button
              onClick={openSheet}
              variant={buttonType}
              className="w-[51px] h-[32px] flex-shrink-0"
            >
              {buttonContent}
            </Button>
          )}
          {rightElement === 'play' && (
            <YouTubeAudioPlayer
              videoId={videoId!}
              isPlaying={isPlaying}
              onPlayPauseToggle={() => setIsPlaying((prev) => !prev)}
              iconType="circle"
            />
          )}
        </div>
      </div>
      {isSheetOpen && <MusicSearchSheet />}
    </>
  );
}

// 사용예시
//1.
// <MusicCard
//   title="Playlist"
//   artist="Add your favorite music!"
//   buttonType="secondary"
//   buttonContent="삭제"
//   rightElement="button"
// />

//2.
// <MusicCard
//   title="Playlist"
//   artist="Add your favorite music!"
//   rightElement="play"
//   isPlaying={false}
// />

//3.
// <MusicCard rightElement="none" />

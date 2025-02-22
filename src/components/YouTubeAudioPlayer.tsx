import React, { useEffect, useRef } from 'react';
// import YouTube from 'react-youtube';
import play from '@/assets/icons/play/play.svg';
import pause from '@/assets/icons/pause.svg';
import playCircle from '@/assets/icons/play/play-circle.svg';
import pauseCircle from '@/assets/icons/pause-circle.svg';
import playGray from '@/assets/icons/play/play-icon-gray.svg';
import pauseGray from '@/assets/icons/pause-icon-gray.svg';
// import { twMerge } from 'tailwind-merge';

// YouTube Player Props 정의
interface YouTubeAudioPlayerProps {
  videoId: string;
  isPlaying: boolean;
  onPlayPauseToggle: () => void;
  iconType?: 'normal' | 'circle' | 'gray';
}

const YouTubeAudioPlayer: React.FC<YouTubeAudioPlayerProps> = ({
  videoId,
  isPlaying,
  onPlayPauseToggle,
  iconType = 'normal',
}) => {
  const getIcon = () => {
    switch (iconType) {
      case 'circle':
        return isPlaying ? pauseCircle : playCircle;
      case 'gray':
        return isPlaying ? pauseGray : playGray;
      default:
        return isPlaying ? pause : play;
    }
  };

  const playerRef = useRef<YT.Player | null>(null);

  // 플레이어 생성
  const createPlayer = () => {
    if (!playerRef.current) {
      playerRef.current = new window.YT.Player('player-container', {
        height: '0',
        width: '0',
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          playsinline: 1,
        },
      });
    } else {
      playerRef.current.loadVideoById(videoId);
    }
  };

  // 플레이 버튼 클릭 핸들러
  const handlePlayButtonClick = () => {
    if (!playerRef.current) {
      createPlayer(); // 플레이어가 없으면 새로 생성
    } else {
      if (isPlaying) {
        playerRef.current.pauseVideo(); // 재생 중이면 일시정지
      } else {
        playerRef.current.playVideo(); // 일시정지 중이면 재생
      }
    }
    onPlayPauseToggle(); // 상태 변경 후 부모 컴포넌트로 알림
  };

  useEffect(() => {
    createPlayer();
  }, [videoId]);

  if (iconType === 'gray') {
    return (
      <div
        className="flex flex-col items-center gap-1 cursor-pointer"
        onClick={handlePlayButtonClick}
      >
        <div id="player-container"></div>
        <button className="w-[38px] h-[38px] rounded-full bg-gray-5 flex justify-center items-center hover:bg-gray-10 cursor-pointer">
          <img src={getIcon()} alt="play" />
        </button>
        <span className="text-[9px] text-gray-50 font-normal">
          {isPlaying ? '재생 중...' : '재생하기'}
        </span>
      </div>
    );
  }

  return (
    <div>
      <div id="player-container"></div>
      <button onClick={handlePlayButtonClick} className="cursor-pointer h-full flex items-center">
        <img src={getIcon()} alt="play" />
      </button>
    </div>
  );
};

export default YouTubeAudioPlayer;

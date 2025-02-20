import React, { useRef, useState } from 'react';
import YouTube from 'react-youtube';
import play from '@/assets/icons/play.svg';
import pause from '@/assets/icons/pause.svg';
import playCircle from '@/assets/icons/play-circle.svg';
import pauseCircle from '@/assets/icons/pause-circle.svg';
import { twMerge } from 'tailwind-merge';

// YouTube Player Props 정의
interface YouTubeAudioPlayerProps {
  videoId: string;
  isPlaying: boolean;
  onPlayPauseToggle: () => void;
  isCircleIcon?: boolean;
}

const YouTubeAudioPlayer: React.FC<YouTubeAudioPlayerProps> = ({
  videoId,
  isPlaying,
  onPlayPauseToggle,
  isCircleIcon = false,
}) => {
  const playerRef = useRef<any>(null); // YouTube Player 인스턴스를 저장
  const [isVideoLoaded, setIsVideoLoaded] = useState(false); // 사용자가 play 버튼을 눌러야만 youtube 로드하기

  // YouTube Player가 준비되었을 때 실행되는 함수
  const onReady = (event: any) => {
    playerRef.current = event.target; // 플레이어 인스턴스를 저장
    if (isPlaying) {
      playerRef.current.playVideo(); // 자동 재생
    }
  };

  // YouTube Player 옵션
  const opts = {
    playerVars: {
      autoplay: isVideoLoaded ? 1 : 0, // 자동 재생
      controls: 0, // 컨트롤 숨기기
      showinfo: 0, // 정보 숨기기
      modestbranding: 1, // 브랜드 로고 숨기기
      rel: 0, // 관련 영상 숨기기
      iv_load_policy: 3, // 자막 숨기기
    },
  };

  // 재생 / 일시정지 토글
  const togglePlay = () => {
    if (!isVideoLoaded) {
      setIsVideoLoaded(true); // 비디오 로드 상태 업데이트
      onPlayPauseToggle();
      return;
    }

    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo(); // 유튜브 비디오 일시정지
    } else {
      playerRef.current.playVideo(); // 유튜브 비디오 재생
    }

    onPlayPauseToggle(); // 부모 컴포넌트에 상태 변경 알림
  };

  return (
    <div>
      {isVideoLoaded && (
        <YouTube videoId={videoId} opts={opts} onReady={onReady} className="hidden" />
      )}
      <button onClick={togglePlay} className="cursor-pointer h-full">
        <img
          src={isCircleIcon ? (isPlaying ? pauseCircle : playCircle) : isPlaying ? pause : play}
          className={twMerge('w-[28px]', isCircleIcon && 'w-[32px]s')}
          alt="play"
        />
      </button>
    </div>
  );
};

export default YouTubeAudioPlayer;

import React, { useEffect, useRef } from 'react';
// import YouTube from 'react-youtube';
import { useYouTubeStore } from '@/store/youtubeStore';
// import { twMerge } from 'tailwind-merge';

// YouTube Player Props 정의
//1: MusicCard 2: chat 3: post
interface YouTubeAudioPlayerProps {
  playerId: '1' | '2' | '3';
}

const YouTubeAudioPlayer: React.FC<YouTubeAudioPlayerProps> = ({ playerId }) => {
  const { isApiReady, players, setIsPlaying } = useYouTubeStore();

  const playerRef = useRef<YT.Player | null>(null);
  const videoId = players[playerId]?.videoId || null;
  const isPlaying = players[playerId]?.isPlaying || false;

  // 플레이어 생성
  const createPlayer = () => {
    if (!isApiReady || !videoId) {
      if (playerRef.current && playerRef.current.seekTo) {
        playerRef.current.seekTo(0, false);
        playerRef.current.pauseVideo();
      }
      return;
    } // API 준비되지 않았거나 videoId가 없으면

    if (!playerRef.current) {
      playerRef.current = new window.YT.Player(`player-${playerId}`, {
        height: '1px',
        width: '1px',
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          playsinline: 1,
          origin: window.location.origin, // 현재 페이지의 origin을 전달
        },
      });
    } else {
      playerRef.current.loadVideoById(videoId); // 이미 플레이어가 있으면 비디오를 새로 로드
      playerRef.current.pauseVideo();
      setIsPlaying(playerId, false);
    }
  };

  // isPlaying 변경 시 실행
  useEffect(() => {
    if (!playerRef.current) return; // 플레이어가 초기화되지 않았으면 실행 안 함

    if (isPlaying) {
      playerRef.current.playVideo?.();
    } else {
      playerRef.current.pauseVideo?.();
    }
  }, [isPlaying]);

  useEffect(() => {
    createPlayer();
  }, [videoId, isApiReady]);

  useEffect(() => {
    const playerElement = document.getElementById(`player-${playerId}`);
    if (playerElement) {
      playerElement.style.position = 'absolute';
      playerElement.style.top = '0px';
    }
  }, []);
  return <div id={`player-${playerId}`}></div>;
};

export default YouTubeAudioPlayer;

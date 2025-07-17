import { useYouTubeStore } from '@/store/youtubeStore';
import { useEffect, useRef } from 'react';
import playIcon from '@assets/icons/play/play-icon-gray.svg';
import pauseIcon from '@assets/icons/pause-icon-gray.svg';
import CardDetailButtons from '@/components/modalSheet/CardDetailButtons';

interface PlayToggleButtonProps {
  videoId: string;
}

const PlayToggleButton = ({ videoId }: PlayToggleButtonProps) => {
  const { setVideoId, players, setIsPlaying } = useYouTubeStore();
  const wasPlayingRef = useRef(false); // 이전 상태 저장
  const isPlaying = players['3']?.isPlaying || false;

  useEffect(() => {
    // 🎵 [1] 현재 '1번 플레이어'가 재생 중인지 기록 (복원용)
    wasPlayingRef.current = players['1']?.isPlaying || false;

    // ⏸️ [2] 다른 사운드를 재생하기 위해 '1번 플레이어'를 일시정지
    setIsPlaying('1', false);

    return () => {
      // 🛑 [3-1] '3번 플레이어' 정리 (종료 시 사운드 및 상태 초기화)
      setIsPlaying('3', false);
      setVideoId('3', null);

      // ▶️ [3-2] 원래 '1번 플레이어'가 재생 중이었다면 다시 재생
      if (wasPlayingRef.current) {
        setIsPlaying('1', true);
      }
    };
  }, []);

  // videoId가 변경될 때마다 zustand store의 videoId를 업데이트
  useEffect(() => {
    setVideoId('3', videoId); // YouTube store의 videoId를 업데이트
  }, [videoId]);

  // 노래 재생 유무에 따라서 다르게
  const playButtonProps = isPlaying
    ? { icon: pauseIcon, label: '재생 중...', onClick: () => setIsPlaying('3', !isPlaying) }
    : { icon: playIcon, label: '재생하기', onClick: () => setIsPlaying('3', !isPlaying) };

  return <CardDetailButtons {...playButtonProps} />;
};

export default PlayToggleButton;

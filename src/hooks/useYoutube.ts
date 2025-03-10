import { useYouTubeStore } from '@/store/youtubeStore';
import { loadYouTubeAPI } from '@/utils/youtubeApiLoader';
import { useEffect } from 'react';

export const useYotube = () => {
  const { setApiReady } = useYouTubeStore();

  useEffect(() => {
    loadYouTubeAPI().then(() => {
      setApiReady();
    }); // 앱이 처음 실행될 때 API 로드
  }, []);
};

import { PostMusicContext } from '@/pages/post/context/PostMusicContext';
import { useState } from 'react';

interface MusicCardItem {
  spotifyId: string;
  songTitle: string;
  artistName: string;
  albumImage: string;
}

// Provider 정의
export default function PostMusicProvider({ children }: { children: React.ReactNode }) {
  // Context에서 사용할 상태값
  const [selectedPostMusic, setSelectedPostMusic] = useState<MusicCardItem | null>(null);

  // 음악 선택 기능 추가
  const selectPostMusic = (music: MusicCardItem) => {
    setSelectedPostMusic(music);
  };

  // 선택된 음악 초기화
  const clearPostMusic = () => {
    setSelectedPostMusic(null);
  };

  return (
    <PostMusicContext.Provider value={{ selectedPostMusic, selectPostMusic, clearPostMusic }}>
      {children}
    </PostMusicContext.Provider>
  );
}

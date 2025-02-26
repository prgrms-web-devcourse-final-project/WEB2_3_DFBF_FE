import { createContext } from 'react';

interface MusicCardItem {
  spotifyId: string;
  songTitle: string;
  artistName: string;
  albumImage: string;
}

interface PostMusicContextType {
  selectedPostMusic: MusicCardItem | null;
  selectPostMusic: (music: MusicCardItem) => void;
  clearPostMusic: () => void;
}

export const PostMusicContext = createContext<PostMusicContextType | null>(null);

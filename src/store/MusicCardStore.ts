import { create } from 'zustand';

interface MusicCardItem {
  spotifyId: string;
  songTitle: string;
  artistName: string;
  albumImage: string;
}

interface MusicCardStore {
  selectedPostMusic: MusicCardItem | null;
  selectPostMusic: (music: MusicCardItem) => void;
  clearPostMusic: () => void;
}

export const useMusicCardStore = create<MusicCardStore>((set) => ({
  selectedPostMusic: null,
  selectPostMusic: (music) => set({ selectedPostMusic: music }),
  clearPostMusic: () => set({ selectedPostMusic: null }),
}));

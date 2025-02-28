import { create } from 'zustand';

interface MusicCardStore {
  // Post 관련 상태
  selectedPostMusic: MusicCardItem | null;
  selectPostMusic: (music: MusicCardItem | null) => void;
  clearPostMusic: () => void;

  // Profile 관련 상태
  selectedProfileMusic: ProfileMusic | null;
  selectProfileMusic: (music: ProfileMusic | null) => void;
  clearProfileMusic: () => void;
}

export const useMusicCardStore = create<MusicCardStore>((set) => ({
  // Post 관련 상태
  selectedPostMusic: null,
  selectPostMusic: (music) => set({ selectedPostMusic: music }),
  clearPostMusic: () => set({ selectedPostMusic: null }),

  // Profile 관련 상태
  selectedProfileMusic: null,
  selectProfileMusic: (music) => set({ selectedProfileMusic: music }),
  clearProfileMusic: () => set({ selectedProfileMusic: null }),
}));

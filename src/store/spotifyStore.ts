import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SpotifyState {
  token: string | null;
  expiresAt: number | null;
  setToken: (token: string, expiresIn: number) => void;
  isTokenValid: () => boolean;
  clearToken: () => void;
}

export const useSpotifyStore = create(
  persist<SpotifyState>(
    (set, get) => ({
      token: null, // spotify 토큰
      expiresAt: null, // 토큰 만료시간

      setToken: (token, expiresIn) => {
        const expiresAt = Date.now() + expiresIn * 1000;
        set({ token, expiresAt });
      },
      // 토큰 유효성 검사
      isTokenValid: () => {
        const { token, expiresAt } = get();
        return !!token && !!expiresAt && Date.now() < expiresAt;
      },

      clearToken: () => set({ token: null, expiresAt: null }),
    }),
    {
      name: 'spotify-auth',
    },
  ),
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      accessToken: null, // 초기값
      isAuthenticated: false,

      // 로그인 후 accessToken 저장
      setAccessToken: (token) => {
        set({ accessToken: token, isAuthenticated: !!token });
      },

      // 로그아웃 (토큰 삭제 및 상태 초기화)
      logout: () => {
        set({ accessToken: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage', // 스토리지 key 이름
    },
  ),
);

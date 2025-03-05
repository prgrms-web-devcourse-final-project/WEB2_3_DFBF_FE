import { create } from 'zustand';

interface UserState {
  userData: UserInfo | null;
  setUserData: (userData: UserInfo | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userData: null,
  setUserData: (userData) => set({ userData }),
}));

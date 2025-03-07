import { create } from 'zustand';

interface ScrollStore {
  scrollContainerRefCurrent: HTMLDivElement | null;  // 상태는 RefObject 대신 실제 DOM 요소를 저장
  setScrollContainerRefCurrent: (ref: HTMLDivElement | null) => void;
}

export const useScrollStore = create<ScrollStore>((set) => ({
  scrollContainerRefCurrent: null,
  setScrollContainerRefCurrent: (ref) => set({ scrollContainerRefCurrent: ref }),  // DOM 요소를 직접 저장
}));
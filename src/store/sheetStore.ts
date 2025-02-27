import { create } from 'zustand';

interface SheetStore {
  isMusicSheetOpen: boolean;
  isCardSheetOpen: boolean;
  openSheet: (sheetName: string) => void;
  closeSheet: (sheetName: string) => void;
  closeAllSheets: () => void;
}

export const useSheetStore = create<SheetStore>((set) => ({
  isMusicSheetOpen: false,
  isCardSheetOpen: false,
  openSheet: (sheetName) => set((prevState) => ({ ...prevState, [sheetName]: true })), // 개별 오픈
  closeSheet: (sheetName) => set((prevState) => ({ ...prevState, [sheetName]: false })), // 개별 닫기
  closeAllSheets: () => set({ isMusicSheetOpen: false, isCardSheetOpen: false }), // 한 번에 닫기
}));

// 사용예시
// 카드 상세 모달시트 띄우기
// openSheet('isCardSheetOpen')
// 노래 검색 모달시트 띄우기
// openSheet('isMusicSheetOpen')

// 둘다 창 지우기
// closeAllSheets()

import { create } from 'zustand';

interface SheetStore {
  isMusicSheetOpen: boolean;
  isCardSheetOpen: boolean;
  isChatLoadingSheetOpen: boolean;
  openSheet: (sheetName: string) => void;
  closeSheet: (sheetName: string) => void;
  closeAllSheets: () => void;
  //임시
  currentRecord: Partial<EmotionRecord> | null;
  setCurrentRecord: (record: Partial<EmotionRecord> | null) => void;
}

export const useSheetStore = create<SheetStore>((set) => ({
  isMusicSheetOpen: false,
  isCardSheetOpen: false,
  isChatLoadingSheetOpen: false,
  openSheet: (sheetName) => set((prevState) => ({ ...prevState, [sheetName]: true })), // 개별 오픈
  closeSheet: (sheetName) => set((prevState) => ({ ...prevState, [sheetName]: false })), // 개별 닫기
  closeAllSheets: () =>
    set((prevState) => ({
      ...prevState,
      isChatLoadingSheetOpen: false,
      isMusicSheetOpen: false,
      isCardSheetOpen: false,
    })), // 한 번에 닫기
  currentRecord: null,
  setCurrentRecord: (record) => set((prevState) => ({ ...prevState, currentRecord: record })),
}));

// 사용예시
// 카드 상세 모달시트 띄우기
// openSheet('isCardSheetOpen')
// 노래 검색 모달시트 띄우기
// openSheet('isMusicSheetOpen')

// 모든 창 지우기
// closeAllSheets()

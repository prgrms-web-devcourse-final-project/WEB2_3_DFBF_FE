import { create } from 'zustand';

interface SheetStore {
  isMusicSheetOpen: boolean;
  isCardSheetOpen: boolean;
  isRequestSendingSheetOpen: boolean; // 요청 보낼때 시트
  isRequestReceivingSheetOpen: boolean; // 요청 받을 때 시트

  openSheet: (sheetName: string) => void;
  closeSheet: (sheetName: string) => void;
  closeAllSheets: () => void;
  //임시
  currentRecord: Partial<EmotionRecord> | null;
  setCurrentRecord: (record: Partial<EmotionRecord> | null) => void;

  requesterInfo: {
    emotionRecordId: null | number;
    nickname: string;
  };
  setRequesterInfo: (recordId: null | number, nickname: string) => void;

  // 채팅연결실패 유무
  isChatConnectFail: boolean;
  setChatConnectFail: (status: boolean) => void;
}

export const useSheetStore = create<SheetStore>((set) => ({
  isMusicSheetOpen: false,
  isCardSheetOpen: false,
  isRequestSendingSheetOpen: false,
  isRequestReceivingSheetOpen: false,

  // 채팅 요청한 사람의 정보
  requesterInfo: {
    emotionRecordId: null, // 어떤 레코드보고 했는지 채팅 요청했는지
    nickname: '', // 요청한 사람의 닉네임
  },
  isChatConnectFail: false,
  openSheet: (sheetName) => set((prevState) => ({ ...prevState, [sheetName]: true })), // 개별 오픈
  closeSheet: (sheetName) => set((prevState) => ({ ...prevState, [sheetName]: false })), // 개별 닫기
  closeAllSheets: () =>
    set((prevState) => ({
      ...prevState,
      isRequestSendingSheetOpen: false,
      isRequestReceivingSheetOpen: false,
      isMusicSheetOpen: false,
      isCardSheetOpen: false,
    })), // 한 번에 닫기
  currentRecord: null,
  setCurrentRecord: (record) => set((prevState) => ({ ...prevState, currentRecord: record })),
  setRequesterInfo: (emotionRecordId, nickname) =>
    set({ requesterInfo: { emotionRecordId, nickname } }),
  setChatConnectFail: (status) => set({ isChatConnectFail: status }),
}));

// 사용예시
// 카드 상세 모달시트 띄우기
// openSheet('isCardSheetOpen')
// 노래 검색 모달시트 띄우기
// openSheet('isMusicSheetOpen')

// 모든 창 지우기
// closeAllSheets()

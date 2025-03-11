import { create } from 'zustand';

interface ChatStore {
  currentChatRoomId: number | null;
  setCurrentChatRoomId: (id: number | null) => void;
  pastChatRoomId: number | null;
  setPastChatRoomId: (id: number | null) => void;
  pastRecord: ChatHistory | null;
  setPastRecord: (record: ChatHistory | null) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  currentChatRoomId: null,
  setCurrentChatRoomId: (id) => set({ currentChatRoomId: id }),
  pastChatRoomId: null,
  setPastChatRoomId: (id) => set({ pastChatRoomId: id }),
  pastRecord: null,
  setPastRecord: (record) => set({ pastRecord: record }),
}));

// 요청 받는 사람 입장
// 수락하기 누르면 응답 값으로 온 chatRoomId를  currentChatRoomId 로 설정

//요청한 사람 입장
// sse로 받은 chatRoomId를 currentChatRoomId 로 설정

//채팅방 나오면 null로

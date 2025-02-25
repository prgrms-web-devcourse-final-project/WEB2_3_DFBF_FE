import { axiosInstance } from './axios';

//채팅 목록 불러오기(지난 대화 기록 페이지)
export const loadChatList = async () => {
  const { data } = await axiosInstance.get(`/chat/room-list`);
  return data.data;
};

//채팅방 기록 불러오기(시간 끝난 채팅방 채팅 기록)
//수신,송신자 정보 / messageList 정보
export const loadChatMessages = async (roomId: number) => {
  const { data } = await axiosInstance.get(`/chat/messages/${roomId}`);
  return data.data;
};

//채팅 요청
export const requestChat = async (tag: string) => {
  const { data } = await axiosInstance.post(`/chat/chatroom`, {
    participantTag: tag,
  });
  return data;
};

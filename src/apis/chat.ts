import { axiosInstance } from './axios';

//채팅 목록 불러오기(지난 대화 기록 페이지)
export const loadChatList = async () => {
  const { data } = await axiosInstance.get(`/chat/room-list`);
  return data;
};

//채팅방 기록 불러오기(시간 끝난 채팅방 채팅 기록)
//수신,송신자 정보 / messageList 정보
export const loadChatMessages = async (roomId: number) => {
  const { data } = await axiosInstance.get(`/chat/messages/${roomId}`);
  return data;
};
//채팅 요청
export const requestChat = async (emotionRecordId: number) => {
  const { data } = await axiosInstance.post(`/chat/request`, emotionRecordId, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};
//채팅 요청 취소
export const cancelChatRequest = async (emotionRecordId: number) => {
  const { data } = await axiosInstance.delete(`/chat/request`, {
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(emotionRecordId),
  });
  return data;
};
//채팅방 생성
export const createChatroom = async (emotionRecordId: number) => {
  const { data } = await axiosInstance.post(
    `/chat/chatroom/create?recordId=${emotionRecordId}`,
    {},
  );
  return data;
};
//채팅방 닫기
export const closeChatroom = async (chatRoomId: number) => {
  const { data } = await axiosInstance.post(`/chat/chatroom/close?chatRoomId=${chatRoomId}`, {});
  return data;
};

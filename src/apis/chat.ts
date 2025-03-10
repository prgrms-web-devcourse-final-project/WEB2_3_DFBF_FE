import { axiosChatInstance, axiosInstance } from './axios';

//채팅 목록 불러오기(지난 대화 기록 페이지)
export const loadChatList = async () => {
  const { data } = await axiosInstance.get(`/chat/room-list`);
  return data;
};
//채팅 요청
export const requestChat = async (emotionRecordId: number) => {
  const { data } = await axiosInstance.post(`/chat/request?recordId=${emotionRecordId}`, {});
  return data;
};
//채팅 요청 취소
export const cancelChatRequest = async (emotionRecordId: number) => {
  const { data } = await axiosInstance.delete(`/chat/request?recordId=${emotionRecordId}`, {});
  return data;
};
//채팅방 생성
export const createChatroom = async (emotionRecordId: number, requestNickname: string) => {
  const { data } = await axiosInstance.post(
    `/chat/create?recordId=${emotionRecordId}&requestNickname=${requestNickname}`,
    {},
  );
  return data;
};
//채팅방 닫기
export const closeChatroom = async (chatRoomId: number) => {
  const { data } = await axiosInstance.post(`/chat/close?chatRoomId=${chatRoomId}`, {});
  return data;
};
//채팅방 기록 불러오기(개발서버)
export const loadChatHistoryDev = async (chatRoomId: number) => {
  const { data } = await axiosInstance.get(`/chat/history?chatRoomId=${chatRoomId}`);
  return data;
};
//채팅방 기록 불러오기(배포)
export const loadChatHistory = async (chatRoomId: number) => {
  const { data } = await axiosChatInstance.get(`/chat/history/${chatRoomId}`);
  return data;
};
//채팅방 상세 정보
export const loadChatRoomDetail = async (chatRoomId: number) => {
  const { data } = await axiosInstance.get(`/chat/room/detail`, {
    params: { chatRoomId: chatRoomId },
  });
  return data;
};

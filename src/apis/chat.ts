import { axiosInstance } from './axios';

export const loadChatList = async () => {
  const { data } = await axiosInstance.get(`/chat/room-list`);
  return data.data;
};

export const loadChatMessages = async (roomId: number) => {
  const { data } = await axiosInstance.get(`/chat/messages/${roomId}`);
  return data.data;
};

export const requestChat = async (tag: string) => {
  const { data } = await axiosInstance.post(`/chat/chatroom`, {
    participantTag: tag,
  });
  return data;
};

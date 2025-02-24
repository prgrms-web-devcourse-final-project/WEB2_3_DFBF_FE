import { axiosInstance } from './axios';

export const fetchBlockList = async () => {
  const { data } = await axiosInstance.get(`/blocklist/mypage/blackListSearch`);
  return data.data;
};

export const addBlockList = async (tag: string) => {
  const { data } = await axiosInstance.post(`/blackList`, {
    tag: tag,
  });
  return data.data;
};

export const deleteBlockList = async (id: number) => {
  const { data } = await axiosInstance.post(`/blackList`, {
    blockListId: id,
  });
  return data.data;
};

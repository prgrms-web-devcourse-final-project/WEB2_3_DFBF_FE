import { axiosInstance } from './axios';

export const fetchBlockList = async () => {
  const { data } = await axiosInstance.get(`/blocklist/mypage/blackListSearch`);
  return data;
};

export const addBlockList = async (tag: string) => {
  const { data } = await axiosInstance.post(`/blocklist`, {
    tag: tag,
  });
  return data;
};

export const deleteBlockList = async (id: number) => {
  const { data } = await axiosInstance.delete(`/blocklist`, {
    headers: {
      'Content-Type': `application/json`,
    },
    data: JSON.stringify(id),
  });
  return data;
};

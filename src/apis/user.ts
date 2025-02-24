import { axiosInstance } from '@/apis/axios';

// 닉네임 중복를 확인하는 함수
export const getNicknameAvailability = async (nickname: string) => {
  const response = await axiosInstance.get('/user/checkNickName', {
    params: { nickName: nickname },
  });
  return response;
};

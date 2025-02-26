import { axiosInstance } from '@/apis/axios';

// 닉네임 중복를 확인하는 함수
export const getNicknameAvailability = async (nickname: string) => {
  const response = await axiosInstance.get('/user/checkNickName', {
    params: { nickName: nickname },
  });
  return response;
};

// 아이디 중복를 확인하는 함수
export const getIdAvailability = async (loginId: string) => {
  const response = await axiosInstance.get('user/checkLoginId', {
    params: { loginId },
  });
  return response;
};

// 회원가입
export const postSignUp = async (
  nickName: string,
  loginId: string,
  password: string,
  email: string,
) => {
  const response = await axiosInstance.post('/user/signup', {
    nickName,
    socialId: null,
    socialType: 'NONE',
    loginId,
    password,
    email,
  });
  return response;
};

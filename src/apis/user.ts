import { axiosInstance } from '@/apis/axios';

// 닉네임 중복를 확인하는 함수
export const getNicknameAvailability = async (nickname: string) => {
  const { data } = await axiosInstance.get('/user/checkNickName', {
    params: { nickName: nickname },
  });
  return data;
};

// 아이디 중복를 확인하는 함수
export const getIdAvailability = async (loginId: string) => {
  const { data } = await axiosInstance.get('user/checkLoginId', {
    params: { loginId },
  });
  return data;
};

// 회원가입
export const postSignUp = async (
  nickName: string,
  loginId: string,
  password: string,
  email: string,
) => {
  const { data } = await axiosInstance.post('/user/signup', {
    nickName,
    socialId: null,
    socialType: 'NONE',
    loginId,
    password,
    email,
  });
  return data;
};

// 마이페이지 정보 불러오기
export const getMyProfile = async () => {
  const { data } = await axiosInstance.get('/user/mypage');
  return data;
};

// 타 유저 정보 불러오기
export const getUserProfile = async (tag: string) => {
  const { data } = await axiosInstance.get('/user/profile', {
    params: { tag },
  });

  return data;
};

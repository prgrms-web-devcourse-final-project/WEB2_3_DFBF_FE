import { axiosInstance } from '@/apis/axios';

interface UserProfileEdit {
  email: string;
  loginId: string;
  password: string;
  nickName: string;
  spotifyId: string | -1;
  title: string;
  artist: string;
  albumImage: string;
}

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

//현재 비밀번호 확인
export const checkPassword = async (currentPassword: string) => {
  const { data } = await axiosInstance.post(`/user/checkPassword`, {
    password: currentPassword,
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
//유저 정보 수정
export const patchEditProfile = async (editInfo: Partial<UserProfileEdit>) => {
  const { data } = await axiosInstance.patch(`/user`, editInfo);
  return data;
};

// 회원 정보 조회
export const getUserInfo = async () => {
  const { data } = await axiosInstance.get('/user');
  return data;
};

// 회원 탈퇴
export const deleteAccount = async () => {
  const { data } = await axiosInstance.delete('/user');
  return data;
};

// 유저 채팅 상태
export const getUserStatus = async (loginId: string) => {
  const { data } = await axiosInstance.get(`/userStatus/${loginId}`);
  return data;
};

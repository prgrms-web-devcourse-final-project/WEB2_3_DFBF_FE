import { axiosInstance } from '@/apis/axios';

interface SignUpPayload {
  nickName: string;
  loginId: string;
  password: string;
  email: string;
}

// 회원가입
export const postSignUp = async ({ nickName, loginId, password, email }: SignUpPayload) => {
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

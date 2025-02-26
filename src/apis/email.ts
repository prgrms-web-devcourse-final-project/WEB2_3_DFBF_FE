import { axiosInstance } from '@/apis/axios';

// 이메일 중복을 확인하는 함수
export const getEmailAvailability = async (email: string) => {
  const response = await axiosInstance.get('/mail/check-email', {
    params: { email: email },
  });
  return response;
};

// 이메일 인증을 요청하는 함수
export const postEmailVerificationRequest = async (email: string) => {
  const response = await axiosInstance.post('/mail/verify', null, { params: { email } });
  return response;
};

// 이메일 인증을 확인하는 함수
export const postEmailVerificationCheck = async (email: string, code: string) => {
  const response = await axiosInstance.post('/mail/verify/check', null, {
    params: { email, authCode: code },
  });
  return response;
};

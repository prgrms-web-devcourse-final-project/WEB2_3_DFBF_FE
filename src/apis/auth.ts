import axios from 'axios';
import { axiosInstance } from './axios';
import { useAuthStore } from '@/store/authStore';

// 로그인
export const login = async (loginId: string, password: string) => {
  const { data } = await axiosInstance.post('/auth/login', {
    loginId,
    password,
  });
  if (data.code === 200) {
    const accessToken = data.data.accessToken;
    useAuthStore.getState().setAccessToken(accessToken); // 토큰 전역 상태 저장
    return data;
  } else {
    throw new Error('로그인 실패');
  }
};

// 로그아웃
export const postLogout = async () => {
  const { data } = await axiosInstance.post('/auth/logout');
  return data;
};

// 토큰 재발급
export const reissueToken = async () => {
  const { data } = await axios.post('/api/auth/token', {
    withCredentials: true,
  });

  const accessToken = data.data.accessToken; // 새로운 AT
  const code = data.code; // 200: 성공

  if (code === 200) {
    useAuthStore.getState().setAccessToken(accessToken); // 토큰 전역 상태 저장
    console.log('토큰 재발급 성공:', accessToken);
  }
  return data;
};

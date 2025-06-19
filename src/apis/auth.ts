import axios from 'axios';
import { axiosInstance } from './axios';
import { useAuthStore } from '@/store/authStore';

const API_BASE_URL =
  import.meta.env.MODE === 'development'
    ? '/api/auth/token' // ✅ 개발 환경에서는 프록시를 사용
    : import.meta.env.VITE_API_URL + '/api/auth/token'; // ✅ 배포 환경에서는 직접 API 호출

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
  const { data } = await axios.post(`${API_BASE_URL}`, {
    withCredentials: true,
  });

  const accessToken = data.data.accessToken; // 새로운 AT
  const code = data.code; // 200: 성공

  if (code === 200) {
    useAuthStore.getState().setAccessToken(accessToken); // 토큰 전역 상태 저장
    // // console.log('토큰 재발급 성공:', accessToken);
  } else {
    throw new Error('토큰 재발급 실패');
  }
  return data;
};

// 카카오 로그인
export const getKakaoLogin = async (code: string) => {
  const { data } = await axiosInstance.get('/auth/login/kakao', { params: { code } });
  return data;
};

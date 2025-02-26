import { axiosInstance } from './axios';
import { useAuthStore } from '@/store/authStore';

// 로그인
export const login = async (loginId: string, password: string) => {
  const { data } = await axiosInstance.post('/auth/login', {
    loginId,
    password,
  });
  const accessToken = data.data.accessToken;
  useAuthStore.getState().setAccessToken(accessToken); // 토큰 전역 상태 저장
  return data;
};

// 로그아웃
export const logout = async () => {
  await axiosInstance.post('/auth/logout');
  useAuthStore.getState().logout(); // 전역 상태 초기화
  window.location.href = '/'; // 랜딩 페이지로 이동
};

//TODO: 여기 수정
//axiosInstance로 해도 되는지 모르겠음...
// 토큰 재발급
export const reissueToken = async () => {
  console.log('토큰 재발급');
  const { data } = await axiosInstance.post('/auth/token');
  const accessToken = data.data.accessToken; // 새로운 AT
  const code = data.code; // 200: 성공, 400: 실패

  if (code === 200) {
    useAuthStore.getState().setAccessToken(accessToken); // 토큰 전역 상태 저장
    console.log('🎉 토큰 재발급 성공:', accessToken);
  }

  if (code === 400) {
    useAuthStore.getState().logout(); // 전역 상태 초기화
    console.log('🚨 토큰 재발급 실패:', data);
    window.location.href = '/'; // 랜딩 페이지로 이동
  }

  return data;
};

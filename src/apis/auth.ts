import { axiosInstance } from './axios';
import { useAuthStore } from '@/store/authStore';

// 로그인
export const login = async (loginId: string, password: string) => {
  try {
    const { data } = await axiosInstance.post('/auth/login', {
      loginId,
      password,
    });
    useAuthStore.getState().login(data.data.accessToken); // 토큰 전역 상태 저장
    // console.log('로그인 됨', data);
    return data;
  } catch (error) {
    console.log('로그인 에러', error);
    throw error;
  }
};

// 로그아웃
export const logout = async () => {
  try {
    await axiosInstance.post('/auth/logout');
    useAuthStore.getState().logout(); // 전역 상태 초기화
    window.location.href = '/'; // 랜딩 페이지로 이동
  } catch (error) {
    console.log('로그아웃 에러', error);
    throw error;
  }
};

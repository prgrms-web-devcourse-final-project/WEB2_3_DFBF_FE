import { axiosInstance } from './axios';
import { useAuthStore } from '@/store/authStore';

// 로그인
export const login = async (loginId: string, password: string) => {
  try {
    const { data } = await axiosInstance.post('/auth/login', {
      loginId,
      password,
    });
    const accessToken = data.data.accessToken;
    useAuthStore.getState().setAccessToken(accessToken); // 토큰 전역 상태 저장
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

// 토큰 재발급
export const reissueToken = async () => {
  try {
    const { data } = await axiosInstance.post('/auth/token');
    const accessToken = data.data.accessToken; // 새로운 AT
    const code = data.code; // 200: 성공, 400: 실패
    console.log('토큰 재발급:', data);

    if (code === 200) {
      useAuthStore.getState().setAccessToken(accessToken); // 토큰 전역 상태 저장
      console.log('AT 재발급 성공:', accessToken);
    }

    if (code === 400) {
      useAuthStore.getState().logout(); // 전역 상태 초기화
      console.log('토큰 재발급 실패:', data);
      // window.location.href = '/'; // 랜딩 페이지로 이동
    }

    return data;
  } catch (error) {
    console.error(error);
    // window.location.href = '/'; // 랜딩  페이지로 이동
    throw error;
  }
};

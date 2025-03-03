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
  // useAuthStore.getState().logout(); // 전역 상태 초기화
  // window.location.href = '/'; // 랜딩 페이지로 이동
  return data;
};

// 토큰 재발급
export const reissueToken = async () => {
  const { data } = await axiosInstance.post('/auth/token');
  console.log('토큰 재발급:', data);

  if (data.data === null) return; // AT 토큰이 아직 유효하면 리턴

  const accessToken = data.data.accessToken; // 새로운 AT
  const code = data.code; // 200: 성공, 400: 실패

  if (code === 200) {
    useAuthStore.getState().setAccessToken(accessToken); // 토큰 전역 상태 저장
    console.log('토큰 재발급 성공:', accessToken);
  }

  if (code === 400) {
    // useAuthStore.getState().logout(); // 전역 상태 초기화
    console.log('토큰 재발급 실패:', data);
    // window.location.href = '/'; // 랜딩 페이지로 이동
  }

  // 유효하지 않은 토큰
  if (code === 401) {
    // useAuthStore.getState().logout(); // 전역 상태 초기화
    console.log('유효하지 않은 토큰:', data);
    // window.location.href = '/'; // 랜딩 페이지로 이동
  }
  return data;
};

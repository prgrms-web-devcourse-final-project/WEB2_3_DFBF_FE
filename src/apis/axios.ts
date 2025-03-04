import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { reissueToken } from '@/apis/auth';

export const axiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true, // RT 자동 포함
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  async (config) => {
    // 토큰 가져오기
    const token = useAuthStore.getState().accessToken;
    // 토큰이 있으면 요청 헤더에 추가
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log('요청 헤더에 Authorization 추가됨:', config.headers);
    }
    return config;
  },
  (error) => {
    console.log('요청 인터셉터 에러', error);
    Promise.reject(error);
  },
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 응답 에러 처리
    const originalRequest = error.config; // 실패한 요청 정보 저장

    // AT 토큰 만료 시
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 방지

      try {
        await reissueToken(); // 토큰 재발급 요청
        return axiosInstance(originalRequest); // 원래 요청 다시 시도
      } catch (error) {
        useAuthStore.persist.clearStorage();
        console.error('AT 토큰 재발급 실패:', error);

        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

// .env에 추가하기
// VITE_API_URL=http://43.203.98.65:8080

// 사용예시
//  const login = async () => {
//    const data = await axiosInstance.post('/user/login', {
//      loginId: 'test1234',
//      password: 'test1234!',
//    });
//  };

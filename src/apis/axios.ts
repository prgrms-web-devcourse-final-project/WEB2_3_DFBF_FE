import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
      console.log('요청 헤더에 Authorization 추가됨:', config.headers);
    }
    return config;
  },
  (error) => {
    console.log('요청 인터셉터 에러', error);
    //에러를 다시 호출한 곳으로 넘김(try-catch에서 감지할 수 있도록 함)
    Promise.reject(error);
  },
);

// .env에 추가하기
// VITE_API_URL=http://43.203.98.65:8080/api

// 사용예시
//  const login = async () => {
//    const data = await axiosInstance.post('/user/login', {
//      loginId: 'test1234',
//      password: 'test1234!',
//    });
//  };

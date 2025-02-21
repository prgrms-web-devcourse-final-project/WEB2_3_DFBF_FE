import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// api.interceptors.request.use(async (config) => {
// 토큰 가져오기
// const token =
// 토큰이 있으면 요청 헤더에 추가
// if (token) {
//   config.headers['Authorization'] = `Bearer ${token}`;
// }
//   return config;
// });

// .env에 추가하기
// VITE_API_URL=http://43.203.98.65:8080/api

// 사용예시
//  const login = async () => {
//    const data = await axiosInstance.post('/user/login', {
//      loginId: 'test1234',
//      password: 'test1234!',
//    });
//  };

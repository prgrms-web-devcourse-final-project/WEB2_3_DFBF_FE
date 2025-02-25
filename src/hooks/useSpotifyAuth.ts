import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

// 클라이언트 자격 증명 방식 (Client Credentials Flow)
export const useSpotifyAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      checkTokenValidity();
    } else {
      // 인증되지 않은 상태에서는 아무 작업도 하지 않음
      setToken(null);
    }
  }, [isAuthenticated]);

  // Access Token을 가져오는 함수 (클라이언트 자격 증명 방식)
  const getAccessToken = async () => {
    const authHeader = `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`; // client_id와 client_secret을 Base64로 인코딩

    try {
      const response = await axios.post(TOKEN_URL, 'grant_type=client_credentials', {
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token, expires_in } = response.data;

      // Access Token을 로컬 스토리지에 저장하고 상태를 업데이트
      const expiresAt = Date.now() + expires_in * 1000;
      localStorage.setItem('spotify_access_token', access_token);
      localStorage.setItem('spotify_expires_at', expiresAt.toString());
      setToken(access_token);
    } catch (error) {
      console.error('Error fetching Spotify access token:', error);
    }
  };

  // 토큰 유효성 검사 (만료되었으면 새로 가져옴)
  const checkTokenValidity = () => {
    const storedToken = localStorage.getItem('spotify_access_token');
    const expiresAt = localStorage.getItem('spotify_expires_at');

    if (!storedToken || !expiresAt || Date.now() > Number(expiresAt)) {
      getAccessToken();
    } else {
      setToken(storedToken);
    }
  };

  return { token };
};

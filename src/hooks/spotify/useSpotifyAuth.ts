import axios from 'axios';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useSpotifyStore } from '@/store/spotifyStore';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

// 클라이언트 자격 증명 방식 (Client Credentials Flow)
export const useSpotifyAuth = () => {
  const { isAuthenticated } = useAuthStore();
  const { setToken, isTokenValid } = useSpotifyStore();
  useEffect(() => {
    // 로그인 되어있거나 토큰이 유효하지 않는 경우
    if (isAuthenticated && !isTokenValid()) {
      fetchAccessToken();
    }
  }, [isAuthenticated]);

  // Access Token을 가져오는 함수 (클라이언트 자격 증명 방식)
  const fetchAccessToken = async () => {
    const authHeader = `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`; // client_id와 client_secret을 Base64로 인코딩

    try {
      const response = await axios.post(TOKEN_URL, 'grant_type=client_credentials', {
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const { access_token, expires_in } = response.data;
      // useSpotifyStore zustand에 업데이트
      setToken(access_token, expires_in);
    } catch (error) {
      console.error('Error fetching Spotify access token:', error);
    }
  };
};

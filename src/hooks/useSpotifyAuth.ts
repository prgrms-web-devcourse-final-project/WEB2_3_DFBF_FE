import axios from "axios";
import { useEffect, useState } from "react";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
// const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
// const AUTH_URL = "https://accounts.spotify.com/authorize";
const TOKEN_URL = "https://accounts.spotify.com/api/token";

// useSpotifyAuth 훅 (로그인 및 토큰 관리)
export const useSpotifyAuth = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hash.get("access_token");
    const expiresIn = hash.get("expires_in");

    if (accessToken && expiresIn) {
      const expiresAt = Date.now() + Number(expiresIn) * 1000; // 현재 시간 + 만료 시간(ms)
      localStorage.setItem("spotify_access_token", accessToken);
      localStorage.setItem("spotify_expires_at", expiresAt.toString());
      setToken(accessToken);
      window.history.pushState({}, document.title, window.location.pathname);
    } else {
      // checkTokenValidity();
      getAccessToken();
    }
  }, []);

    // Access Token을 가져오는 함수 (클라이언트 자격 증명 방식)
    const getAccessToken = async () => {
      const authHeader = `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`; // client_id와 client_secret을 Base64로 인코딩
  
      try {
        const response = await axios.post(
          TOKEN_URL,
          'grant_type=client_credentials',
          {
            headers: {
              Authorization: authHeader,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
  
        const { access_token, expires_in } = response.data;
  
        // Access Token을 로컬 스토리지에 저장하고 상태를 업데이트
        localStorage.setItem("spotify_access_token", access_token);
        localStorage.setItem("spotify_expires_at", (Date.now() + expires_in * 1000).toString()); // 만료 시간 저장
        setToken(access_token);
      } catch (error) {
        console.error('Error fetching Spotify access token:', error);
      }
    };

  //토큰 유효성 검사
  // const checkTokenValidity = () => {
  //   const storedToken = localStorage.getItem("spotify_access_token");
  //   const expiresAt = localStorage.getItem("spotify_expires_at");

  //   if (!storedToken || !expiresAt || Date.now() > Number(expiresAt)) {
  //     login();
  //   } else {
  //     setToken(storedToken);
  //   }
  // };

  //로그인
  // const login = () => {
  //   const scope = "streaming user-read-playback-state user-modify-playback-state";
  //   const url = `${AUTH_URL}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scope)}`;
  //   window.location.href = url;
  // };

  return { token };
};

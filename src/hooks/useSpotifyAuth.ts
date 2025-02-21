import { useEffect, useState } from "react";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const AUTH_URL = "https://accounts.spotify.com/authorize";

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
      checkTokenValidity();
    }
  }, []);

  //토큰 유효성 검사
  const checkTokenValidity = () => {
    const storedToken = localStorage.getItem("spotify_access_token");
    const expiresAt = localStorage.getItem("spotify_expires_at");

    if (!storedToken || !expiresAt || Date.now() > Number(expiresAt)) {
      login();
    } else {
      setToken(storedToken);
    }
  };

  //로그인
  const login = () => {
    const scope = "streaming user-read-playback-state user-modify-playback-state";
    const url = `${AUTH_URL}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scope)}`;
    window.location.href = url;
  };

  return { token };
};

import { reissueToken } from '@/apis/auth';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useRef } from 'react';

const TOKEN_CHECK_INTERVAL = 25 * 60 * 1000; // 25분

export const useTokenExpired = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // ✅ interval 저장

  useEffect(() => {
    const checkTokenExpired = async () => {
      const accessToken = useAuthStore.getState().accessToken;
      if (!accessToken) return;

      try {
        const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
        const expTime = tokenPayload.exp * 1000; // 만료 시간
        const currentTime = Date.now(); // 현재 시간

        if (expTime - currentTime <= 1000 * 60 * 27) {
          await reissueToken(); // 토큰 재발급
        }
      } catch (error) {
        console.error('토큰 재발급 실패:', error);
      }
    };
    checkTokenExpired(); // 초기 실행

    // ✅ 기존 interval이 있다면 먼저 정리
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // ✅ interval 실행
    intervalRef.current = setInterval(() => {
      checkTokenExpired().catch((err) => console.error('❌ 토큰 체크 중 오류 발생:', err));
    }, TOKEN_CHECK_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);
};

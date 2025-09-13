import { useAuthStore } from '@/store/authStore';
import { useSheetStore } from '@/store/sheetStore';
import { closeSSE, getSSE } from '@/utils/sseClient';
import { useEffect } from 'react';

export function useSSE() {
  const { isAuthenticated, accessToken } = useAuthStore();
  const { openSheet, closeSheet, setRequesterInfo } = useSheetStore();
  useEffect(() => {
    // 토큰이 없거나 로그인 상태가 아니면 끊기
    if (!accessToken || !isAuthenticated) {
      closeSSE();
      return;
    }
    const es = getSSE(accessToken); // 토큰 있으면 연결 보장(토큰 바뀌면 재연결)

    // 📩 채팅 요청 받았을 때를 감지
    const onAlarm = (event: any) => {
      const { emotionRecordId, nickname } = JSON.parse(event.data);
      setRequesterInfo(emotionRecordId, nickname);
      openSheet('isRequestReceivingSheetOpen');
    };

    // 🚨 채팅 요청 취소를 받았을 때를 감지
    es.addEventListener('alarm', onAlarm);

    const onCancel = () => {
      console.log('🚨 SSE: 채팅 취소 수신!');
      closeSheet('isRequestReceivingSheetOpen');
    };

    es.addEventListener('cancel', onCancel);

    return () => {
      es.removeEventListener('alarm', onAlarm);
      es.removeEventListener('cancel', onCancel);
    };
  }, [accessToken, isAuthenticated]);
}

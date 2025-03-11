import { useAuthStore } from '@/store/authStore';
import { useSheetStore } from '@/store/sheetStore';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

export const useSSE = () => {
  const navigate = useNavigate();
  const { openSheet, closeSheet, setRequesterInfo, setChatConnectFail, closeAllSheets } =
    useSheetStore();
  const { isAuthenticated, accessToken } = useAuthStore();
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);
  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      console.log('토큰, 로그인 문제');
      return;
    }

    const connectSSE = () => {
      console.log('🔌 SSE: 연결 시도 중...');

      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      eventSourceRef.current = new EventSourcePolyfill(
        `${import.meta.env.VITE_API_URL}/api/alert/connect`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      const eventSource = eventSourceRef.current;

      eventSource.addEventListener('open', () => {
        console.log('✅ SSE: 연결 성공!');
      });

      eventSource.addEventListener('alarm', (event: any) => {
        console.log('📩 SSE: 채팅 요청 수신!', JSON.parse(event.data));
        const { emotionRecordId, nickname } = JSON.parse(event.data);
        setRequesterInfo(emotionRecordId, nickname);
        openSheet('isRequestReceivingSheetOpen');
      });

      eventSource.addEventListener('cancel', (event: any) => {
        console.log('🚨 SSE: 채팅 취소 수신!', JSON.parse(event.data));
        closeSheet('isRequestReceivingSheetOpen');
      });

      eventSource.addEventListener('fail', (event: any) => {
        console.log('⛔ SSE: 채팅 거절 수신!', JSON.parse(event.data));
        setChatConnectFail(true);
      });

      eventSource.addEventListener('accept', (event: any) => {
        console.log('✅ SSE: 채팅방으로 이동!', JSON.parse(event.data));
        const { chatRoomId } = JSON.parse(event.data);
        closeAllSheets();
        navigate(`/chatroom/${chatRoomId}`);
      });

      eventSource.addEventListener('error', (event) => {
        console.error('❌ SSE: 오류 발생!', event);
        eventSource.close();
      });
    };

    connectSSE();

    // 5초마다 연결 상태 확인
    const interval = setInterval(() => {
      if (eventSourceRef.current?.readyState === 2) {
        console.warn('⚠️ SSE: 연결이 끊어졌습니다. 다시 연결 시도...');
        eventSourceRef.current?.close();
        setTimeout(connectSSE, 1000);
      } else {
        console.log('🟢 SSE: 연결 정상 유지 중...');
      }
    }, 5000);

    // visibilitychange 이벤트로 화면이 보이면 다시 연결
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('👀 화면이 다시 보입니다. SSE 재연결 시도...');
        connectSSE();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      console.log('🔴 SSE: 연결 해제');
      eventSourceRef.current?.close();
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isAuthenticated, accessToken]);
};

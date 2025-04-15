import { useAuthStore } from '@/store/authStore';
import { useChatStore } from '@/store/chatStore';
import { useSheetStore } from '@/store/sheetStore';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

export const useSSE = () => {
  const navigate = useNavigate();
  const { openSheet, closeSheet, setRequesterInfo, setChatConnectFail, closeAllSheets } =
    useSheetStore();
  const { setCurrentChatRoomId } = useChatStore();
  const { isAuthenticated, accessToken } = useAuthStore();
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);
  const reconnectAttemptsRef = useRef(0); // 재연결 횟수 저장

  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      console.log('토큰, 로그인 문제');
      return;
    }

    const connectSSE = () => {
      if (reconnectAttemptsRef.current >= 20) {
        console.warn('🚫 SSE: 최대 재연결 횟수(20번) 초과, 더 이상 재연결하지 않습니다.');
        return;
      }

      console.log(`🔌 SSE: 연결 시도 중... (재연결 횟수: ${reconnectAttemptsRef.current})`);

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
        reconnectAttemptsRef.current = 0; // 연결 성공하면 재연결 횟수 초기화
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

        setCurrentChatRoomId(chatRoomId);
        closeAllSheets();
        navigate(`/chatroom/${chatRoomId}`);
      });

      eventSource.addEventListener('error', () => {
        console.error('❌ SSE: 오류 발생!');

        eventSource.close();

        if (reconnectAttemptsRef.current < 20) {
          reconnectAttemptsRef.current += 1;
          console.warn(
            `⚠️ SSE: 재연결 시도 중... (남은 재연결 횟수: ${20 - reconnectAttemptsRef.current})`,
          );
          setTimeout(connectSSE, 1000);
        } else {
          console.error('🚫 SSE: 최대 재연결 횟수 초과. 더 이상 재연결하지 않습니다.');
        }
      });
    };

    connectSSE();

    return () => {
      console.log('🔴 SSE: 연결 해제');
      eventSourceRef.current?.close();
    };
  }, [isAuthenticated, accessToken]);
};

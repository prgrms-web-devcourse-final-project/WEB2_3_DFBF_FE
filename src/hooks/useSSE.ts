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
    let timeoutId: NodeJS.Timeout;
    // 로그인 상태가 아니거나 토큰이 없으면 SSE 연결을 하지 않음
    if (!isAuthenticated || !accessToken) {
      console.log('로그아웃상태이거나 토큰이 없어서 SSE 연결을 해제합니다.');
      eventSourceRef.current?.close(); // 혹시 연결이 살아있으면 종료
      return;
    }

    const connectSSE = () => {
      // 최대 재연결 횟수 초과 시 종료
      if (reconnectAttemptsRef.current >= 3) {
        console.warn('🚫 SSE: 최대 재연결 횟수(3번) 초과, 더 이상 재연결하지 않습니다.');
        return;
      }

      console.log(`🔌 SSE: 연결 시도 중... (재연결 횟수: ${reconnectAttemptsRef.current})`);

      // 기존 연결이 있다면 종료
      eventSourceRef.current?.close();

      // 로그인 상태와 토큰을 한 번 더 검증
      if (!isAuthenticated || !accessToken) {
        console.log('⛔ SSE 연결 시도 중단: 로그아웃 상태거나 토큰 없음');
        return;
      }

      // SSE 연결
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

        if (reconnectAttemptsRef.current < 3) {
          reconnectAttemptsRef.current += 1;
          console.warn(
            `⚠️ SSE: 재연결 시도 중... (남은 재연결 횟수: ${3 - reconnectAttemptsRef.current})`,
          );
          timeoutId = setTimeout(connectSSE, 1000);
        } else {
          console.error('🚫 SSE: 최대 재연결 횟수 초과. 더 이상 재연결하지 않습니다.');
        }
      });
    };

    connectSSE();

    return () => {
      console.log('🔴 SSE: 연결 해제');
      clearTimeout(timeoutId);
      eventSourceRef.current?.close();
    };
  }, [isAuthenticated, accessToken]);
};

import logo from '@/assets/icons/logo.svg';
import MusicAnimation from '@components/MusicAnimation';
import { useEffect, useState } from 'react';
import { formattedTime } from '@/utils/formattedTime';
import ChatRequestFailSheet from '@/components/ChatConnectLoadingSheet/ChatRequestFailSheet';
import ChatRequestMessage from '@/components/ChatConnectLoadingSheet/ChatRequestMessage';
import ChatRequestButton from '@/components/ChatConnectLoadingSheet/ChatRequestButton';
import { useSheetStore } from '@/store/sheetStore';
import { getSSE } from '@/utils/sseClient';
import { useAuthStore } from '@/store/authStore';
import { useChatStore } from '@/store/chatStore';
import { useNavigate } from 'react-router';

export default function ChatConnectLoadingSheet({ type }: { type: 'sending' | 'receiving' }) {
  const { isChatConnectFail, setChatConnectFail, closeAllSheets } = useSheetStore();
  const [timeLeft, setTimeLeft] = useState(60); // 남은 시간
  const { isAuthenticated, accessToken } = useAuthStore();

  const { setCurrentChatRoomId } = useChatStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken || !isAuthenticated) return;
    const es = getSSE(accessToken);

    const onFail = () => {
      // console.log('⛔ SSE: 채팅 거절 수신!', JSON.parse(event.data));
      setChatConnectFail(true);
    };

    es.addEventListener('fail', onFail);

    const onAccept = (event: any) => {
      // console.log('✅ SSE: 채팅방으로 이동!', JSON.parse(event.data));
      const { chatRoomId } = JSON.parse(event.data);

      setCurrentChatRoomId(chatRoomId);
      closeAllSheets();
      navigate(`/chatroom/${chatRoomId}`);
    };

    es.addEventListener('accept', onAccept);
    return () => {
      es.removeEventListener('fail', onFail);
    };
  }, [accessToken, isAuthenticated, setChatConnectFail]);

  //타이머 60초
  useEffect(() => {
    const endTime = new Date().getTime() + 60 * 1000; // 현재 시간 + 60초

    const interval = setInterval(() => {
      const diff = Math.max(0, Math.ceil((endTime - new Date().getTime()) / 1000)); // 남은 초 계산

      setTimeLeft(diff);

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(0); // 0초로 고정
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      setChatConnectFail(false);
    }; //interval 정리
  }, []);

  // 남은 시간이 0이되면 연결실패 처리
  useEffect(() => {
    if (timeLeft === 0) {
      setChatConnectFail(true);
    }
  }, [timeLeft]);

  if (isChatConnectFail) {
    return <ChatRequestFailSheet />;
  }
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="relative w-full max-w-[600px] h-screen px-3 bg-background flex flex-col justify-center items-center">
        <img src={logo} className="w-[186px] h-[40px] mb-5" alt="로고" />
        <ChatRequestMessage type={type} />

        <MusicAnimation />
        <p className="body-large-b text-primary-normal mt-[120px] mb-2">
          {formattedTime(timeLeft)}
        </p>
        <ChatRequestButton type={type} />
      </div>
    </div>
  );
}

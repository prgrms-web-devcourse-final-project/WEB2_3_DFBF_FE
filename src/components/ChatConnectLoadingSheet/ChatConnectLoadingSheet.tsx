import logo from '@/assets/icons/logo.svg';
import MusicAnimation from '@components/MusicAnimation';
import { useEffect, useState } from 'react';
import { formattedTime } from '@/utils/formattedTime';
import ChatRequestFailSheet from '@/components/ChatConnectLoadingSheet/ChatRequestFailSheet';
import ChatRequestMessage from '@/components/ChatConnectLoadingSheet/ChatRequestMessage';
import ChatRequestButton from '@/components/ChatConnectLoadingSheet/ChatRequestButton';
import { useSheetStore } from '@/store/sheetStore';

export default function ChatConnectLoadingSheet({ type }: { type: 'sending' | 'receiving' }) {
  const { isChatConnectFail, setChatConnectFail } = useSheetStore();
  const [timeLeft, setTimeLeft] = useState(60); // 남은 시간
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

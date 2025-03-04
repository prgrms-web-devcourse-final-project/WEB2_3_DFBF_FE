import logo from '@/assets/icons/logo.svg';
import sad from '@/assets/icons/sad-icon.svg';
import MusicAnimation from './MusicAnimation';
import Button from './Button';
import { useSheetStore } from '@/store/sheetStore';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { cancelChatRequest } from '@/apis/chat';
import { useNavigate } from 'react-router';
dayjs.extend(duration);

export default function ChatConnectLoadingSheet() {
  const navigate = useNavigate();
  //zustand로 관리
  //거절, 취소하거나 홈으로 가기 누르면 false로
  const { currentRecord, closeAllSheets, closeSheet } = useSheetStore();

  const [timeLeft, setTimeLeft] = useState(60);

  const [connetFail, setConnectFail] = useState(false);

  const handleClickToHome = () => {
    closeAllSheets();
    navigate('/home');
  };

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

    return () => clearInterval(interval); //interval 정리
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setConnectFail(true);
    }
  }, [timeLeft]);

  const formattedTime = dayjs.duration(timeLeft, 'seconds').format('mm:ss');

  //채팅 요청 취소
  const cancel = async () => {
    console.log(currentRecord);
    if (!currentRecord) {
      console.log('record가 존재하지 않습니다');
      return;
    }
    try {
      await cancelChatRequest(currentRecord.recordId);
      console.log('채팅 취소');

      closeSheet('isChatLoadingSheetOpen');
    } catch (error) {
      console.log(error);
    }
  };

  const isReceiver = false;

  if (connetFail) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="relative w-full max-w-[600px] h-screen px-3 bg-background flex flex-col justify-center items-center">
          <img src={logo} className="w-[186px] h-[40px] mb-5" alt="로고" />
          <p className="h4-b text-center text-gray-50 mb-2">
            <span className="text-primary-normal">{currentRecord?.nickName}</span>
            <span>님과 연결되지 않았어요</span>
          </p>

          <p className="caption-r text-center text-gray-60 mb-5">
            괜찮아요! 새로운 감정을 공유할 <br /> 다른 사람을 찾아볼까요?
          </p>
          <img src={sad} alt="연결실패" />

          <div className="absolute bottom-10 flex gap-[6px] px-3 w-full">
            <Button onClick={handleClickToHome} variant="primary">
              홈으로 가기
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="relative w-full max-w-[600px] h-screen px-3 bg-background flex flex-col justify-center items-center">
        <img src={logo} className="w-[186px] h-[40px] mb-5" alt="로고" />
        <p className="h4-b text-center text-gray-50 mb-2">
          {/* 요청하는 사람일 결우 */}
          {!isReceiver && (
            <span>
              <span className="text-primary-normal">{currentRecord?.nickName}</span>님에게 대화 요청
              중...
            </span>
          )}
          {/* 받는 사람일 경우 */}
          {isReceiver && <span className="text-primary-normal">보내는 사람</span>}
        </p>
        {/* 요청하는 사람일 결우 */}
        {!isReceiver && (
          <p className="caption-r text-center text-gray-60 mb-5">
            곧 새로운 연결이 시작됩니다. <br /> 잠시만 기다려주세요!
          </p>
        )}
        {/* 받는 사람일 경우 */}
        {isReceiver && (
          <p className="caption-r text-center text-gray-60 mb-5">
            <span>보내는 사람</span> 님이 대화를 요청했어요 <br /> 함께 이야기해 볼까요?
          </p>
        )}

        <MusicAnimation />
        <p className="body-large-b text-primary-normal mt-[120px] mb-2">{formattedTime}</p>
        {/* 요청하는 사람일 결우 */}
        {!isReceiver && (
          <button
            onClick={cancel}
            className="caption-r text-gray-50 cursor-pointer border-b border-gray-50"
          >
            취소하기
          </button>
        )}
        {/* 받는 사람일 경우 */}
        {isReceiver && (
          <div className="absolute bottom-10 flex gap-[6px] px-3 w-full">
            <Button variant="primary">수락하기</Button>
            <Button variant="secondary">거절하기</Button>
          </div>
        )}
      </div>
    </div>
  );
}

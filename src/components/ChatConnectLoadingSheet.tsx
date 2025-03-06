import logo from '@/assets/icons/logo.svg';
import sad from '@/assets/icons/sad-icon.svg';
import MusicAnimation from './MusicAnimation';
import Button from './Button';
import { useSheetStore } from '@/store/sheetStore';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { cancelChatRequest, createChatroom } from '@/apis/chat';
import { useNavigate } from 'react-router';
dayjs.extend(duration);

export default function ChatConnectLoadingSheet() {
  const navigate = useNavigate();

  const { currentRecord, setCurrentRecord, closeAllSheets, closeSheet } = useSheetStore();

  const [timeLeft, setTimeLeft] = useState(60);

  const [connetFail, setConnectFail] = useState(false);

  const handleClickToHome = () => {
    closeAllSheets();
    navigate('/home');
  };

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

    return () => clearInterval(interval); //interval 정리
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setConnectFail(true);
    }
  }, [timeLeft]);

  const formattedTime = dayjs.duration(timeLeft, 'seconds').format('mm:ss');

  const isReceiver = true;

  //채팅 요청 취소(요청 보낸 사람)
  const cancel = async () => {
    if (!currentRecord?.recordId) {
      console.log('record가 존재하지 않습니다');
      return;
    }
    try {
      console.log(currentRecord);
      await cancelChatRequest(currentRecord.recordId);
      console.log('채팅 취소');

      closeSheet('isChatLoadingSheetOpen');
    } catch (error) {
      console.log(error);
    }
  };

  //채팅방 생성 (요청 받는 사람 입장에서 생성?)
  //sse로 받은 recordId로 채팅방 생성
  //sse로 받은 상대 정보로 '보내는 사람' 바꾸기
  //생성 시 currentRecord 에 id 저장
  const createChat = async () => {
    try {
      const data = await createChatroom(10);
      console.log(data);
      const chatRoomId = data.data.chatRoomId;

      if (data.code === 200) {
        //임시
        setCurrentRecord({ recordId: 10 });
        //
        navigate(`/chatroom/10`);
        closeAllSheets();
      }
      //409 이면 이미 채팅방 있음 => 기존 채팅방으로
    } catch (error) {
      console.log(error);
    }
  };

  //채팅 요정 거절
  //거절 하면 거절한 사람은 바로 시트 닫기.
  //요청 거절당한 사람은 connectFail = true
  const refuseRequest = () => {
    closeSheet('isChatLoadingSheetOpen');
  };

  //채팅 신청한 사람은 상대가 수락했다는 sse 받으면 closeAllSheet, chatroom으로 이동

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
            <Button onClick={createChat} variant="primary">
              수락하기
            </Button>
            <Button onClick={refuseRequest} variant="secondary">
              거절하기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

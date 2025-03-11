import logo from '@/assets/icons/logo.svg';
import Button from '@/components/Button';
import sad from '@/assets/icons/sad-icon.svg';
import { useNavigate } from 'react-router';
import { useSheetStore } from '@/store/sheetStore';
import { useChatStore } from '@/store/chatStore';

function ChatRequestFailSheet() {
  const navigate = useNavigate();
  const { currentRecord, closeSheet } = useSheetStore();
  const { pastRecord } = useChatStore();
  const handleClickToHome = () => {
    closeSheet('isRequestSendingSheetOpen');
    closeSheet('isRequestReceivingSheetOpen');
    navigate('/home');
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="relative w-full max-w-[600px] h-screen px-3 bg-background flex flex-col justify-center items-center">
        <img src={logo} className="w-[186px] h-[40px] mb-5" alt="로고" />
        <p className="h4-b text-center text-gray-50 mb-2">
          <span className="text-primary-normal">
            {currentRecord?.nickName || pastRecord?.nickname}
          </span>
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

export default ChatRequestFailSheet;

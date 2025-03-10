import { useSheetStore } from '@/store/sheetStore';

interface ChatRequestMessageProps {
  type: 'sending' | 'receiving';
}

function ChatRequestMessage({ type }: ChatRequestMessageProps) {
  const { requesterInfo } = useSheetStore();
  const { currentRecord } = useSheetStore();
  if (type === 'sending') {
    return (
      <>
        <p className="h4-b text-center text-gray-50 mb-2">
          <span className="text-primary-normal">{currentRecord?.nickName || '테스트'}</span>님에게
          대화 요청 중...
        </p>
        <p className="caption-r text-center text-gray-60 mb-5">
          곧 새로운 연결이 시작됩니다. <br /> 잠시만 기다려주세요!
        </p>
      </>
    );
  } else {
    return (
      <>
        <>
          <p className="h4-b text-center text-gray-50 mb-2">
            <span className="text-primary-normal">{requesterInfo?.nickname || '테스트'}</span> 님이
            대화를 요청했어요
          </p>
          <p className="caption-r text-center text-gray-60 mb-5">함께 이야기해 볼까요?</p>
        </>
      </>
    );
  }
}

export default ChatRequestMessage;

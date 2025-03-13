import { cancelChatRequest, createChatroom, postRejectChat } from '@/apis/chat';
import { getEmotionRecordById } from '@/apis/emotionRecord';
import Button from '@/components/Button';
import { useChatStore } from '@/store/chatStore';
import { useModalStore } from '@/store/modalStore';
import { useSheetStore } from '@/store/sheetStore';
import { useNavigate } from 'react-router';

function ChatRequestButton({ type }: { type: 'sending' | 'receiving' }) {
  const navigate = useNavigate();
  const { requesterInfo, currentRecord, setCurrentRecord, closeAllSheets, closeSheet } =
    useSheetStore(); // 시트관리
  const { openModal, closeModal } = useModalStore(); // 모달관리
  const { pastRecord } = useChatStore();
  const { setCurrentChatRoomId } = useChatStore();

  //채팅 요청 취소(요청 보낸 사람)
  const cancel = async () => {
    if (!currentRecord?.recordId && !pastRecord?.recordId) {
      console.log('record가 존재하지 않습니다');
      return;
    }
    try {
      console.log(currentRecord);
      const { code } = await cancelChatRequest(
        currentRecord?.recordId || Number(pastRecord?.recordId),
      );
      if (code === 200) {
        console.log('취소 요청 성공');
        closeSheet('isRequestSendingSheetOpen');
      } else {
        throw new Error('취소 요청 실패');
      }
    } catch (error) {
      console.error(error);
      closeSheet('isRequestSendingSheetOpen'); // 취소 요청 실패시 창 닫기
    }
  };

  //채팅방 생성 (요청 받는 사람 입장에서 생성?)
  //sse로 받은 recordId로 채팅방 생성
  //sse로 받은 상대 정보로 '보내는 사람' 바꾸기
  const createChat = async () => {
    try {
      const { code, data, message } = await createChatroom(
        requesterInfo.emotionRecordId as number,
        requesterInfo.nickname,
      );
      console.log(code, message, data);

      if (code === 200) {
        const chatRoomId = data.chatRoomId;
        const res = await getEmotionRecordById(requesterInfo.emotionRecordId as number);
        setCurrentRecord(res);
        setCurrentChatRoomId(chatRoomId);
        navigate(`/chatroom/${chatRoomId}`);
        closeAllSheets();
      }
      else if (code === 500) {
        openModal({
          title: 'SSE가 연결되지 않았습니다',
          onConfirm: () => {
            closeModal();
          },
        });
      } else {
        throw new Error('이미 취소된 요청입니다.');
      }
    } catch (error) {
      console.log(error);
      openModal({
        title: '이미 취소된 요청입니다',
        onConfirm: () => {
          closeModal();
          closeSheet('isRequestReceivingSheetOpen');
        },
      });
    }
  };

  //채팅 요정 거절
  //거절 하면 거절한 사람은 바로 시트 닫기.
  //요청 거절당한 사람은 connectFail = true
  const refuseRequest = async () => {
    try {
      const { code } = await postRejectChat(
        requesterInfo.emotionRecordId as number,
        requesterInfo.nickname,
      );
      if (code === 200) {
        console.log('거절 성공');
        closeSheet('isRequestReceivingSheetOpen');
      } else {
        throw new Error('요청 취소 실패');
      }
    } catch (error) {
      console.error(error);
      closeSheet('isRequestReceivingSheetOpen');
    }
  };

  if (type === 'sending') {
    return (
      <button
        onClick={cancel}
        className="caption-r text-gray-50 cursor-pointer border-b border-gray-50"
      >
        취소하기
      </button>
    );
  } else {
    return (
      <div className="absolute bottom-10 flex gap-[6px] px-3 w-full">
        <Button onClick={createChat} variant="primary">
          수락하기
        </Button>
        <Button onClick={refuseRequest} variant="secondary">
          거절하기
        </Button>
      </div>
    );
  }
}

export default ChatRequestButton;

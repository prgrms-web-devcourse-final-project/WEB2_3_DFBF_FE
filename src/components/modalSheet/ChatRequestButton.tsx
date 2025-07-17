import CardDetailButtons from '@/components/modalSheet/CardDetailButtons';
import headsetIcon from '@assets/icons/headset-icon-gray.svg';
import commentIcon from '@assets/icons/comment-icon.svg';
import { requestChat } from '@/apis/chat';
import { useSheetStore } from '@/store/sheetStore';
import { useModalStore } from '@/store/modalStore';

interface ChatRequestButtonProps {
  recordId: number;
}

const ChatRequestButton = ({ recordId }: ChatRequestButtonProps) => {
  const { openSheet } = useSheetStore(); // 모달 시트
  const { openModal, closeModal } = useModalStore();

  //채팅 요청 취소(요청 보낸 사람)
  // const cancel = async () => {
  //   if (!currentRecord?.recordId && !pastRecord?.recordId) {
  //     // console.log('record가 존재하지 않습니다');
  //     return;
  //   }
  //   try {
  //     // console.log(currentRecord);
  //     const { code } = await cancelChatRequest(
  //       currentRecord?.recordId || Number(pastRecord?.recordId),
  //     );
  //     if (code === 200) {
  //       // console.log('취소 요청 성공');
  //       closeSheet('isRequestSendingSheetOpen');
  //     } else {
  //       throw new Error('취소 요청 실패');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     closeSheet('isRequestSendingSheetOpen'); // 취소 요청 실패시 창 닫기
  //   }
  // };

  //채팅 요청
  //요청 보내면 sse로 recordId, 보낸 사람 정보 보내줘야 함
  const request = async () => {
    // if (!recordId) {
    //   // console.log('recordId가 존재하지 않습니다.');
    //   return;
    // }
    try {
      const { code } = await requestChat(recordId);
      if (code === 200) {
        openSheet('isRequestSendingSheetOpen');
      } else if (code === 202) {
        openModal({
          title: '현재 로그아웃 중입니다.',
          onConfirm: () => {
            closeModal();
            // cancel();
          },
        });
      } else {
        throw new Error('잠시 후 다시 시도해 주세요');
      }
    } catch (error) {
      // console.log(error);
      openModal({
        title: '잠시 후 다시 시도해 주세요',
        onConfirm: () => {
          closeModal();
        },
      });
    }
  };

  // 채팅 유무에 따라서 props다르게
  const chatButtonProps = false
    ? { icon: headsetIcon, label: '대화 중...' }
    : { icon: commentIcon, label: '대화하기', onClick: request };

  return <CardDetailButtons {...chatButtonProps} />;
};

export default ChatRequestButton;

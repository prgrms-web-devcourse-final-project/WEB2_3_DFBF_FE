import commentIcon from '@assets/icons/comment-icon.svg';
import homeIcon from '@assets/icons/home-icon.svg';
import CardDetailButtons from '@/components/modalSheet/CardDetailButtons';
import headsetIcon from '@assets/icons/headset-icon-gray.svg';
import playIcon from '@assets/icons/play/play-icon-gray.svg';
import pauseIcon from '@assets/icons/pause-icon-gray.svg';
import { useNavigate } from 'react-router';
import { useSheetStore } from '@/store/sheetStore';
import { cancelChatRequest, requestChat } from '@/apis/chat';
import { useModalStore } from '@/store/modalStore';
import { useChatStore } from '@/store/chatStore';

interface ChatActionButtonsProps {
  recordId: number;
  isChatting: boolean;
  isPlaying: boolean;
  isOwnPost: boolean; // 본인 글 여부
  authorId: string; // 작성자 id
  onPlayPauseToggle: () => void;
}

// 카드상세 모달에서 채팅중인지에 따라서 버튼 속성 결정
function ChatActionButtons({
  recordId,
  isChatting,
  isPlaying,
  isOwnPost,
  onPlayPauseToggle,
  authorId,
}: ChatActionButtonsProps) {
  const navigate = useNavigate();

  const { openSheet, closeSheet, currentRecord } = useSheetStore(); // 모달 시트
  const { pastRecord } = useChatStore();
  const { openModal, closeModal } = useModalStore();

  const handleGoToUserPage = () => {
    // closeAllSheets(); // 모든 시트를 닫아야할지 카드모달시트만 닫으면 될지 고민중
    navigate(`/user/${authorId}`); // 유저 페이지로 이동
  };

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

  //채팅 요청
  //요청 보내면 sse로 recordId, 보낸 사람 정보 보내줘야 함
  const request = async () => {
    // if (!recordId) {
    //   console.log('recordId가 존재하지 않습니다.');
    //   return;
    // }
    try {
      const { code } = await requestChat(recordId);
      console.log('code', code);
      if (code === 200) {
        openSheet('isRequestSendingSheetOpen');
      } else if (code === 202) {
        openModal({
          title: '현재 로그아웃 중입니다.',
          onConfirm: () => {
            closeModal();
            cancel();
          },
        });
      } else {
        throw new Error('잠시 후 다시 시도해 주세요');
      }
    } catch (error) {
      console.log(error);
      openModal({
        title: '잠시 후 다시 시도해 주세요',
        onConfirm: () => {
          closeModal();
        },
      });
    }
  };

  // 채팅 유무에 따라서 props다르게
  const chatButtonProps = isChatting
    ? { icon: headsetIcon, label: '대화 중...' }
    : { icon: commentIcon, label: '대화하기', onClick: request };

  // 노래 재생 유무에 따라서 다르게
  const playButtonProps = isPlaying
    ? { icon: pauseIcon, label: '재생 중...', onClick: onPlayPauseToggle }
    : { icon: playIcon, label: '재생하기', onClick: onPlayPauseToggle };

  return (
    <>
      {!isOwnPost && <CardDetailButtons {...chatButtonProps} />}
      {<CardDetailButtons {...playButtonProps} />}
      {!isOwnPost && (
        <CardDetailButtons icon={homeIcon} label="구경가기" onClick={handleGoToUserPage} />
      )}
    </>
  );
}

export default ChatActionButtons;

{
  /* <ChatActionButtons isChatting={isChatting} />; */
}

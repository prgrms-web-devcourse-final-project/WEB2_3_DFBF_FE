import commentIcon from '@assets/icons/comment-icon.svg';
import homeIcon from '@assets/icons/home-icon.svg';
import CardDetailButtons from '@/components/modalSheet/CardDetailButtons';
import headsetIcon from '@assets/icons/headset-icon-gray.svg';
import playIcon from '@assets/icons/play/play-icon-gray.svg';
import pauseIcon from '@assets/icons/pause-icon-gray.svg';
import { useNavigate } from 'react-router';
import { useSheetStore } from '@/store/sheetStore';
import { requestChat } from '@/apis/chat';

interface ChatActionButtonsProps {
  recordId: number;
  isChatting: boolean;
  isPlaying: boolean;
  isOwnPost: boolean; // 본인 글 여부(임시)
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

  const { openSheet, closeAllSheets } = useSheetStore(); // 모달 시트

  const handleGoToUserPage = () => {
    closeAllSheets(); // 모든 시트를 닫아야할지 카드모달시트만 닫으면 될지 고민중
    navigate(`/user/${authorId}`); // 유저 페이지로 이동
  };

  //채팅 요청
  const request = async () => {
    if (!recordId) {
      console.log('recordId가 존재하지 않습니다.');
      return;
    }
    try {
      const data = await requestChat(recordId);
      console.log(data);
      if (data.code === 200) {
        console.log('채팅 요청 성공');
  
        openSheet('isChatLoadingSheetOpen');
      } else {
      }
    } catch (error) {
      console.log(error);
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

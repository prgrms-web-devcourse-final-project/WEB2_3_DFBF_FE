import commentIcon from '@assets/icons/comment-icon.svg';
import homeIcon from '@assets/icons/home-icon.svg';
import CardDetailButtons from '@/components/modalSheet/CardDetailButtons';
import headsetIcon from '@assets/icons/headset-icon-gray.svg';
import playIcon from '@assets/icons/play/play-icon-gray.svg';
import pauseIcon from '@assets/icons/pause-icon-gray.svg';

interface ChatActionButtonsProps {
  isChatting: boolean;
  isPlaying: boolean;
  isOwnPost: boolean; // 본인 글 여부(임시)
  onPlayPauseToggle: () => void;
}

// 카드상세 모달에서 채팅중인지에 따라서 버튼 속성 결정
function ChatActionButtons({
  isChatting,
  isPlaying,
  isOwnPost,
  onPlayPauseToggle,
}: ChatActionButtonsProps) {
  // 채팅 유무에 따라서 props다르게
  const chatButtonProps = isChatting
    ? { icon: headsetIcon, label: '대화 중...' }
    : { icon: commentIcon, label: '대화하기' };

  // 노래 재생 유무에 따라서 다르게
  const playButtonProps = isPlaying
    ? { icon: pauseIcon, label: '재생 중...', onClick: onPlayPauseToggle }
    : { icon: playIcon, label: '재생하기', onClick: onPlayPauseToggle };

  return (
    <>
      {!isOwnPost && <CardDetailButtons {...chatButtonProps} />}
      {<CardDetailButtons {...playButtonProps} />}
      {!isOwnPost && <CardDetailButtons icon={homeIcon} label="구경가기" />}
    </>
  );
}

export default ChatActionButtons;

{
  /* <ChatActionButtons isChatting={isChatting} />; */
}

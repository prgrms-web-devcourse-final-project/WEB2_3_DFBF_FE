import homeIcon from '@assets/icons/home-icon.svg';
import CardDetailButtons from '@/components/modalSheet/CardDetailButtons';
import { useNavigate } from 'react-router';
import PlayToggleButton from '@/components/modalSheet/PlayToggleButton';
import ChatRequestButton from '@/components/modalSheet/ChatRequestButton';

interface ChatActionButtonsProps {
  recordId: number;
  videoId: string;
  isOwnPost: boolean; // 본인 글 여부
  authorId: string; // 작성자 id
}

// 카드상세 모달에서 채팅중인지에 따라서 버튼 속성 결정
function ChatActionButtons({ recordId, videoId, isOwnPost, authorId }: ChatActionButtonsProps) {
  const navigate = useNavigate();

  const handleGoToUserPage = () => {
    navigate(`/user/${authorId}`); // 유저 페이지로 이동
  };

  return (
    <div className="flex gap-10">
      {!isOwnPost && <ChatRequestButton recordId={recordId} />}
      <PlayToggleButton videoId={videoId} />
      {!isOwnPost && (
        <CardDetailButtons icon={homeIcon} label="구경가기" onClick={handleGoToUserPage} />
      )}
    </div>
  );
}

export default ChatActionButtons;

{
  /* <ChatActionButtons isChatting={isChatting} />; */
}

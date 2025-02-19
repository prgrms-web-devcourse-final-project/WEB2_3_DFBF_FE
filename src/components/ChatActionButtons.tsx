import commentIcon from '@assets/icons/comment-icon.svg';
import homeIcon from '@assets/icons/home-icon.svg';
import CardDetailButtons from '@/components/CardDetailButtons';
import headsetIcon from '@assets/icons/headset-icon-gray.svg';

// 카드상세 모달에서 채팅중인지에 따라서 버튼 속성 결정
function ChatActionButtons({ isChatting }: { isChatting: boolean }) {
  // 채팅 유무에 따라서 props다르게
  const chatButtonProps = isChatting
    ? { icon: headsetIcon, label: '대화 중...' }
    : { icon: commentIcon, label: '대화하기' };
  return (
    <>
      <CardDetailButtons {...chatButtonProps} />
      <CardDetailButtons icon={homeIcon} label="구경가기" />
    </>
  );
}

export default ChatActionButtons;

{
  /* <ChatActionButtons isChatting={isChatting} />; */
}

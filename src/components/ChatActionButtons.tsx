import Button from '@/components/Button';
import commentIcon from '@/assets/icons/comment-icon-white.svg';
import homeIcon from '@/assets/icons/home-icon.svg';

// 카드상세 모달에서 채팅중인지에 따라서 버튼 속성 결정
function ChatActionButtons({ isChatting }: { isChatting: boolean }) {
  return (
    <>
      <Button type={isChatting ? 'disabled' : 'primary'} className="w-full body-m">
        <div className="flex gap-1">
          <img src={commentIcon} alt="대화하기 아이콘" />
          <span>대화하기</span>
        </div>
      </Button>

      <Button type="secondary" className="w-full body-m">
        <div className="flex gap-1">
          <img src={homeIcon} alt="구경가기 아이콘" />
          <span>구경가기</span>
        </div>
      </Button>
    </>
  );
}

export default ChatActionButtons;

{
  /* <ChatActionButtons isChatting={isChatting} />; */
}

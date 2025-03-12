import logoIcon from '@assets/icons/logo-icon.svg';
import exitIcon from '@assets/icons/exit-icon.svg';
import { twMerge } from 'tailwind-merge';
import HedaerLayout from '@/layouts/header/HedaerLayout';
import { useModalStore } from '@/store/modalStore';
import { useNavigate, useParams } from 'react-router';
import { closeChatroom } from '@/apis/chat';
import { useChatStore } from '@/store/chatStore';
import { useSheetStore } from '@/store/sheetStore';

interface HeaderChatProps {
  showLogo?: boolean; // 로고 표시 여부
  showNickname?: boolean; // 닉네임 표시 여부
}

function HeaderChat({ showLogo = false, showNickname = false }: HeaderChatProps) {
  const navigate = useNavigate();
  const { chatRoomId } = useParams();
  // 로고와 닉네임이 모두 숨겨진 경우 `justify-end`, 아니면 `justify-between`
  const headerClass = showLogo || showNickname ? 'justify-between' : 'justify-end';

  const { pastRecord } = useChatStore();

  const { requesterInfo, currentRecord } = useSheetStore();

  const { openModal, closeModal } = useModalStore();

  const { wsDisconnect } = useChatStore();

  return (
    <HedaerLayout>
      <div className={twMerge('w-full flex items-center', headerClass)}>
        {/* 로고 */}
        {showLogo && <img src={logoIcon} alt="로고" />}

        {/* 닉네임 */}
        {showNickname && requesterInfo.nickname && (
          <span className="h4-b text-primary-normal">{requesterInfo.nickname}</span>
        )}
        {showNickname && (currentRecord?.nickName || pastRecord?.nickname) && (
          <span className="h4-b text-primary-normal">
            {currentRecord?.nickName || pastRecord?.nickname}
          </span>
        )}

        {/* 나가기 버튼 */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!currentRecord) {
              openModal({
                title: '이 대화를 마무리할까요?',
                message: '채팅을 종료하면 다시 복구할 수 없습니다',
                onConfirm: async () => {
                  if (!chatRoomId) {
                    console.log('chatroomid가 없습니다.');
                    return;
                  }
                  wsDisconnect();
                  await closeChatroom(Number(chatRoomId));
                  //+ 웹소켓 연결 끊기
                  //+ 로딩
                  navigate('/home');
                  closeModal();
                },
                onCancel: () => {
                  console.log('취소');
                  closeModal();
                },
              });
            } else {
              navigate('/chat');
            }
          }}
          className="cursor-pointer"
        >
          <img src={exitIcon} alt="나가기" />
        </button>
      </div>
    </HedaerLayout>
  );
}

export default HeaderChat;

// 사용방법
// <HeaderChat showLogo showNickname />
// <HeaderChat />

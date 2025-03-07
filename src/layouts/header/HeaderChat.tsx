import logoIcon from '@assets/icons/logo-icon.svg';
import exitIcon from '@assets/icons/exit-icon.svg';
import { twMerge } from 'tailwind-merge';
import HedaerLayout from '@/layouts/header/HedaerLayout';
import { useModalStore } from '@/store/modalStore';
import { useNavigate, useParams } from 'react-router';
import { closeChatroom } from '@/apis/chat';

interface HeaderChatProps {
  showLogo?: boolean; // 로고 표시 여부
  showNickname?: boolean; // 닉네임 표시 여부
}

function HeaderChat({ showLogo = false, showNickname = false }: HeaderChatProps) {
  const navigate = useNavigate();
  const { chatRoomId } = useParams();
  // 로고와 닉네임이 모두 숨겨진 경우 `justify-end`, 아니면 `justify-between`
  const headerClass = showLogo || showNickname ? 'justify-between' : 'justify-end';
  //채팅 기록 데이터 zustand
  const data = {
    sender: {
      nickname: '집가고싶다',
      profilePicture: 'sender_profile_picture_url',
    },
    receiver: {
      nickname: '어디가코딩해',
      profilePicture: 'receiver1_profile_picture_url',
    },
    messageList: [
      {
        messageId: 1001,
        type: 0,
        message: '제발 집좀 보내주세요 ㅠㅠ',
        sentAt: '2025-02-13 06:03',
      },
      {
        messageId: 1002,
        type: 1,
        message: '안돼.',
        sentAt: '2025-02-13 06:04',
      },
      {
        messageId: 1003,
        type: 0,
        message: '하..',
        sentAt: '2025-02-13 06:04',
      },
    ],
  };

  const { openModal, closeModal } = useModalStore();

  return (
    <HedaerLayout>
      <div className={twMerge('w-full flex items-center', headerClass)}>
        {/* 로고 */}
        {showLogo && <img src={logoIcon} alt="로고" />}

        {/* 닉네임 */}
        {showNickname && <span className="h4-b text-primary-normal">{data.receiver.nickname}</span>}

        {/* 나가기 버튼 */}
        <button
          onClick={(e) => {
            e.stopPropagation();

            openModal({
              title: '이 대화를 마무리할까요?',
              message: '채팅을 종료하면 다시 복구할 수 없습니다',
              onConfirm: async () => {
                if (!chatRoomId) {
                  console.log('chatroomid가 없습니다.');
                  return;
                }
                console.log('확인');
                console.log(chatRoomId);
                const data = await closeChatroom(Number(chatRoomId));
                console.log(data);
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

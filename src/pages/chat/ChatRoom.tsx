import sendIcon from '@/assets/icons/send-icon.svg';
import ChatMusicPlayer from './components/ChatMusicPlayer';
import Button from '@/components/Button';

interface ChatRoomProps {}

export default function ChatRoom({}: ChatRoomProps) {
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
        message: '제발 집좀 보내주세요 ㅠㅠ 111111111111223231',
        sentAt: '2025-02-13 06:03',
      },
      {
        messageId: 1002,
        type: 1,
        message: '안돼. 1111111111111111112222222222',
        sentAt: '2025-02-13 06:04',
      },
      {
        messageId: 1003,
        type: 0,
        message: '하..1111111111111111111232323',
        sentAt: '2025-02-13 06:04',
      },
      {
        messageId: 1004,
        type: 0,
        message: '하하호호111111111111111111111123233',
        sentAt: '2025-02-13 06:04',
      },
    ],
  };

  return (
    <div className="relative w-full max-w-[600px] mx-auto">
      {/* 상단 고정된 뮤직 플레이어 */}
      <div className="fixed top-[55px] left-1/2 -translate-x-1/2 w-full max-w-[600px]">
        <ChatMusicPlayer />
      </div>

      {/* 채팅 메시지 영역 */}
      <div className="mt-[100px] flex flex-col px-4">
        {data.messageList.map((msg, index) => {
          const isMyMessage = msg.type === 0;
          const prevMsg = data.messageList[index - 1];
          const isSameSender = prevMsg && prevMsg.type === msg.type;

          return (
            <div
              key={msg.messageId}
              className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-[75%] break-words ${
                  isMyMessage ? 'bg-primary-normal text-white' : 'bg-white text-gray-80'
                } ${isSameSender ? 'mt-1' : 'mt-4'}`}
              >
                {msg.message}
              </div>
            </div>
          );
        })}

        {/* 마지막 메시지의 시간 표시 */}
        <p className="text-gray-500 text-xs text-center mt-2">{data.messageList.at(-1)?.sentAt}</p>
      </div>

      <div className="px-3 pt-[5px] pb-[19px] bg-white max-w-[600px] fixed bottom-0 w-full left-1/2 -translate-x-1/2 z-41">
        <div className="flex justify-between mb-2 caption-b">
          <p className="text-gray-80">
            남은시간: <span className="text-primary-normal">08:45</span>
          </p>
          <p className="text-primary-normal">연장 요청 (0/2)</p>
        </div>
        <div className="flex gap-1">
          <input
            type="text"
            className="flex-1 border border-primary-hover rounded-full px-3 outline-0 caption-m text-gray-80 placeholder:text-gray-50"
            placeholder="메시지 입력"
          />
          <Button className="w-[32px] h-[32px] rounded-full">
            <img src={sendIcon} alt="send" />
          </Button>
        </div>
      </div>
    </div>
  );
}

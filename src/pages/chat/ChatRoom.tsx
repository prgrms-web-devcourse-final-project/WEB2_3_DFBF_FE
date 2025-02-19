import ChatMusicPlayer from './components/ChatMusicPlayer';

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
  return (
    <div className="relative w-full">
      <ChatMusicPlayer />
      <div className="mt-[83px] flex flex-col gap-1">
        <p className="bg-primary-normal text-white px-[11px] py-1 rounded-lg text-left w-fit max-w-[85%] self-end break-words">
          aaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbcccccccccccccccccccccddddddddddddeeeeeeeeee
        </p>
        <div className="bg-primary-normal text-white px-[11px] py-1 rounded-lg text-left w-fit max-w-[85%] self-end break-words">
          1233232132332323213213213123213
        </div>
        <div className="bg-white text-gray-80 px-[11px] py-1 rounded-lg text-left w-fit max-w-[85%] self-start break-words">
          1233232132332323213213213123213
        </div>
      </div>
    </div>
  );
}

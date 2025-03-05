import { loadChatList } from '@/apis/chat';
import ChatHistoryCard from '@/components/ChatHistoryCard';
import InfoMessage from '@/components/InfoMessage';
import { useEffect, useState } from 'react';

export default function Chat({}) {
  const [chatList, setChatList] = useState<ChatHistory[]>([]);

  useEffect(() => {
    const getChatList = async () => {
      const { data } = await loadChatList();
      setChatList(data);
    };
    getChatList();
  }, []);

  if (!chatList.length) {
    return (
      <div className="flex items-center justify-center w-full">
        <InfoMessage text="채팅 목록이 비어있어요" />
      </div>
    );
  }
  return (
    <div className="w-full mt-[12px] mb-[58px] flex flex-col gap-4">
      {chatList.map((item) => (
        <ChatHistoryCard item={item} key={item.chatroom_id} />
      ))}
    </div>
  );
}

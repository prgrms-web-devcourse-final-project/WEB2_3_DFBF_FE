import sendIcon from '@/assets/icons/send-icon.svg';
import ChatMusicPlayer from './components/ChatMusicPlayer';
import Button from '@/components/Button';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/apis/axios';

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

  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState('');

  const connect = () => {
    const socket = new SockJS('ws://~~/chat');
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: (frame) => {
        console.log('[연결됨]', frame);
        addMessage('WebSocket 연결 성공!');

        // 과거 채팅 메시지 불러오기
        fetch('ws://~~/chat')
          .then((res) => res.json())
          .then((messages) => {
            messages.forEach((msg: any) => addMessage(`[기록] ${msg.message}`));
          });

        // 실시간 채팅 메시지 구독
        client.subscribe('/topic/public', (message) => {
          addMessage(`[받음] ${message.body}`);
        });
      },
      onDisconnect: () => {
        console.log('[연결 해제]');
        addMessage('WebSocket 연결이 해제되었습니다.');
      },
    });
    client.activate();
    setStompClient(client);
  };
  // 웹소켓 연결 해제
  const disconnect = () => {
    if (stompClient) {
      stompClient.deactivate();
      setStompClient(null);
      setMessages([]); // 연결 해제 시 채팅 초기화
    }
  };

  // 메시지 전송
  const sendMessage = () => {
    if (messageInput.trim() && stompClient?.connected) {
      stompClient.publish({
        destination: '/app/sendMessage',
        body: JSON.stringify({ userId: 1, message: messageInput }),
      });

      addMessage(`[보냄] ${messageInput}`);
      setMessageInput(''); // 입력창 초기화
    }
  };

  // 채팅 메시지 추가
  const addMessage = (msg: string) => {
    setMessages((prev) => [...prev, msg]);
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

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

      <div>
        {messages.map((message) => (
          <div></div>
        ))}
      </div>
      <div>
        <Button>채팅 연결</Button>
        <Button>채팅 연결 해제</Button>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="bg-white"
        />
        <Button>전송</Button>
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

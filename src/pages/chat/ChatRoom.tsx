import sendIcon from '@/assets/icons/send-icon.svg';
import ChatMusicPlayer from './components/ChatMusicPlayer';
import Button from '@/components/Button';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect, useRef, useState } from 'react';
import { MAX_CHAT_MESSAGE_LENGTH } from '@/constants';

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
  const [isMobile, setIsMobile] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const MAX_LINES = 8;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(e.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 모바일 여부 체크 (윈도우의 경우는 navigator.userAgent를 통해 체크 가능)
    if (!isMobile) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        // 제출하는 로직을 여기에 작성
        console.log('폼 제출!');
      }
    } else {
      if (event.key === 'Enter' && !event.shiftKey) {
        // 모바일에서 엔터 키를 누르면 줄바꿈을 할 수 있도록 preventDefault() 호출 안 함
        return;
      }
    }
  };

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // 높이를 자동으로 조정 (스크롤바가 나타나지 않도록)
    textarea.style.height = 'auto'; // 일단 auto로 높이를 리셋
    textarea.style.height = `${textarea.scrollHeight}px`; // 실제 내용에 맞는 높이로 설정

    // 최대 줄 수를 넘지 않도록 제한
    const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight || '20', 10);
    const maxHeight = lineHeight * MAX_LINES;
    if (textarea.scrollHeight > maxHeight) {
      textarea.style.height = `${maxHeight}px`; // 최대 높이를 초과하면 그 이상 커지지 않음
    }
  };

  useEffect(() => {
    adjustHeight(); // 텍스트가 변경될 때마다 높이를 조정
  }, [messageInput]);

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

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    setIsMobile(userAgent.includes('mobile'));
  }, []);

  return (
    <div className="relative w-full max-w-[600px] mx-auto bottom-padding-chat">
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

        {/* <div>
          {messages.map((message) => (
            <div>123</div>
          ))}
        </div> */}
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

      <div className="bottom-padding-nav px-3 pt-[5px] bg-white max-w-[600px] fixed bottom-0 w-full left-1/2 -translate-x-1/2 z-41">
        <div className="flex justify-between mb-2 caption-b">
          <p className="text-gray-80">
            남은시간: <span className="text-primary-normal">08:45</span>
          </p>
          <button className="cursor-pointer">
            <p className="text-primary-normal">연장 요청 (0/2)</p>
          </button>
        </div>
        <div className="flex gap-1 items-end">
          <textarea
            ref={textareaRef}
            name="chatText"
            value={messageInput}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            maxLength={MAX_CHAT_MESSAGE_LENGTH}
            rows={1} // 시작 시 1줄로 설정
            className="flex-1 border min-h-[32px] border-primary-hover rounded-2xl py-[6px] px-3 outline-0 caption-m text-gray-80 placeholder:text-gray-50 resize-none"
            placeholder="메시지 입력"
            onInput={adjustHeight}
            style={{
              overflowY: 'hidden', // 세로 스크롤을 숨김
            }}
          />
          <Button className="w-[32px] h-[32px] rounded-full">
            <img src={sendIcon} alt="send" />
          </Button>
        </div>
      </div>
    </div>
  );
}

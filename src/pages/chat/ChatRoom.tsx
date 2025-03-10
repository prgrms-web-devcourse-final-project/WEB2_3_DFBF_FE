import sendIcon from '@/assets/icons/send-icon.svg';
import ChatMusicPlayer from './components/ChatMusicPlayer';
import Button from '@/components/Button';
import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect, useRef, useState } from 'react';
import { MAX_CHAT_MESSAGE_LENGTH } from '@/constants';
import { loadChatHistoryDev } from '@/apis/chat';
import { useAuthStore } from '@/store/authStore';
import { useScrollStore } from '@/store/scrollStore';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';
dayjs.extend(utc);
dayjs.extend(timezone);

interface ChatRoomProps {}

//메시지 타입
interface ChatMessage {
  fromUserId?: string;
  chatRoomId: number;
  message: string;
  createdAt?: string;
  isMyMessage?: boolean;
}

export default function ChatRoom({}: ChatRoomProps) {
  // const [chatRoomId, setChatRoomId] = useState<number | null>(7);
  const chatRoomId = 1;
  // const [myUserData, setMyUserData] = useState<ChatUser | null>(null);

  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { scrollContainerRefCurrent } = useScrollStore();

  // 최신 메시지로 스크롤
  useEffect(() => {
    if (scrollContainerRefCurrent) {
      console.log(scrollContainerRefCurrent);
      scrollContainerRefCurrent.scrollTop = scrollContainerRefCurrent.scrollHeight;
    }
  }, [messages, scrollContainerRefCurrent]);

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
        sendMessage();
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

  //웹소켓 연결
  const connect = () => {
    const token = useAuthStore.getState().accessToken;
    const socket = new SockJS(import.meta.env.VITE_CHAT_API_URL + `/ws-chat?token=${token}`);
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log('웹소켓 연결 성공!');
        fetchChatHistory();
        subscribeToMessages(client);
      },
      onStompError: (frame) => {
        console.error('STOMP 오류:', frame);
      },
    });

    client.activate();
    setStompClient(client);
  };
  // 채팅 내역 불러오기
  const fetchChatHistory = async () => {
    try {
      if (!chatRoomId) {
        console.log('chatRoomId가 없습니다');
        return;
      }
      //배포 시 변경
      const response = await loadChatHistoryDev(chatRoomId);
      console.log('history', response);
      if (response.status === 204) {
        console.warn('No chat history found (204 No Content)');
        return;
      }
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  // STOMP 구독 설정
  const subscribeToMessages = (client: Client) => {
    if (!client.connected) return;

    // 1:1 메시지 받기
    const privateChat: StompSubscription = client.subscribe(
      `/queue/chat-${chatRoomId}`,
      (message) => {
        const chat: ChatMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, chat]);
      },
    );

    // 나쁜 말 필터링 메시지 받기
    const badWordFilter: StompSubscription = client.subscribe('/topic/badword', (message) => {
      if (!chatRoomId) return;
      setMessages((prev) => [...prev, { chatRoomId, message: `[나쁜 말 감지] ${message.body}` }]);
    });

    return [privateChat, badWordFilter];
  };

  // 웹소켓 연결 해제
  const disconnect = () => {
    if (stompClient) {
      stompClient.deactivate();
      setStompClient(null);
      setMessages([]);
      console.log('웹소켓 연결 해제');
    }
  };

  // 메시지 전송
  const sendMessage = () => {
    if (messageInput.trim() === '') {
      console.warn('메시지가 비어있습니다.');
      return;
    }

    if (stompClient && stompClient.connected) {
      console.log('메시지 전송:', messageInput); // 메시지 전송 전에 로그 확인
      const AccessToken = useAuthStore.getState().accessToken;

      stompClient.publish({
        destination: '/app/sendMessage',
        body: JSON.stringify({
          chatRoomId,
          message: messageInput,
        }),
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      });

      setMessageInput(''); // 메시지 전송 후 입력란 초기화
    } else {
      console.error('웹소켓이 연결되지 않았습니다.');
    }
  };

  // 10분 연장 요청
  // const handleExtendSession = () => {
  //   if (stompClient) {
  //     stompClient.publish({
  //       destination: '/app/extendSession',
  //       body: JSON.stringify({}), // 빈 JSON 객체 전달
  //     });
  //   }
  // };

  //채팅방 입장 시 connect
  //나갈 때 disconnect
  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);

  //상대가 나갈 시 '대화가 종료되었습니다' 메세지 추가
  //입력 창, 버튼 비활성화

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
        {Array.isArray(messages) &&
          messages.map((msg, index) => {
            const isMyMessage = msg.isMyMessage;
            const prevMsg = messages[index - 1];
            const isSameSender = prevMsg && prevMsg.isMyMessage === msg.isMyMessage;

            return (
              <div key={index} className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
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
        {!!messages.length && (
          <p className="text-gray-500 text-xs text-center mt-2">
            {dayjs(messages.at(-1)?.createdAt)
              .tz('Asia/Seoul')
              .locale('ko')
              .format('YYYY년 M월 D일 dddd')}
          </p>
        )}
      </div>

      {/* <div>
        <Button onClick={connect}>채팅 연결</Button>
        <Button onClick={disconnect}>채팅 연결 해제</Button>
      </div> */}

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
            className="flex-1 border min-h-[32px] border-primary-hover rounded-2xl py-[6px] px-3 outline-0 caption-m text-gray-80 placeholder:text-gray-50 resize-none overflow-y-hidden"
            placeholder="메시지 입력"
            onInput={adjustHeight}
          />
          <Button onClick={sendMessage} className="w-[32px] h-[32px] rounded-full">
            <img src={sendIcon} alt="send" />
          </Button>
        </div>
      </div>
    </div>
  );
}

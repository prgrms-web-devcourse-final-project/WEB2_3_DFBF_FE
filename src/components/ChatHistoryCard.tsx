import Button from './Button';
import defaultImage from '@assets/images/default.png';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';
import { requestChat } from '@/apis/chat';
import { useSheetStore } from '@/store/sheetStore';
import { useModalStore } from '@/store/modalStore';
import { useNavigate } from 'react-router';
import { useChatStore } from '@/store/chatStore';
dayjs.extend(utc);
dayjs.extend(timezone);

interface ChatHistoryCardProps {
  item: ChatHistory;
}

export default function ChatHistoryCard({ item }: ChatHistoryCardProps) {
  const navigate = useNavigate();
  const { setPastChatRoomId, setPastRecord } = useChatStore();
  const { openSheet } = useSheetStore();
  const { openModal, closeModal } = useModalStore();

  const createdAt = dayjs(item.createdAt).tz('Asia/Seoul').format('YYYY.MM.DD');

  //채팅 요청
  //요청 보내면 sse로 recordId, 보낸 사람 정보 보내줘야 함
  const request = async () => {
    if (!item.recordId) {
      console.log('recordId가 존재하지 않습니다.');
      return;
    }
    try {
      const { code } = await requestChat(Number(item.recordId));

      //200
      if (code === 200) {
        openSheet('isRequestSendingSheetOpen');
      } else {
        throw new Error('잠시 후 다시 시도해 주세요');
      }
    } catch (error) {
      console.log(error);
      openModal({
        title: '잠시 후 다시 시도해 주세요',
        onConfirm: () => {
          closeModal();
        },
      });
    }
  };

  const handleChatHistory = () => {
    setPastRecord(item);
    setPastChatRoomId(item.chatRoomId);
    navigate(`/chatroom/${item.chatRoomId}`);
  };

  const handleRequest = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    setPastRecord(item);
    request();
  };

  return (
    <div
      onClick={handleChatHistory}
      className="w-full p-3 card-shadow bg-white/80 rounded-lg cursor-pointer"
    >
      <div className="flex justify-between">
        <div className="flex caption-m text-gray-60">
          <p className="mr-2">{item.nickname}</p>
          <p>{createdAt}</p>
        </div>
        {/* <MoreOptionsSelect
          items={[{ label: '삭제하기', onClick: handleDeleteChat }]}
        ></MoreOptionsSelect> */}
      </div>
      <div className="flex mt-1 mb-3">
        <img
          className="w-[40px] h-[40px] mr-2"
          src={item.albumImage ?? defaultImage}
          alt="앨범이미지"
        />
        <div>
          <p className="body-b text-gray-80 line-clamp-1">
            {item.title} - {item.artist}
          </p>
          <p className="caption-r text-gray-60 line-clamp-1">{item.comment}</p>
        </div>
      </div>
      <Button onClick={(e) => handleRequest(e)} variant="primary" className="body-m">
        다시 대화 요청하기
      </Button>
    </div>
  );
}

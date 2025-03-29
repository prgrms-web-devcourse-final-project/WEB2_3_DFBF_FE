import { deleteBlockList, fetchBlockList } from '@/apis/blockList';
import Button from '@/components/button/Button';
import InfoMessage from '@/components/InfoMessage';
import { useModalStore } from '@/store/modalStore';
import { useEffect, useState } from 'react';

interface BlockedUser {
  userId: number;
  blockedUserId: number;
  nickname: string;
  tag: string;
  createdAt: string; // ISO 날짜 형식
  updatedAt: string; // ISO 날짜 형식
}

export default function BlockList() {
  const { openModal, closeModal } = useModalStore();

  const [blockList, setBlockList] = useState<BlockedUser[]>([]);

  const handleBlock = (nickname: string, id: number) => {
    openModal({
      title: [
        { text: nickname, className: 'text-primary-normal' },
        { text: '님 차단을 해제할까요?' },
      ],
      message: '이제 피드에서 상대방의 글을 볼 수 있어요',
      onConfirm: async () => {
        // 기존 차단 목록을 저장
        const prevBlockList = blockList;

        // UI에서 먼저 제거
        setBlockList((prev) => prev.filter((item) => item.blockedUserId !== id));

        try {
          // 서버 요청
          const data = await deleteBlockList(id);
          console.log(data);

          // 만약 요청이 실패했다면, 기존 상태를 복원
          if (data.code !== 200) {
            console.log(data);
            throw new Error('삭제 실패');
          }
        } catch (error) {
          console.error('삭제 요청 실패:', error);
          // 기존 상태로 복원
          setBlockList(prevBlockList);
        }

        closeModal();
      },
      onCancel: () => {
        console.log('취소');
        closeModal();
      },
    });
  };

  useEffect(() => {
    const getBlockList = async () => {
      const data = await fetchBlockList();
      console.log(data);
      setBlockList(data.data);
    };
    getBlockList();
    // setBlockList(mockData);
  }, []);

  if (!blockList.length) {
    return (
      <div className="flex items-center justify-center w-full">
        <InfoMessage text="차단 목록이 비어있어요" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-[10px]">
      {blockList.map((data) => (
        <div
          key={data.blockedUserId}
          className="flex items-center justify-between w-full p-3 rounded-lg bg-white/80"
        >
          <div>
            <p className="body-m text-gray-80">{data.nickname}</p>
            <p className="caption-r text-gray-60">{data.tag}</p>
          </div>
          <Button
            variant="primary"
            className="w-[64px]"
            onClick={() => handleBlock(data.nickname, data.blockedUserId)}
          >
            차단 해제
          </Button>
        </div>
      ))}
    </div>
  );
}

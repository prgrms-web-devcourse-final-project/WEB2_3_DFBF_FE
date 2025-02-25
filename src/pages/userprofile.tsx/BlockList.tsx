import { deleteBlockList, fetchBlockList } from '@/apis/blockList';
import Button from '@/components/Button';
import InfoMessage from '@/components/InfoMessage';
import Loading from '@/components/Loading';
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

  const mockData = [
    {
      userId: 1,
      blockedUserId: 4,
      nickname: '닉넴',
      tag: '@plm3033',
      createdAt: '2025-02-19T02:14:25.997+00:00',
      updatedAt: '2025-02-19T02:14:25.997+00:00',
    },
    {
      userId: 1,
      blockedUserId: 3,
      nickname: 'hell',
      tag: '@whatthe',
      createdAt: '2025-02-19T02:14:32.526+00:00',
      updatedAt: '2025-02-19T02:14:32.526+00:00',
    },
    {
      userId: 1,
      blockedUserId: 2,
      nickname: 'maroon',
      tag: '@sugar',
      createdAt: '2025-02-19T02:15:20.647+00:00',
      updatedAt: '2025-02-19T02:15:20.647+00:00',
    },
  ];

  const handleBlock = (nickname: string, id: number) => {
    openModal({
      title: [
        { text: nickname, className: 'text-primary-normal' },
        { text: '님 차단을 해제할까요?' },
      ],
      message: '이제 피드에서 상대방의 글을 볼 수 있어요',
      onConfirm: async () => {
        console.log('확인');
        setBlockList((prev) => prev.filter((item) => item.blockedUserId !== id));
        // await deleteBlockList(id);
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
      setBlockList(data);
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
          className="bg-white/80 w-full flex justify-between items-center p-3 rounded-lg"
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

      <Loading />
    </div>
  );
}

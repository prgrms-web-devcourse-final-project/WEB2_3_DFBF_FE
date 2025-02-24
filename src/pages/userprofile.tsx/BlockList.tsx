import { fetchBlockList } from '@/apis/blockList';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { useModalStore } from '@/store/modalStore';
import { useEffect, useState } from 'react';

export default function BlockList() {
  const { openModal, closeModal } = useModalStore();

  const [blockList, setBlockList] = useState(null);

  const mockData = [
    {
      userId: 1,
      blockedUserId: 4,
      createdAt: '2025-02-19T02:14:25.997+00:00',
      updatedAt: '2025-02-19T02:14:25.997+00:00',
    },
    {
      userId: 1,
      blockedUserId: 3,
      createdAt: '2025-02-19T02:14:32.526+00:00',
      updatedAt: '2025-02-19T02:14:32.526+00:00',
    },
    {
      userId: 1,
      blockedUserId: 2,
      createdAt: '2025-02-19T02:15:20.647+00:00',
      updatedAt: '2025-02-19T02:15:20.647+00:00',
    },
  ];

  const handleBlock = () => {
    openModal({
      title: [
        { text: '하입뽀이입곱자', className: 'text-primary-normal' },
        { text: '님 차단을 해제할까요?' },
      ],
      message: '이제 피드에서 상대방의 글을 볼 수 있어요',
      onConfirm() {
        console.log('확인');
        closeModal();
      },
      onCancel() {
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
  }, []);

  return (
    <div className="w-full flex flex-col gap-[10px]">
      <div className="bg-white/80 w-full flex justify-between items-center p-3 rounded-lg">
        <div>
          <p className="body-m text-gray-80">하입뽀이</p>
          <p className="caption-r text-gray-60">@boy1234</p>
        </div>
        <Button variant="primary" className="w-[64px]" onClick={handleBlock}>
          차단 해제
        </Button>
      </div>

      <div className="bg-white/80 w-full flex justify-between items-center p-3 rounded-lg">
        <div>
          <p className="body-m text-gray-80">하입뽀이</p>
          <p className="caption-r text-gray-60">@boy1234</p>
        </div>
        <Button variant="primary" className="w-[64px]" onClick={handleBlock}>
          차단 해제
        </Button>
      </div>
      <Loading />
    </div>
  );
}

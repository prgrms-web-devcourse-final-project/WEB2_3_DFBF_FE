import Header from '@/layouts/Header';
import BottomNav from '@/layouts/BottomNav';
import { Outlet } from 'react-router';
import { useModalStore } from '@/store/modalStore';

function LandingLayout() {
  const { openModal, closeModal } = useModalStore();
  return (
    <div className="max-w-[700px] w-full h-screen mx-auto flex flex-col border border-red-500">
      <Header showNotification showMoreOptions />
      <button
        onClick={() =>
          openModal({
            title: '1버튼모달',
            message: '입니다',
            onConfirm() {
              console.log('확인');
              closeModal();
            },
          })
        }
      >
        1
      </button>
      <button
        onClick={() =>
          openModal({
            title: '2버튼모달',
            message: '입니다',
            onConfirm() {
              console.log('확인');
              closeModal();
            },
            onCancel() {
              console.log('취소');
              closeModal();
            },
          })
        }
      >
        2
      </button>
      <div className="flex-1 border border-blue-500">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}

export default LandingLayout;

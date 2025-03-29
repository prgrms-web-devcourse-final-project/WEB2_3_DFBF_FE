import { useModalStore } from '@/store/modalStore';
import Button from './button/Button';
import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
// import { spawn } from 'child_process';

export default function Modal() {
  const { modal, closeModal } = useModalStore();
  const confirmButtonRef = useRef<HTMLButtonElement | null>(null);
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modal.isOpen) {
      confirmButtonRef.current?.focus(); // 모달이 열리면 첫 번째 버튼에 포커스 이동
    }
  }, [modal.isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      closeModal();
    }

    if (e.key === 'Tab') {
      e.preventDefault(); // 기본 Tab 동작 막기
      if (document.activeElement === confirmButtonRef.current) {
        cancelButtonRef.current?.focus(); // 확인 버튼 → 취소 버튼으로 이동
      } else {
        confirmButtonRef.current?.focus(); // 취소 버튼 → 확인 버튼으로 이동
      }
    }
  };

  if (!modal.isOpen) return null;

  return createPortal(
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      // onClick={closeModal}
      onKeyDown={(e) => handleKeyDown(e)}
    >
      <div
        className="bg-white p-5 mx-5 rounded-lg card-shadow w-[287px] min-h-[148px] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-1 justify-center items-center text-center h4-b  ">
          {Array.isArray(modal.title)
            ? modal.title.map((part, index) => (
                <span key={index} className={part.className}>
                  {part.text}
                </span>
              ))
            : modal.title}
        </div>
        {modal.message && <p className="text-center caption-r">{modal.message}</p>}
        <div className="mt-4 flex justify-end gap-[6px]">
          <Button
            ref={confirmButtonRef}
            variant="primary"
            onClick={modal.onConfirm}
            className="body-m focus:bg-primary-active "
          >
            {modal.confirmText}
          </Button>
          {modal.onCancel && (
            <Button
              ref={cancelButtonRef}
              variant="secondary"
              onClick={modal.onCancel}
              className="body-m focus:bg-gray-5"
            >
              {modal.cancelText}
            </Button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
// 사용 예시
{
  /* <button
  onClick={() =>
  openModal({
    title: '2버튼모달',
    message: '입니다',
    confirmText:'확인', // default: '확인'
    cancelText:'취소', // default: '취소'
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
</button> */
}

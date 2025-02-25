import { useModalStore } from '@/store/modalStore';
import Button from './Button';
// import { spawn } from 'child_process';

interface ModalProps {}

export default function Modal({}: ModalProps) {
  const { modal, closeModal } = useModalStore();
  if (!modal.isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-5 mx-5 rounded-lg card-shadow w-[287px] min-h-[148px] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="h4-b text-center">
          {Array.isArray(modal.title)
            ? modal.title.map((part, index) => (
                <span key={index} className={part.className}>
                  {part.text}
                </span>
              ))
            : modal.title}
        </h2>
        <p className="caption-r text-center">{modal.message}</p>
        <div className="mt-4 flex justify-end gap-[6px]">
          <Button variant="primary" onClick={modal.onConfirm} className="body-m">
            확인
          </Button>
          {modal.onCancel && (
            <Button variant="secondary" onClick={modal.onCancel} className="body-m">
              취소
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
// 사용 예시
{
  /* <button
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
</button> */
}

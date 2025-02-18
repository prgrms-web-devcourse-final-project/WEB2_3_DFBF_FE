import { useModalStore } from "@/store/modalStore";

interface Props {}

export default function Modal({}: Props) {
  const { modal, closeModal } = useModalStore();
  if (!modal.isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-5 mx-5 rounded-lg card-shadow w-[660px] min-h-[148px] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="h4-b text-center">{modal.title}</h2>
        <p className="caption-r text-center">{modal.message}</p>
        <div className="mt-4 flex justify-end gap-[6px]">
          <button
            className="bg-primary-normal text-white w-full min-w-[120px] h-[38px] rounded-lg"
            onClick={modal.onConfirm || closeModal}
          >
            확인
          </button>
          {modal.onCancel && (
            <button
              className="bg-gray-300 w-full min-w-[120px] h-[38px] rounded-lg"
              onClick={modal.onCancel}
            >
              취소
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

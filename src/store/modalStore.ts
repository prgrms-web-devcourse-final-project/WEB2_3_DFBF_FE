import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ModalStore {
  modal: ModalState;
  openModal: (modal: Partial<ModalState>) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modal: { isOpen: false, title: "", message: "" },
  openModal: (modal) =>
    set((prev) => ({ modal: { ...prev.modal, ...modal, isOpen: true } })), // 기존 상태 유지하면서 업데이트
  closeModal: () =>
    set((prev) => ({
      modal: {
        ...prev.modal,
        isOpen: false,
        title: "",
        message: "",
        onConfirm: undefined,
        onCancel: undefined,
      },
    })),
}));

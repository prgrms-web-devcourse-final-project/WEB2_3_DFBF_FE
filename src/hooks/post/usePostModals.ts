import { useModalStore } from '@/store/modalStore';
import { useNavigate } from 'react-router';

const usePostModals = (mode: 'create' | 'edit') => {
  const { openModal, closeModal } = useModalStore();
  const navigate = useNavigate();

  // 글 등록 성공 모달
  const showSuccessModal = () => {
    openModal({
      title: mode === 'edit' ? '글 수정 성공' : '글 등록 성공',
      message: '내가 쓴 글을 확인하러 가 볼까요?',
      confirmText: '확인하러 가기',
      cancelText: '홈으로 가기',
      onConfirm: () => {
        navigate('/mypage', { replace: true });
        closeModal();
      },
      onCancel: () => {
        navigate('/home', { replace: true });
        closeModal();
      },
    });
  };

  // 글 등록 실패 모달
  const showFailModal = () => {
    openModal({
      title: mode === 'edit' ? '글 수정 실패' : '글 등록 실패',
      message: '잠시 후 다시 시도해 주세요.',
      confirmText: '확인',
      onConfirm: async () => {
        closeModal();
        navigate(-1);
      },
    });
  };
  return { showSuccessModal, showFailModal };
};
export default usePostModals;

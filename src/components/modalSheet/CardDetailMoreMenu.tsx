import MoreOptionsSelect from '@/components/MoreOptionsSelect';
import { useDeleteEmotionRecord } from '@/hooks/useDeleteEmotionRecord';
import { useModalStore } from '@/store/modalStore';
import { useNavigate, useParams } from 'react-router';

const CardDetailMoreMenu = () => {
  const id = useParams().id!;
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalStore();
  // 감정 기록 삭제
  const { mutate } = useDeleteEmotionRecord();

  // 삭제모달 띄우기
  const handleDeleteModal = () => {
    openModal({
      title: '등록된 글을 삭제할까요?',
      message: '삭제된 글은 복구할 수 없습니다',
      onConfirm: () => {
        mutate(Number(id));
        navigate(`/mypage`);
        closeModal();
      },
      onCancel: () => {
        closeModal();
      },
    });
  };

  // 수정
  const handleEdit = () => {
    navigate(`/post/${id}/edit`);
  };

  return (
    <MoreOptionsSelect
      items={[
        { label: '수정', onClick: handleEdit },
        { label: '삭제', onClick: handleDeleteModal },
      ]}
    />
  );
};

export default CardDetailMoreMenu;

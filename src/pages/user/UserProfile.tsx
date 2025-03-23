import CardDetailModal from '@/components/modalSheet/CardDetailModal';
import { useModalStore } from '@/store/modalStore';
import { useSheetStore } from '@/store/sheetStore';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDeleteEmotionRecord } from '@/hooks/useDeleteEmotionRecord';
import UserProfileInfo from '@/pages/user/components/UserProfileInfo/UserProfileInfo';
import UserEmotionRecordList from '@/pages/user/components/UserEmotionRecordList/UserEmotionRecordList';
import { useIsFetching } from '@tanstack/react-query';
import Loading from '@/components/loading/Loading';

interface UserProfileProps {
  isMyPage?: boolean; // 마이페이지 여부 확인 -> false면 유저페이지
}

// 마이페이지 / 유저페이지 UI
function UserProfile({ isMyPage = false }: UserProfileProps) {
  const isFetching = useIsFetching(); // 전체 쿼리 중 fetch 중인 게 있는지

  const navigate = useNavigate();

  const { openSheet, closeSheet } = useSheetStore(); // 시트
  const { openModal, closeModal } = useModalStore(); // 모달

  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null); // 선택된 항목 관리

  const handleOpenSheet = (recordId: number) => {
    setSelectedRecordId(recordId);
    openSheet('isCardSheetOpen'); // 모달 열기
  };

  // 감정 기록 삭제
  const { mutate } = useDeleteEmotionRecord();

  // 삭제모달 띄우기
  const handleDeleteModal = () => {
    openModal({
      title: '등록된 글을 삭제할까요?',
      message: '삭제된 글은 복구할 수 없습니다',
      onConfirm: () => {
        if (selectedRecordId !== null) {
          mutate(selectedRecordId);
        }
        closeSheet('isCardSheetOpen'); // 모달시트 끄기
        closeModal();
      },
      onCancel: () => {
        closeModal();
      },
    });
  };

  // 수정
  const handleEdit = () => {
    if (selectedRecordId) {
      navigate(`/post/${selectedRecordId}/edit`);
    }
    closeSheet('isCardSheetOpen'); // 모달시트 끄기
  };

  return (
    <>
      <div className="flex flex-col items-center w-full h-full gap-5 py-4">
        <UserProfileInfo isMyPage={isMyPage} />
        <UserEmotionRecordList isMyPage={isMyPage} handleOpenSheet={handleOpenSheet} />
      </div>
      {selectedRecordId && (
        <CardDetailModal
          recordId={selectedRecordId}
          handleDelete={handleDeleteModal}
          handleEdit={handleEdit}
        />
      )}
      {isFetching > 0 && <Loading />}
    </>
  );
}

export default UserProfile;

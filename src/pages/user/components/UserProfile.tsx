import CardDetailModal from '@/components/modalSheet/CardDetailModal';
import MusicCard from '@/components/MusicCard';
import { useModalStore } from '@/store/modalStore';
import { useSheetStore } from '@/store/sheetStore';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import EmotionRecordCardList from '@/pages/user/components/EmotionRecordCardList';
import { useDeleteEmotionRecord } from '@/hooks/useDeleteEmotionRecord';

interface UserProfileProps {
  userData: UserInfo; // 유저정보
  emotionRecords: EmotionRecordPages[]; // 감정 기록 정보
}

// 마이페이지 / 유저페이지 UI
function UserProfile({ userData, emotionRecords }: UserProfileProps) {
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
      <div className="flex flex-col items-center w-full h-full gap-4">
        <div className="flex flex-col items-center">
          <span className="h3-b">{userData?.nickname}</span>
          <span className="caption-m text-gray-60">@{userData?.loginId}</span>
        </div>

        <MusicCard
          title={userData?.profileMusic?.title}
          artist={userData?.profileMusic?.artist}
          image={userData?.profileMusic?.album}
          spotifyId={userData?.profileMusic?.spotifyId}
          rightElement="play"
        />
        <EmotionRecordCardList emotionRecords={emotionRecords} handleOpenSheet={handleOpenSheet} />
      </div>
      {selectedRecordId !== null && (
        <CardDetailModal
          recordId={selectedRecordId}
          handleDelete={handleDeleteModal}
          handleEdit={handleEdit}
        />
      )}
    </>
  );
}

export default UserProfile;

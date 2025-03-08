import { deleteEmotionRecord, getUserEmotionRecords } from '@/apis/emotionRecord';
import { getMyProfile, getUserProfile } from '@/apis/user';
import CardDetailModal from '@/components/modalSheet/CardDetailModal';
import MusicCard from '@/components/MusicCard';
import { useModalStore } from '@/store/modalStore';
import { useSheetStore } from '@/store/sheetStore';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useInView } from 'react-intersection-observer';
import EmotionRecordCardList from '@/pages/userprofile/components/EmotionRecordCardList';
import { useUserStore } from '@/store/userStore';
import Loading from '@/components/loading/Loading';

// 마이페이지 / 유저페이지 동시에 사용
function UserProfile({ isMyPage }: { isMyPage: boolean }) {
  const navigate = useNavigate();

  const { userId } = useParams(); // 유저페이지 경우
  const { openSheet, closeSheet } = useSheetStore(); // 시트
  const { openModal, closeModal } = useModalStore(); // 모달
  const queryClient = useQueryClient(); // useMutation 사용
  const { setUserData } = useUserStore(); // 유저 정보 전역 저장

  const { ref, inView } = useInView();

  // 유저 정보 가져오기
  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: isMyPage ? ['myPage'] : ['userPage'], // 유저페이지 캐싱할때 추가적으로 넣어주자
    queryFn: () => (isMyPage ? getMyProfile() : getUserProfile(userId as string)),
  });

  // 유저 정보 전역 저장
  useEffect(() => {
    if (userData?.data) {
      setUserData(userData.data);
    }
  }, [userData, setUserData]);

  const {
    data: emotionRecords,
    isLoading: isEmotionLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: isMyPage ? ['emotionRecords', userData?.data?.loginId] : ['emotionRecords', userId],
    queryFn: ({ pageParam }) =>
      isMyPage
        ? getUserEmotionRecords(userData?.data?.loginId, pageParam)
        : getUserEmotionRecords(userId as string, pageParam),
    getNextPageParam: (last) => {
      if (last.data.currentPage < last.data.totalPages) {
        return last.data.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!userData, // userData가 존재할 때만 실행
    select: (data) => data.pages as EmotionRecordPages[],
  });

  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null); // 선택된 항목 관리

  const handleOpenSheet = (recordId: number) => {
    setSelectedRecordId(recordId);
    openSheet('isCardSheetOpen'); // 모달 열기
  };
  // 감정 기록 삭제
  const { mutate } = useMutation({
    mutationFn: (recordId: number) => deleteEmotionRecord(recordId),
    onMutate: async (recordId) => {
      // 낙관적 업데이트 전에 사용자 목록 쿼리를 취소해 잠재적인 충돌 방지!
      await queryClient.cancelQueries({
        queryKey: isMyPage
          ? ['emotionRecords', userData?.data?.loginId]
          : ['emotionRecords', userId],
      });
      // 캐시된 데이터(사용자 목록) 가져오기!
      const previousRecords = queryClient.getQueryData<EmotionRecord[]>([
        'emotionRecords',
        isMyPage ? userData?.data?.loginId : userId,
      ]);

      if (previousRecords) {
        queryClient.setQueryData(
          ['emotionRecords', isMyPage ? userData?.data?.loginId : userId],
          (oldData: any) => ({
            ...oldData,
            data: {
              ...oldData.data,
              records: oldData.data.records.filter((r: EmotionRecord) => r.recordId !== recordId),
            },
          }),
        );
      }
      // 각 콜백의 context로 전달할 데이터 반환!
      return { previousRecords };
    },
    onError: (_, __, context) => {
      if (context?.previousRecords) {
        queryClient.setQueryData(
          ['emotionRecords', isMyPage ? userData?.data?.loginId : userId],
          context.previousRecords,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: isMyPage
          ? ['emotionRecords', userData?.data?.loginId]
          : ['emotionRecords', userId],
      });
    },
  });

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

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div className="flex flex-col items-center w-full h-full gap-4 py-4">
        <div className="flex flex-col items-center">
          <span className="h3-b">{userData?.data?.nickname}</span>
          <span className="caption-m text-gray-60">@{userData?.data?.loginId}</span>
        </div>

        <MusicCard
          title={userData?.data?.profileMusic?.title}
          artist={userData?.data?.profileMusic?.artist}
          image={userData?.data?.profileMusic?.album}
          spotifyId={userData?.data?.profileMusic?.spotifyId}
          rightElement="play"
        />
        <EmotionRecordCardList
          emotionRecords={emotionRecords ?? []}
          handleOpenSheet={handleOpenSheet}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          refProp={ref}
        />
      </div>
      {selectedRecordId !== null && (
        <CardDetailModal
          recordId={selectedRecordId}
          isChatting={true}
          handleDelete={handleDeleteModal}
          handleEdit={handleEdit}
        />
      )}
      {(isUserLoading || isEmotionLoading) && <Loading />}
    </>
  );
}

export default UserProfile;

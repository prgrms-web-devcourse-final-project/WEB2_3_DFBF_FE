import { getUserEmotionRecords } from '@/apis/emotionRecord';
import { getMyProfile, getUserProfile } from '@/apis/user';
import EmotionRecordCard from '@/components/EmotionRecordCard';
import InfoMessage from '@/components/InfoMessage';
import CardDetailModal from '@/components/modalSheet/CardDetailModal';
import MusicCard from '@/components/MusicCard';
import { useSheetStore } from '@/store/sheetStore';
import { formatDate } from '@/utils/formatDate';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

// 마이페이지 / 유저페이지 동시에 사용
function UserProfile({ isMyPage }: { isMyPage: boolean }) {
  const { userId } = useParams(); // 유저페이지 경우
  const { openSheet } = useSheetStore();

  // 유저 정보 가져오기
  const { data: userData } = useQuery({
    queryKey: isMyPage ? ['myPage'] : ['userPage'], // 유저페이지 캐싱할때 추가적으로 넣어주자
    queryFn: () => (isMyPage ? getMyProfile() : getUserProfile(userId as string)),
  });

  // 유저 감정 기록 가져오기
  const { data: emotionRecords } = useQuery({
    queryKey: isMyPage ? ['emotionRecords', userData?.data?.loginId] : ['emotionRecords', userId],
    queryFn: () =>
      isMyPage
        ? getUserEmotionRecords(userData?.data?.loginId)
        : getUserEmotionRecords(userId as string),
    enabled: !!userData, // userData가 존재할 때만 실행
  });
  console.log(emotionRecords);
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null); // 선택된 항목 관리

  const handleOpenSheet = (recordId: number) => {
    setSelectedRecordId(recordId);
    openSheet('isCardSheetOpen'); // 모달 열기
  };

  return (
    <>
      <div className="flex flex-col items-center w-full gap-4 py-4">
        <div className="flex flex-col items-center">
          <span className="h3-b">{userData?.data?.nickname}</span>
          <span className="caption-m text-gray-60">@{userData?.data?.loginId}</span>
        </div>

        <MusicCard
          title={userData?.data.profileMusic?.title}
          artist={userData?.data.profileMusic?.artist}
          image={userData?.data.profileMusic?.album}
          rightElement="play"
        />
        {emotionRecords?.data.records?.length > 0 ? (
          //   기본으로 2열이다가 크기가 500px가 넘어가면 3열로 변경
          <div className="grid grid-cols-2 min-[500px]:grid-cols-3 gap-x-3 gap-y-6 ">
            {emotionRecords?.data.records.map((record: EmotionRecord) => (
              <EmotionRecordCard
                key={record.recordId}
                emotion={record.emotion}
                albumImage={record.spotifyMusic.albumImage}
                songTitle={record.spotifyMusic.title}
                artistName={record.spotifyMusic.artist}
                date={formatDate(record.createdAt)}
                onClick={() => handleOpenSheet(record.recordId)}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <InfoMessage text="포스트가 비어있어요" />
          </div>
        )}
      </div>
      {selectedRecordId !== null && (
        <CardDetailModal recordId={selectedRecordId} isChatting={true} />
      )}
    </>
  );
}

export default UserProfile;

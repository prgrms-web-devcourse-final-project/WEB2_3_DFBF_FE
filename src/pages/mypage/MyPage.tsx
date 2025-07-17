import { Loading } from '@/components/loading';
import { Outlet } from 'react-router';
import { MyProfileSection, MyEmotionRecordSection } from '@/pages/mypage/components';
import { useMyProfileInfo, useInfiniteMyEmotionRecords } from '@/pages/mypage/hooks';

export default function MyPage() {
  const { isLoading: isProfileLoading } = useMyProfileInfo(); // 본인 정보 가져오기
  const { isLoading: isEmotionRecordsLoading } = useInfiniteMyEmotionRecords();
  return (
    <>
      <div className="flex flex-col items-center w-full h-full gap-5 py-4">
        <MyProfileSection />
        <MyEmotionRecordSection />
      </div>
      {(isProfileLoading || isEmotionRecordsLoading) && <Loading />}
      <Outlet />
    </>
  );
}

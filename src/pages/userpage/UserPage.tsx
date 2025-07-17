import { Loading } from '@/components/loading';
import { Outlet, useParams } from 'react-router';
import { useInfiniteUserEmotionRecords, useUserProfileInfo } from '@/pages/userpage/hooks';
import { UserEmotionRecordSection, UserProfileSection } from '@/pages/userpage/components';

export default function UserPage() {
  const userId = useParams().userId!;
  const { isLoading: isProfileLoading } = useUserProfileInfo(userId); // 유저 정보 가져오기
  const { isLoading: isEmotionRecordsLoading } = useInfiniteUserEmotionRecords(userId);
  return (
    <>
      <div className="flex flex-col items-center w-full h-full gap-5 py-4">
        <UserProfileSection userId={userId} />
        <UserEmotionRecordSection userId={userId} />
      </div>
      {(isProfileLoading || isEmotionRecordsLoading) && <Loading />}
      <Outlet />
    </>
  );
}

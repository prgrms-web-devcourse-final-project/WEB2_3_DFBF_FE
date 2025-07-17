import { useMyProfileInfo } from '@/pages/mypage/hooks';
import { UserProfileCard } from '@/components/';

const MyProfileSection = () => {
  // 유저 정보 가져오기
  const { data: userData } = useMyProfileInfo();

  return <UserProfileCard userData={userData} />;
};

export default MyProfileSection;

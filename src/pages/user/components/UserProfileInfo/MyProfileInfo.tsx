import { useMyProfileInfo } from '@/hooks/user/useMyProfileInfo';
import ProfileInfoView from '@/pages/user/components/UserProfileInfo/ProfileInfoView';

// 본인일 때 유저 프로필 정보
const MyProfileInfo = () => {
  // 유저 정보 가져오기
  const { data: userData } = useMyProfileInfo();
  return <ProfileInfoView userData={userData} />;
};

export default MyProfileInfo;

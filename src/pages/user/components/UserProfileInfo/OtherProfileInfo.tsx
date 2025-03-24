import { useOtherProfileInfo } from '@/hooks/user/useOtherProfileInfo';
import ProfileInfoView from '@/pages/user/components/UserProfileInfo/ProfileInfoView';

// 다른 유저 프로핑 정보
const OtherProfileInfo = () => {
  // 유저 정보 가져오기
  const { data: userData } = useOtherProfileInfo();
  return <ProfileInfoView userData={userData} />;
};

export default OtherProfileInfo;

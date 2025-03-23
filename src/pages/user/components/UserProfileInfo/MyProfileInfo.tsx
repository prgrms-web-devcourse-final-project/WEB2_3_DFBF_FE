import { getMyProfile } from '@/apis/user';
import ProfileInfoView from '@/pages/user/components/UserProfileInfo/ProfileInfoView';
import { useQuery } from '@tanstack/react-query';

// 본인일 때 유저 프로필 정보
const MyProfileInfo = () => {
  // 유저 정보 가져오기
  const { data: userData } = useQuery({
    queryKey: ['myProfile'],
    queryFn: () => getMyProfile(),
    staleTime: 5 * 60 * 1000,
    select: (data) => data.data,
  });
  return <ProfileInfoView userData={userData} />;
};

export default MyProfileInfo;

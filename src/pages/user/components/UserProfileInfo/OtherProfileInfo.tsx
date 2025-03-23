import { getUserProfile } from '@/apis/user';
import ProfileInfoView from '@/pages/user/components/UserProfileInfo/ProfileInfoView';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

// 다른 유저 프로핑 정보
const OtherProfileInfo = () => {
  const { userId } = useParams(); // 유저 Id
  // 유저 정보 가져오기
  const { data: userData } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => getUserProfile(userId as string),
    select: (data) => data.data,
  });
  return <ProfileInfoView userData={userData} />;
};

export default OtherProfileInfo;

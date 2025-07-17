import { UserProfileCard } from '@/components';
import { useUserProfileInfo } from '@/pages/userpage/hooks';

interface UserProfileSectionProps {
  userId: string;
}

const UserProfileSection = ({ userId }: UserProfileSectionProps) => {
  // 유저 정보 가져오기
  const { data: userData } = useUserProfileInfo(userId);

  return <UserProfileCard userData={userData} />;
};

export default UserProfileSection;

import MyProfileInfo from '@/pages/user/components/UserProfileInfo/MyProfileInfo';
import OtherProfileInfo from '@/pages/user/components/UserProfileInfo/OtherProfileInfo';

const UserProfileInfo = ({ isMyPage }: { isMyPage: boolean }) => {
  return isMyPage ? <MyProfileInfo /> : <OtherProfileInfo />;
};

export default UserProfileInfo;

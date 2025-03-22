import MyEmotionRecordList from '@/pages/user/components/UserEmotionRecordList/MyEmotionRecordList';
import OtherEmotionRecordList from '@/pages/user/components/UserEmotionRecordList/OtherEmotionRecordList';

interface UserEmotionRecordListProps {
  isMyPage: boolean;
  handleOpenSheet: (recordId: number) => void;
}

const UserEmotionRecordList = ({ isMyPage, handleOpenSheet }: UserEmotionRecordListProps) => {
  return isMyPage ? (
    <MyEmotionRecordList handleOpenSheet={handleOpenSheet} />
  ) : (
    <OtherEmotionRecordList handleOpenSheet={handleOpenSheet} />
  );
};

export default UserEmotionRecordList;

import { useInfiniteOtehrEmotionRecords } from '@/hooks/user/useInfiniteOtehrEmotionRecords';
import EmotionRecordCardList from '@/pages/user/components/UserEmotionRecordList/EmotionRecordCardList';

interface OtherEmotionRecordList {
  handleOpenSheet: (recordId: number) => void;
}

const OtherEmotionRecordList = ({ handleOpenSheet }: OtherEmotionRecordList) => {
  // 감정 기록 데이터 불러오기
  const {
    data: emotionRecords,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteOtehrEmotionRecords();

  return (
    <EmotionRecordCardList
      emotionRecords={emotionRecords as EmotionRecordPages[]}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      handleOpenSheet={handleOpenSheet}
    />
  );
};

export default OtherEmotionRecordList;

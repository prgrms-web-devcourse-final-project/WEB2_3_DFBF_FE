import { useInfiniteMyEmotionRecords } from '@/hooks/user/useInfiniteMyEmotionRecords';
import EmotionRecordCardList from '@/pages/user/components/UserEmotionRecordList/EmotionRecordCardList';

interface MyEmotionRecordList {
  handleOpenSheet: (recordId: number) => void;
}

const MyEmotionRecordList = ({ handleOpenSheet }: MyEmotionRecordList) => {
  // 감정 기록 데이터 불러오기
  const {
    data: emotionRecords,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteMyEmotionRecords();
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

export default MyEmotionRecordList;

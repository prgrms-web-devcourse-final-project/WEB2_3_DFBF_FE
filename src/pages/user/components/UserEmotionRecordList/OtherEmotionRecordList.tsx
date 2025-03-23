import { getUserEmotionRecords } from '@/apis/emotionRecord';
import EmotionRecordCardList from '@/pages/user/components/UserEmotionRecordList/EmotionRecordCardList';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

interface OtherEmotionRecordList {
  handleOpenSheet: (recordId: number) => void;
}

const OtherEmotionRecordList = ({ handleOpenSheet }: OtherEmotionRecordList) => {
  const { userId } = useParams(); // 유저 Id

  // 감정 기록 데이터 불러오기
  const {
    data: emotionRecords,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['userPosts', userId],
    queryFn: ({ pageParam }) => getUserEmotionRecords(userId as string, pageParam),
    getNextPageParam: (last) => {
      if (last.data.currentPage < last.data.totalPages) {
        return last.data.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    select: (data) => data.pages,
  });

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

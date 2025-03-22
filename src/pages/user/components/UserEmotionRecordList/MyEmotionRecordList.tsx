import { getMyEmotionRecords } from '@/apis/emotionRecord';
import EmotionRecordCardList from '@/pages/user/components/UserEmotionRecordList/EmotionRecordCardList';
import { useInfiniteQuery } from '@tanstack/react-query';

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
  } = useInfiniteQuery({
    queryKey: ['userPosts', 'me'],
    queryFn: ({ pageParam }) => getMyEmotionRecords(pageParam),
    getNextPageParam: (last) => {
      if (last.data.currentPage < last.data.totalPages) {
        return last.data.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
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

export default MyEmotionRecordList;

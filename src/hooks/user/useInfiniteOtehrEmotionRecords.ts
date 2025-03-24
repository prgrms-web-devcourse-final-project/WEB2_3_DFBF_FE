import { getUserEmotionRecords } from '@/apis/emotionRecord';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

export const useInfiniteOtehrEmotionRecords = () => {
  const { userId } = useParams(); // 유저 Id
  return useInfiniteQuery({
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
};

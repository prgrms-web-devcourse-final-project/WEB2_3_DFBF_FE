import { getUserEmotionRecords } from '@/apis/emotionRecord';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useInfiniteUserEmotionRecords = (userId: string) => {
  return useInfiniteQuery({
    queryKey: ['userPosts', userId],
    queryFn: ({ pageParam = 1 }) => getUserEmotionRecords(userId, pageParam),
    getNextPageParam: (last) => {
      if (last.data.currentPage < last.data.totalPages) {
        return last.data.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });
};

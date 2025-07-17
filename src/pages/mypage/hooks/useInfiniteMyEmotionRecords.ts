import { getMyEmotionRecords } from '@/apis/emotionRecord';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useInfiniteMyEmotionRecords = () => {
  return useInfiniteQuery({
    queryKey: ['userPosts', 'me'],
    queryFn: ({ pageParam = 1 }) => getMyEmotionRecords(pageParam),
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

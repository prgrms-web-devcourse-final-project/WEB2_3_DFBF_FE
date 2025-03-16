import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEmotionRecord } from '@/apis/emotionRecord';

export const useDeleteEmotionRecord = () => {
  const queryClient = useQueryClient(); // useMutation 사용

  return useMutation({
    mutationFn: (recordId: number) => deleteEmotionRecord(recordId),
    onMutate: async (recordId) => {
      // 낙관적 업데이트 전에 사용자 목록 쿼리를 취소해 잠재적인 충돌 방지!
      await queryClient.cancelQueries({
        queryKey: ['userPosts', 'me'],
      });

      // 캐시된 데이터(사용자 목록) 가져오기!
      const previousRecords = queryClient.getQueryData<InfiniteData<EmotionRecordPages>>([
        'userPosts',
        'me',
      ]);

      // 기존 데이터 확인 (없으면 오류 발생 방지)
      if (!previousRecords?.pages) {
        console.error('❌ 기존 데이터가 없습니다.');
        throw new Error('기존 데이터 없음');
      }

      // 기존 데이터를 기반으로 낙관적 업데이트 수행
      queryClient.setQueryData(['userPosts', 'me'], (oldData: InfiniteData<EmotionRecordPages>) => {
        return {
          ...oldData,
          pages: oldData.pages.map((page: EmotionRecordPages) => ({
            ...page,
            data: {
              ...page.data,
              records: page.data.records.filter((r: EmotionRecord) => r.recordId !== recordId),
            },
          })),
        };
      });

      // 각 콜백의 context로 전달할 데이터 반환!
      return { previousRecords };
    },
    onError: (_, __, context) => {
      if (context?.previousRecords) {
        queryClient.setQueryData(['userPosts', 'me'], context.previousRecords);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['userPosts', 'me'],
      });
    },
  });
};

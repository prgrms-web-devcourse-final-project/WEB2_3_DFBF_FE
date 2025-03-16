import { getMyEmotionRecords } from '@/apis/emotionRecord';
import { getMyProfile } from '@/apis/user';
import Loading from '@/components/loading/Loading';
import LoadingMini from '@/components/loading/LoadingMini';
import UserProfile from '@/pages/user/components/UserProfile';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const MyPage = () => {
  const { ref, inView } = useInView({
    rootMargin: `0px 0px -62px 0px`,
    threshold: 0.5,
  });

  // 유저 정보 가져오기
  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ['myProfile'],
    queryFn: () => getMyProfile(),
    staleTime: 5 * 60 * 1000,
    select: (data) => data.data,
  });

  console.log(userData);

  // 감정 기록 데이터 불러오기
  const {
    data: emotionRecords,
    isLoading: isEmotionLoading,
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
  console.log(emotionRecords);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <>
      <div className="flex flex-col items-center w-full h-full py-4">
        <UserProfile userData={userData} emotionRecords={emotionRecords as EmotionRecordPages[]} />
        {hasNextPage && !isFetchingNextPage && (
          <div ref={ref}>
            <LoadingMini />
          </div>
        )}
      </div>

      {(isUserLoading || isEmotionLoading) && <Loading />}
    </>
  );
};

export default MyPage;

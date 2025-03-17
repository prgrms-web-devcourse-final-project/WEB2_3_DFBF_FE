import { getUserEmotionRecords } from '@/apis/emotionRecord';
import { getUserProfile } from '@/apis/user';
import Loading from '@/components/loading/Loading';
import LoadingMini from '@/components/loading/LoadingMini';
import UserProfile from '@/pages/user/components/UserProfile';
import { useUserStore } from '@/store/userStore';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router';

const UserPage = () => {
  const { ref, inView } = useInView({
    rootMargin: `0px 0px -62px 0px`,
    threshold: 0.5,
  });

  const { userId } = useParams(); // 유저 Id
  const { setUserData } = useUserStore(); // 유저 정보 전역 저장

  // 유저 정보 가져오기
  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => getUserProfile(userId as string),
    select: (data) => data.data,
  });

  // 감정 기록 데이터 불러오기
  const {
    data: emotionRecords,
    isLoading: isEmotionLoading,
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

  // 유저 정보 전역 저장 -> 차단하는데 사용
  useEffect(() => {
    if (userData?.data) {
      setUserData(userData.data);
    }
  }, [userData, setUserData]);

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
        {(isUserLoading || isEmotionLoading) && <Loading />}
      </div>
    </>
  );
};

export default UserPage;

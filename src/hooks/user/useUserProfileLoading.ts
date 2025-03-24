import { useInfiniteMyEmotionRecords } from '@/hooks/user/useInfiniteMyEmotionRecords';
import { useInfiniteOtehrEmotionRecords } from '@/hooks/user/useInfiniteOtehrEmotionRecords';
import { useMyProfileInfo } from '@/hooks/user/useMyProfileInfo';
import { useOtherProfileInfo } from '@/hooks/user/useOtherProfileInfo';

export const useUserProfileLoading = (isMyPage: boolean) => {
  const userInfoQuery = isMyPage ? useMyProfileInfo() : useOtherProfileInfo();
  const userPostsQuery = isMyPage
    ? useInfiniteMyEmotionRecords()
    : useInfiniteOtehrEmotionRecords();

  return {
    isLoading: userInfoQuery.isLoading || userPostsQuery.isLoading,
  };
};

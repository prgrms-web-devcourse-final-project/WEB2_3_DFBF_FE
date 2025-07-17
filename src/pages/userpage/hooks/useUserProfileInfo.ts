import { getUserProfile } from '@/apis/user';
import { useQuery } from '@tanstack/react-query';

export const useUserProfileInfo = (userId: string) => {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserProfile(userId),
    select: (data) => data.data,
  });
};

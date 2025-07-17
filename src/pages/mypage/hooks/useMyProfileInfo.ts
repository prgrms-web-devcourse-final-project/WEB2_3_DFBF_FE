import { getMyProfile } from '@/apis/user';
import { useQuery } from '@tanstack/react-query';

export const useMyProfileInfo = () => {
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: getMyProfile,
    staleTime: 5 * 60 * 1000,
    select: (data) => data.data,
  });
};

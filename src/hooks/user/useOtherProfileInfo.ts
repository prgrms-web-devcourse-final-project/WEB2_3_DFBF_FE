import { getUserProfile } from '@/apis/user';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

export const useOtherProfileInfo = () => {
  const { userId } = useParams();

  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserProfile(userId as string),
    select: (data) => data.data,
    enabled: !!userId, // userId 없으면 요청 안 함
  });
};

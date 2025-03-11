import { useQuery } from '@tanstack/react-query';
import { getUserStatus } from '@/apis/user';

export function useUserStatus(loginId: string) {
  const { data } = useQuery({
    queryKey: ['userStatus', loginId],
    queryFn: () => (loginId ? getUserStatus(loginId) : Promise.resolve(null)),
    enabled: !!loginId,
    staleTime: 1000 * 60,
  });

  return {
    isChatting: data?.data?.chatStatus === 'CHATTING',
    onlineStatus: data?.data?.onlineStatus ?? null,
    lastActive: data?.data?.lastActiveStr ?? null,
    userLoginId: data?.data?.loginId ?? null,
  };
}

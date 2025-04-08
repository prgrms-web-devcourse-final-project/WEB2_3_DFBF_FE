import { postLogout } from '@/apis/auth';
import Header from '@/layouts/header/Header';
import { useAuthStore } from '@/store/authStore';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

const MypageHeader = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();

  const handleEditProfile = () => navigate('/mypage/edit');
  const handleBlockList = () => navigate('/mypage/blocklist');
  const handleLogout = async () => {
    try {
      const { code } = await postLogout();
      // 200이외에 code에서는 에러 처리
      if (code !== 200) {
        throw new Error('로그아웃 에러가 발생했습니다.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      logout(); // 토큰 초기화
      useAuthStore.persist.clearStorage(); // 로컬스토리지에서 persist 데이터 삭제
      queryClient.removeQueries({ queryKey: ['myProfile'] }); // 프로필 정보 캐시 초기화
      queryClient.removeQueries({ queryKey: ['userPosts', 'me'] }); // 포스트 정보 캐시 초기화
      navigate('/');
    }
  };

  const moreOptionsItems = [
    { label: '프로필 수정', onClick: handleEditProfile },
    { label: '차단 목록', onClick: handleBlockList },
    { label: '로그아웃', onClick: handleLogout },
  ];

  return <Header moreOptionsItems={moreOptionsItems} />;
};

export default MypageHeader;

import { postLogout } from '@/apis/auth';
import { useAuthStore } from '@/store/authStore';
import { useLocation, useNavigate } from 'react-router';

// url에 따라서 헤더의 moreOptions 선택
export const useMoreOptions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();

  const handleEditProfile = () => navigate('/mypage/edit');
  const handleBlockList = () => navigate('/mypage/blocklist');
  const handleLogout = async () => {
    try {
      const { code } = await postLogout();
      if (code === 200) {
        logout();
        useAuthStore.persist.clearStorage(); // 로컬스토리지에서 persist 데이터 삭제
        navigate('/');
      }
    } catch (error) {
      console.error('로그아웃 에러가 발생했습니다.');
    }
  };

  // url에 따라서 다른 items값 return
  const getMoreOptionsItems = () => {
    switch (location.pathname) {
      case '/mypage':
        return [
          { label: '프로필 수정', onClick: handleEditProfile },
          { label: '차단 목록', onClick: handleBlockList },
          { label: '로그아웃', onClick: handleLogout },
        ];
      default:
        return [{ label: '로그아웃', onClick: handleLogout }];
    }
  };

  return getMoreOptionsItems();
};

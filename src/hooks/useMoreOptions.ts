import { postLogout } from '@/apis/auth';
import { addBlockList } from '@/apis/blockList';
import { deleteAccount, getUserInfo } from '@/apis/user';
import { useAuthStore } from '@/store/authStore';
import { useModalStore } from '@/store/modalStore';
import { useUserStore } from '@/store/userStore';
import { useLocation, useNavigate, useParams } from 'react-router';

// url에 따라서 헤더의 moreOptions 선택
export const useMoreOptions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();

  const { logout } = useAuthStore();
  const { openModal, closeModal } = useModalStore();
  const { userData } = useUserStore(); // 차단할 유저 정보

  const handleEditProfile = () => navigate('/mypage/edit');
  const handleBlockList = () => navigate('/mypage/blocklist');
  const handleLogout = async () => {
    try {
      const { code } = await postLogout();
      if (code === 200) {
        logout(); // 토큰 초기화
        useAuthStore.persist.clearStorage(); // 로컬스토리지에서 persist 데이터 삭제
        navigate('/');
      }
    } catch (error) {
      console.error('로그아웃 에러가 발생했습니다.');
    }
  };

  const handleBlockUser = async () => {
    if (!param.userId) {
      console.log('차단 실패');
      return;
    }

    openModal({
      title: `${userData?.nickname}을 차단할까요?`,
      message: '차단된 사용자는 더이상 피드에 나타나지 않습니다',
      onConfirm: async () => {
        if (param.userId) {
          try {
            const data = await addBlockList(param.userId);
            closeModal();
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        }
      },
      onCancel: () => {
        closeModal();
      },
    });
  };

  const handleDeleteAccount = async () => {
    try {
      const { code, data } = await getUserInfo();
      if (code === 200) {
        openModal({
          title: [
            { text: data.nickName, className: 'text-primary-normal' },
            { text: '님 떠나시는 건가요?' },
          ],
          message: '탈퇴 버튼 선택 시, 모든 활동 정보가 삭제됩니다',
          confirmText: '탈퇴',
          onConfirm: async () => {
            try {
              const { code } = await deleteAccount();
              if (code === 200) {
                logout();
                useAuthStore.persist.clearStorage(); // 로컬스토리지에서 persist 데이터 삭제
                closeModal();
                navigate('/');
              }
            } catch (error) {
              console.log(error);
            }
          },
          onCancel: () => {
            closeModal();
          },
        });
      } else {
        throw new Error('정보를 불러오는 중 오류가 생겼습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // url에 따라서 다른 items값 return
  const getMoreOptionsItems = () => {
    if (location.pathname.startsWith('/user/')) {
      return [{ label: '차단', onClick: handleBlockUser }];
    }

    if (location.pathname === '/mypage/edit') {
      return [{ label: '탈퇴하기', onClick: handleDeleteAccount }];
    }
    if (location.pathname === '/mypage') {
      return [
        { label: '프로필 수정', onClick: handleEditProfile },
        { label: '차단 목록', onClick: handleBlockList },
        { label: '로그아웃', onClick: handleLogout },
      ];
    }

    return [{ label: '로그아웃', onClick: handleLogout }];
  };

  return getMoreOptionsItems();
};

import { deleteAccount, getUserInfo } from '@/apis/user';
import HeaderWithBack from '@/layouts/header/HeaderWithBack';
import { useAuthStore } from '@/store/authStore';
import { useModalStore } from '@/store/modalStore';
import { useNavigate } from 'react-router';

const MypageEditHeader = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { openModal, closeModal } = useModalStore();
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
              // console.log(error);
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

  const moreOptionsItems = [{ label: '탈퇴하기', onClick: handleDeleteAccount }];
  return <HeaderWithBack text="내 정보 수정" moreOptionsItems={moreOptionsItems} />;
};

export default MypageEditHeader;

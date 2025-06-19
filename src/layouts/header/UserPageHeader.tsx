import { addBlockList } from '@/apis/blockList';
import HeaderWithBack from '@/layouts/header/HeaderWithBack';
import { useModalStore } from '@/store/modalStore';
import { useUserStore } from '@/store/userStore';
import { useNavigate, useParams } from 'react-router';

const UserPageHeader = () => {
  const navigate = useNavigate();
  const param = useParams();
  const { userData } = useUserStore(); // 차단할 유저 정보
  const { openModal, closeModal } = useModalStore();

  const handleBlockUser = async () => {
    if (!param.userId) {
      // console.log('차단 실패');
      return;
    }

    openModal({
      title: [
        { text: `${userData?.nickname}`, className: 'text-primary-normal' },
        { text: ' 님을 차단할까요?' },
      ],
      message: '차단된 사용자는 더이상 피드에 나타나지 않습니다',
      onConfirm: async () => {
        if (param.userId) {
          try {
            const data = await addBlockList(param.userId);
            // console.log(data);
            //이미 차단 한 유저일 경우
            if (data.code === 400) {
              closeModal();
              openModal({
                title: `이미 차단한 유저입니다`,
                onConfirm: () => {
                  closeModal();
                },
              });
            } else {
              //차단 후 홈으로 이동
              navigate('/home');
              closeModal();
            }
          } catch (error) {
            // console.log(error);
          }
        }
      },
      onCancel: () => {
        closeModal();
      },
    });
  };
  const moreOptionsItems = [{ label: '차단', onClick: handleBlockUser }];
  return <HeaderWithBack moreOptionsItems={moreOptionsItems} />;
};

export default UserPageHeader;

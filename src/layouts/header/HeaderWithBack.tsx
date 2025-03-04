import { addBlockList } from '@/apis/blockList';
import MoreOptionsSelect from '@/components/MoreOptionsSelect';
import HedaerLayout from '@/layouts/header/HedaerLayout';
import { useModalStore } from '@/store/modalStore';
import { useSheetStore } from '@/store/sheetStore';
import backIcon from '@assets/icons/back-icon.svg';
import { useNavigate, useParams } from 'react-router';

interface HeaderWithBackProps {
  showMoreOptions?: boolean; // 더보기 메뉴를 표시할지 여부
  text?: string; // 헤더 텍스트
}

// 뒤로 가기 있는 헤더
function HeaderWithBack({ showMoreOptions = false, text }: HeaderWithBackProps) {
  const navigate = useNavigate();
  const param = useParams();

  const { openModal, closeModal } = useModalStore();
  const { currentRecord } = useSheetStore();
  // 임시함수
  const handleBlockUser = async () => {
    if (!param.userId || !currentRecord) {
      console.log('차단 실패');
      return;
    }

    openModal({
      title: `${currentRecord?.nickName}님을 차단할까요?`,
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

  return (
    <HedaerLayout>
      <div className="flex items-center justify-between w-full">
        {/* 뒤로가기 / 회원가입 */}
        <div className="gap-[10px] flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
            className="px-2 py-3 cursor-pointer"
          >
            <img src={backIcon} alt="뒤로가기 아이콘" />
          </button>
          {text && <span className="h4-b text-primary-normal">{text}</span>}
        </div>

        {/* 더보기 메뉴 */}
        {showMoreOptions && (
          <MoreOptionsSelect items={[{ label: '차단', onClick: handleBlockUser }]} />
        )}
      </div>
    </HedaerLayout>
  );
}

export default HeaderWithBack;

// 사용방법
// <HeaderWithBack text='회원가입' />
// <HeaderWithBack showMoreOptions />

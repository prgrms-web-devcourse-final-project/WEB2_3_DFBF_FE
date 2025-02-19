import MoreOptionsSelect from '@/components/MoreOptionsSelect';
import HedaerLayout from '@/layouts/header/HedaerLayout';
import backIcon from '@assets/icons/back-icon.svg';

interface HeaderWithBackProps {
  showMoreOptions?: boolean; // 더보기 메뉴를 표시할지 여부
  isSignup?: boolean; // 회원가입 보이기
}

// 뒤로 가기 있는 헤더
function HeaderWithBack({ showMoreOptions = false, isSignup = false }: HeaderWithBackProps) {
  // 임시함수
  const handleEditProfile = () => {
    console.log('임시함수');
  };

  return (
    <HedaerLayout>
      <div className="w-full flex items-center justify-between">
        {/* 뒤로가기 / 회원가입 */}
        <div className="gap-[10px] flex items-center">
          <button className="px-2 py-3 cursor-pointer">
            <img src={backIcon} alt="뒤로가기 아이콘" />
          </button>
          {isSignup && <span className="h4-b text-primary-normal">회원가입</span>}
        </div>

        {/* 더보기 메뉴 */}
        {showMoreOptions && (
          <MoreOptionsSelect
            items={[
              { label: '프로필 수정', onClick: handleEditProfile },
              { label: '로그아웃', onClick: handleEditProfile },
            ]}
          />
        )}
      </div>
    </HedaerLayout>
  );
}

export default HeaderWithBack;

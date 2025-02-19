import logo from '@assets/icons/logo.png';
import { Link } from 'react-router';
import MoreOptionsSelect from '@/components/MoreOptionsSelect';
import HedaerLayout from '@/layouts/header/HedaerLayout';

interface HeaderProps {
  showMoreOptions?: boolean; // 더보기 메뉴를 표시할지 여부
}

function Header({ showMoreOptions = false }: HeaderProps) {
  // 임시코드
  const handleEditProfile = () => {
    console.log('프로필 수정 클릭!');
  };

  const handleLogout = () => {
    console.log('로그아웃 클릭!');
  };

  return (
    <HedaerLayout>
      <div className="w-full flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>

        {/* 더보기 메뉴 */}
        {showMoreOptions && (
          <MoreOptionsSelect
            items={[
              { label: '프로필 수정', onClick: handleEditProfile },
              { label: '로그아웃', onClick: handleLogout },
            ]}
          />
        )}
      </div>
    </HedaerLayout>
  );
}

export default Header;

// 사용예시
// <Header />
// <Header showMoreOptions />

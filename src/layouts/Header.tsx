import logo from '@assets/icons/logo.png';

import { Link } from 'react-router';

import MoreOptionsSelect from '@/components/MoreOptionsSelect';

interface HeaderProps {
  showMoreOptions?: boolean; // 더보기 메뉴를 표시할지 여부
}

function Header({ showMoreOptions }: HeaderProps) {
  // 임시코드
  const handleEditProfile = () => {
    console.log('프로필 수정 클릭!');
  };

  const handleLogout = () => {
    console.log('로그아웃 클릭!');
  };

  return (
    <header className="h-[44px] bg-[#FBF5FF]/90 backdrop-blur-sm px-3 flex items-center justify-between">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>

      {/* 더보기 메뉴 아이콘 표시 */}
      <div className="flex gap-1">
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
    </header>
  );
}

export default Header;

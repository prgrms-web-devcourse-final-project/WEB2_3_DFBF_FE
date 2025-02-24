import { Link, useNavigate } from 'react-router';

import MoreOptionsSelect from '@/components/MoreOptionsSelect';
import HedaerLayout from '@/layouts/header/HedaerLayout';

import postIcon from '@/assets/icons/post-icon.svg';
import logo from '@assets/icons/logo.svg';
interface HeaderProps {
  showMoreOptions?: boolean; // 더보기 메뉴를 표시할지 여부
  showPostButton?: boolean; //게시글 작성 버튼을 표시할지 결정
}

function Header({ showMoreOptions = false, showPostButton = false }: HeaderProps) {
  const navigate = useNavigate();
  // 임시코드
  const handleEditProfile = () => {
    navigate('/mypage/edit');
  };

  const handleLogout = () => {
    console.log('로그아웃 클릭!');
  };
  const handleBLockList = () =>{
    navigate('/mypage/blocklist');
  }

  return (
    <HedaerLayout>
      <div className="w-full flex items-center justify-between">
        <Link to="/">
          <img className="w-[103px] h-[22px]" src={logo} alt="logo" />
        </Link>

        <div className="flex gap-1">
          {showPostButton && (
            <button
              onClick={() => navigate('/post')}
              className="w-6 h-6 flex justify-center items-center cursor-pointer"
            >
              <img src={postIcon} alt="글작성" />
            </button>
          )}

          {/* 더보기 메뉴 */}
          {showMoreOptions && (
            <MoreOptionsSelect
              items={[
                { label: '프로필 수정', onClick: handleEditProfile },
                { label: '차단 목록', onClick: handleBLockList },
                { label: '로그아웃', onClick: handleLogout },
              ]}
            />
          )}
        </div>
      </div>
    </HedaerLayout>
  );
}

export default Header;

// 사용예시
// <Header />
// <Header showMoreOptions />
// <Header showMoreOptions showPostButton/>

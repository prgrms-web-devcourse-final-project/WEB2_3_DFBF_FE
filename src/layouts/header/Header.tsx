import { Link } from 'react-router';

import MoreOptionsSelect from '@/components/MoreOptionsSelect';
import HedaerLayout from '@/layouts/header/HedaerLayout';

import logo from '@assets/icons/logo.svg';
interface HeaderProps {
  moreOptionsItems?: { label: string; onClick?: () => void }[]; // 더보기 메뉴에 실행할 함수
}

function Header({ moreOptionsItems }: HeaderProps) {
  return (
    <HedaerLayout>
      <div className="w-full flex items-center justify-between">
        <Link to="/home">
          <img className="w-[103px] h-[22px]" src={logo} alt="logo" />
        </Link>

        <div className="flex gap-1">
          {/* 더보기 메뉴 */}
          {moreOptionsItems && <MoreOptionsSelect items={moreOptionsItems} />}
        </div>
      </div>
    </HedaerLayout>
  );
}

export default Header;

// 사용예시
// <Header />
// <Header showMoreOptions />

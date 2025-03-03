import { Link } from 'react-router';

import MoreOptionsSelect from '@/components/MoreOptionsSelect';
import HedaerLayout from '@/layouts/header/HedaerLayout';

import logo from '@assets/icons/logo.svg';
import { useMoreOptions } from '@/hooks/useMoreOptions';
interface HeaderProps {
  showMoreOptions?: boolean; // 더보기 메뉴를 표시할지 여부
}

function Header({ showMoreOptions = false }: HeaderProps) {
  const moreOptionsItems = useMoreOptions();
  return (
    <HedaerLayout>
      <div className="w-full flex items-center justify-between">
        <Link to="/">
          <img className="w-[103px] h-[22px]" src={logo} alt="logo" />
        </Link>

        <div className="flex gap-1">
          {/* 더보기 메뉴 */}
          {showMoreOptions && <MoreOptionsSelect items={moreOptionsItems} />}
        </div>
      </div>
    </HedaerLayout>
  );
}

export default Header;

// 사용예시
// <Header />
// <Header showMoreOptions />

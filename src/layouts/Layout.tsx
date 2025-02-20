import Header from '@/layouts/header/Header';
import BottomNav from '@/layouts/BottomNav';
import { Outlet } from 'react-router';
import HeaderWithBack from '@/layouts/header/HeaderWithBack';
import HeaderChat from '@/layouts/header/HeaderChat';

function Layout() {
  return (
    <div className="relative max-w-[600px] min-w-[320px] w-full min-h-screen mx-auto bg-background flex flex-col">
      {/* 헤더 */}
      <Header showMoreOptions />

      {/* 메인 컨텐츠 영역 */}
      <div className="pt-[44px] pb-[62px] flex-1 flex justify-center w-full px-3">
        <Outlet />
      </div>

      {/* 하단 네비게이션 */}
      <BottomNav />
    </div>
  );
}

export default Layout;

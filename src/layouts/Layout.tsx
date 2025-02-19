import Header from '@/layouts/Header';
import BottomNav from '@/layouts/BottomNav';
import { Outlet } from 'react-router';

function Layout() {
  return (
    <div className="relative max-w-[600px] min-w-[320px] w-full min-h-screen mx-auto bg-background flex flex-col">
      {/* 헤더 */}
      <Header showMoreOptions />

      {/* 메인 컨텐츠 영역 */}
      <div className="flex-1 flex justify-center w-full px-3">
        <Outlet />
      </div>

      {/* 하단 네비게이션 */}
      <BottomNav />
    </div>
  );
}

export default Layout;

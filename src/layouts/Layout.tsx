import Header from '@/layouts/header/Header';
import BottomNav from '@/layouts/BottomNav';
import { Outlet, useLocation } from 'react-router';
import HeaderWithBack from '@/layouts/header/HeaderWithBack';
import HeaderChat from '@/layouts/header/HeaderChat';
import { twMerge } from 'tailwind-merge';

function Layout() {
  const location = useLocation(); // 현재 URL 가져오기
  const hideBottomNav = location.pathname.includes('signup'); // URL에 "signup" 포함 여부 확인 (임시)

  return (
    <div className="relative max-w-[600px] min-w-[320px] w-full min-h-screen mx-auto bg-background flex flex-col">
      {/* 헤더 */}
      <Header showMoreOptions />
      {/* <HeaderChat showLogo={true} showNickname={true}/> */}

      {/* 메인 컨텐츠 영역 */}
      <div
        className={twMerge(
          'pt-[44px] flex-1 flex justify-center w-full px-3',
          !hideBottomNav && 'pb-[62px] ', // 하단 네비게이션 숨길때만 padding주기
        )}
      >
        <Outlet />
      </div>

      {/* 하단 네비게이션 - signup 페이지가 아닐 때만 렌더링 */}
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}

export default Layout;

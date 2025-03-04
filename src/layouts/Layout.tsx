import Header from '@/layouts/header/Header';
import BottomNav from '@/layouts/BottomNav';
import { Outlet, useLocation } from 'react-router';
import HeaderWithBack from '@/layouts/header/HeaderWithBack';
import HeaderChat from '@/layouts/header/HeaderChat';
import { twMerge } from 'tailwind-merge';
import PostButton from '@/components/PostButton';
import { useRef } from 'react';

function Layout() {
  const location = useLocation(); // 현재 URL 가져오기
  //바텀 nav 바 필요한 페이지
  const showNav =
    //메인 페이지
    location.pathname === '/home' ||
    //마이 페이지
    location.pathname === '/mypage' ||
    //유저 페이지
    location.pathname.includes('/user') ||
    //지난 대화 기록 페이지
    location.pathname === '/chat';

  const renderBottomNav = () => {
    if (showNav) {
      return <BottomNav />;
    } else return null;
  };

  const headerConfig: { [key: string]: React.ReactNode } = {
    '/home': <Header />,
    '/chat': <Header />,
    '/mypage': <Header showMoreOptions />,
    '/post': <HeaderWithBack text="글 등록" />,
    '/signup': <HeaderWithBack text="회원가입" />,
    '/mypage/blocklist': <HeaderWithBack text="차단 목록" />,
    '/mypage/edit': <HeaderWithBack text="내 정보 수정" />,
  };

  const renderHeader = () => {
    if (location.pathname.includes('/user')) {
      return <HeaderWithBack showMoreOptions />;
    }
    if (location.pathname.includes('/chatroom')) {
      return <HeaderChat showLogo showNickname />;
    }
    return headerConfig[location.pathname] ?? <Header />;
  };

  const hasPostButton = location.pathname === '/home' || location.pathname === '/mypage';

  //헤더 클릭 시 스크롤
  const scrollContainerRef = useRef<HTMLDivElement>(null); // 스크롤 컨테이너 참조

  const handleScrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className="relative max-w-[600px] min-w-[320px] w-full h-screen mx-auto bg-background flex flex-col overflow-y-auto scroll"
    >
      {/* 헤더 */}
      <div onClick={handleScrollToTop}>{renderHeader()}</div>

      {/* 메인 컨텐츠 영역 */}
      <div
        className={twMerge(
          'pt-[44px] flex-1 flex justify-center w-full px-3',
          showNav && 'pb-[62px] ', // 하단 네비게이션 숨길때만 padding주기
        )}
      >
        <Outlet />
      </div>

      {/* 하단 네비게이션 */}
      {renderBottomNav()}
      {hasPostButton && <PostButton />}
    </div>
  );
}

export default Layout;

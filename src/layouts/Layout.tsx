import { Outlet, useLocation } from 'react-router';
import { twMerge } from 'tailwind-merge';
import PostButton from '@/components/PostButton';
import MyErrorBoundary from '@/components/ErrorBoundary';
// import { useEffect, useRef } from 'react';
// import { useScrollStore } from '@/store/scrollStore';
import BottomNavWrapper from '@/layouts/bottomNav/BottomNavWrapper';
import HeaderWrapper from '@/layouts/header/HeaderWrapper';

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

  //헤더 클릭 시 스크롤
  // const { setScrollContainerRefCurrent } = useScrollStore();
  // const scrollContainerRef = useRef<HTMLDivElement | null>(null); // 스크롤 컨테이너 참조
  // useEffect(() => {
  //   if (scrollContainerRef.current) setScrollContainerRefCurrent(scrollContainerRef.current);
  // }, [scrollContainerRef]);

  // const handleScrollToTop = () => {
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  //   }
  // };

  return (
    <div
      // ref={scrollContainerRef}
      className="relative max-w-[600px] min-w-[320px] w-full h-screen mx-auto bg-background flex flex-col overflow-y-auto scroll"
    >
      {/* 헤더 */}
      {/* <div onClick={handleScrollToTop}>{renderHeader()}</div> */}
      <HeaderWrapper />

      {/* 메인 컨텐츠 영역 */}
      <div
        className={twMerge(
          'pt-[44px] flex-1 flex justify-center w-full px-3',
          showNav && 'pb-[62px] ', // 하단 네비게이션 숨길때만 padding주기
        )}
      >
        <MyErrorBoundary>
          <Outlet />
        </MyErrorBoundary>
      </div>

      {/* 하단 네비게이션 */}
      <BottomNavWrapper />
      {/* 글작성 버튼 */}
      <PostButton />
    </div>
  );
}

export default Layout;

import { Outlet, useLocation } from 'react-router';
import { twMerge } from 'tailwind-merge';
import PostButton from '@/components/PostButton';
import MyErrorBoundary from '@/components/ErrorBoundary';
import BottomNavWrapper from '@/layouts/bottomNav/BottomNavWrapper';
import HeaderWrapper from '@/layouts/header/HeaderWrapper';
import { AnimatePresence, motion } from 'framer-motion';

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

  return (
    <div className="flex justify-center w-full min-h-screen">
      <div className="max-w-[600px] min-w-[320px] w-full bg-background flex flex-col">
        {/* 헤더 */}
        <HeaderWrapper />

        {/* 메인 컨텐츠 영역 */}
        <div
          className={twMerge(
            'pt-[44px] flex-1 flex justify-center w-full px-3',
            showNav && 'pb-[62px] ', // 하단 네비게이션 숨길때만 padding주기
          )}
        >
          <MyErrorBoundary>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname} // 경로가 바뀔 때마다 애니메이션 트리거
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center w-full h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </MyErrorBoundary>
        </div>

        {/* 하단 네비게이션 */}
        <BottomNavWrapper />
        {/* 글작성 버튼 */}
        <PostButton />
      </div>
    </div>
  );
}

export default Layout;

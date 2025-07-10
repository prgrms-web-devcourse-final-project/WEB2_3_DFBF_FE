import { Outlet } from 'react-router';
import { twMerge } from 'tailwind-merge';
import PostButton from '@/components/PostButton';
import MyErrorBoundary from '@/components/ErrorBoundary';
import HeaderWrapper from '@/layouts/header/HeaderWrapper';
import { AnimatePresence, motion } from 'framer-motion';
import BottomNav from '@/layouts/bottomNav/BottomNav';

function Layout() {
  return (
    <div className="max-w-[600px] min-w-[320px] w-full bg-background flex flex-col min-h-screen mx-auto">
      {/* 헤더 */}
      <HeaderWrapper />

      {/* 메인 컨텐츠 영역 */}
      <div className={twMerge('pt-[44px] flex-1 flex justify-center w-full px-3')}>
        <MyErrorBoundary>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname} // 경로가 바뀔 때마다 애니메이션 트리거
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center w-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </MyErrorBoundary>
      </div>

      {/* 하단 네비게이션 */}
      <BottomNav />
      {/* 글작성 버튼 */}
      <PostButton />
    </div>
  );
}

export default Layout;

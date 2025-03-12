import { AnimatePresence, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

function AnimatedLayout({ children }: { children: React.ReactNode }) {
  const getAnimation = () => {
    // location.pathname 등으로 분기하여 애니메이션 설정 반환
    if (
      location.pathname === '/signup' ||
      location.pathname === '/post' ||
      location.pathname === '/mypage/edit' ||
      location.pathname === '/mypage/blocklist' ||
      location.pathname.includes('user')
    ) {
      return {
        initial: { x: '100%' },
        animate: { x: 0 },
        exit: { x: '100%' },
        transition: { duration: 0.3 },
        style: { zIndex: 1 },
      };
    } else {
      // 기본 애니메이션 설정
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 },
      };
    }
  };
  return (
    <>
      <AnimatePresence mode="sync">
        <motion.div
          key={location.pathname}
          {...getAnimation()}
          className={twMerge('absolute left-1/2 -translate-x-1/2 w-full max-w-[600px] z-10')}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      {/* 양옆에 배경을 만드는 Grid 컨테이너 */}
      <div
        className={twMerge(
          'absolute top-0 left-0 right-0 bottom-0 grid grid-cols-[1fr_minmax(0,600px)_1fr]',
          'max-[600px]:hidden',
        )}
      >
        {/* 왼쪽 배경 */}
        <div className="w-full h-full bg-white z-50"></div>
        {/* 실제 내용이 들어가는 부분 */}
        <div className="relative w-full max-w-[600px]"></div>
        {/* 오른쪽 배경 */}
        <div className="w-full h-full bg-white z-50"></div>
      </div>
    </>
  );
}
export default AnimatedLayout;

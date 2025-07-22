import BackLink from '@/components/modalSheet/BackLink';
import CardDetailMoreMenu from '@/components/modalSheet/CardDetailMoreMenu';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface ModalSheetLayoutProps {
  children: React.ReactNode;
  isOwnPost: boolean;
}

function ModalSheetLayoutTemp({ children, isOwnPost }: ModalSheetLayoutProps) {
  //   // 애니메이션 설정
  const modalVariants = {
    hidden: { opacity: 0, y: -200 }, // 모달이 화면 밖에 위치하도록
    visible: { opacity: 1, y: 0 }, // 화면 안으로 날아오는 효과
    exit: { opacity: 0, y: -200 },
  };

  useEffect(() => {
    // 모달이 열릴 때
    document.documentElement.style.overflow = 'hidden';

    return () => {
      // 모달이 닫힐 때
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={modalVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-[600px] w-full h-screen flex flex-col bg-white rounded-lg card-shadow border border-gray-5">
        {/* 헤더 */}
        <div className="sticky top-0 flex h-[60px] items-center px-4 justify-between bg-white">
          <BackLink />
          {isOwnPost && <CardDetailMoreMenu />}
        </div>
        {children}
      </div>
    </motion.div>
  );
}

export default ModalSheetLayoutTemp;

// 사용예시
//   <ModalSheetLayout showMoreOptions> // 더보기 셀렉트 유무
//     <div className="w-full h-full border-2 border-green-500">hi</div>
//   </ModalSheetLayout>;

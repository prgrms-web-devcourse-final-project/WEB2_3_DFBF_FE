import React from 'react';
import closeIcon from '@assets/icons/close-icon.svg';
import MoreOptionsSelect from '@/components/MoreOptionsSelect';
import { useSheetStore } from '@/store/sheetStore';
import { motion } from 'framer-motion';

interface ModalSheetLayoutProps {
  children: React.ReactNode;
  isOwnPost?: boolean; // 더보기 메뉴를 표시할지 여부
}

function ModalSheetLayout({ children, isOwnPost }: ModalSheetLayoutProps) {
  const { closeSheet } = useSheetStore();
  const handleEditProfile = () => {
    console.log('임시 함수');
  };

  // 애니메이션 설정
  const modalVariants = {
    hidden: { opacity: 0, y: -200 }, // 모달이 화면 밖에 위치하도록
    visible: { opacity: 1, y: 0 }, // 화면 안으로 날아오는 효과
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pb-4">
      <motion.div
        className="max-w-[600px] w-full h-screen flex flex-col bg-white rounded-[8px] card-shadow overflow-y-auto"
        initial="hidden"
        animate="visible"
        variants={modalVariants}
        transition={{ duration: 0.3 }}
      >
        {/* 헤더 */}
        <div className="sticky top-0 flex min-h-[60px] h-[60px] items-center px-4 justify-between bg-white ">
          <button
            onClick={closeSheet}
            className="w-6 h-6 flex justify-center items-center cursor-pointer"
          >
            <img src={closeIcon} alt="닫기" />
          </button>
          {isOwnPost && (
            <MoreOptionsSelect
              items={[
                { label: '수정', onClick: handleEditProfile },
                { label: '삭제', onClick: handleEditProfile },
              ]}
            />
          )}
        </div>
        {children}
      </motion.div>
    </div>
  );
}

export default ModalSheetLayout;

// 사용예시
//   <ModalSheetLayout showMoreOptions> // 더보기 셀렉트 유무
//     <div className="border-2 border-green-500 w-full h-full">hi</div>
//   </ModalSheetLayout>;

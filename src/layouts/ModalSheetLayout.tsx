import React, { useEffect, useRef } from 'react';
import closeIcon from '@assets/icons/close-icon.svg';
import MoreOptionsSelect from '@/components/MoreOptionsSelect';
import { useSheetStore } from '@/store/sheetStore';
import { motion } from 'framer-motion';
import { useYouTubeStore } from '@/store/youtubeStore';

interface ModalSheetLayoutProps {
  children: React.ReactNode;
  isOwnPost?: boolean; // 더보기 메뉴를 표시할지 여부
  handleDelete?: () => void; // 삭제 함수
  handleEdit?: () => void; // 수정 함수
}

function ModalSheetLayout({
  children,
  isOwnPost,
  handleDelete,
  handleEdit,
}: ModalSheetLayoutProps) {
  const wasPlayingRef = useRef(false); // 이전 상태 저장

  const { closeAllSheets } = useSheetStore();
  const { players, setIsPlaying, setVideoId } = useYouTubeStore();

  const handleCloseButton = () => {
    closeAllSheets();
    setIsPlaying('3', false);
    setVideoId('3', null);
  };

  // 애니메이션 설정
  const modalVariants = {
    hidden: { opacity: 0, y: -200 }, // 모달이 화면 밖에 위치하도록
    visible: { opacity: 1, y: 0 }, // 화면 안으로 날아오는 효과
    exit: { opacity: 0, y: -200 },
  };

  useEffect(() => {
    // 1번 플레이어의 현재 재생 상태 저장
    wasPlayingRef.current = players['1']?.isPlaying || false;

    // 1번 플레이어 정지
    setIsPlaying('1', false);

    return () => {
      // 이전에 재생 중이었다면 다시 재생
      if (wasPlayingRef.current) {
        setIsPlaying('1', true);
      }
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
      <div className="max-w-[600px] w-full h-screen flex flex-col bg-white rounded-[8px] card-shadow border border-gray-5 overflow-y-auto scroll">
        {/* 헤더 */}
        <div className="sticky top-0 flex min-h-[60px] h-[60px] items-center px-4 justify-between bg-white ">
          <button
            onClick={handleCloseButton}
            className="flex items-center justify-center w-6 h-6 cursor-pointer"
          >
            <img src={closeIcon} alt="닫기" />
          </button>
          {isOwnPost && (
            <MoreOptionsSelect
              items={[
                { label: '수정', onClick: handleEdit },
                { label: '삭제', onClick: handleDelete },
              ]}
            />
          )}
        </div>
        {children}
      </div>
    </motion.div>
  );
}

export default ModalSheetLayout;

// 사용예시
//   <ModalSheetLayout showMoreOptions> // 더보기 셀렉트 유무
//     <div className="w-full h-full border-2 border-green-500">hi</div>
//   </ModalSheetLayout>;

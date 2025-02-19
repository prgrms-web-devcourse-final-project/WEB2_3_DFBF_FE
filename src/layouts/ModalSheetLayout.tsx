import React from 'react';
import closeIcon from '@assets/icons/close-icon.svg';
import MoreOptionsSelect from '@/components/MoreOptionsSelect';

interface ModalSheetLayoutProps {
  children: React.ReactNode;
  isOwnPost?: boolean; // 더보기 메뉴를 표시할지 여부
}

function ModalSheetLayout({ children, isOwnPost }: ModalSheetLayoutProps) {
  const handleEditProfile = () => {
    console.log('임시 함수');
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="max-w-[600px] w-full h-screen flex flex-col bg-white rounded-[8px] card-shadow">
        {/* 헤더 */}
        <div className="flex h-[60px] items-center px-4 justify-between">
          <button className="w-6 h-6 flex justify-center items-center cursor-pointer">
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
      </div>
    </div>
  );
}

export default ModalSheetLayout;

// 사용예시
//   <ModalSheetLayout showMoreOptions> // 더보기 셀렉트 유무
//     <div className="border-2 border-green-500 w-full h-full">hi</div>
//   </ModalSheetLayout>;

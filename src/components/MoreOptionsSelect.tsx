import MoreSelectBox from '@/components/MoreSelectBox';
import ellipsisIcon from '@assets/icons/ellipsis-icon.svg';
import { useState } from 'react';
import { createPortal } from 'react-dom';

interface MoreOptionsSelectProps {
  items: { label: string; onClick: () => void }[];
}

function MoreOptionsSelect({ items }: MoreOptionsSelectProps) {
  const [isSelectOpen, setIsSelectOpen] = useState(false); //셀렉트 박스(드롭다운)의 열림/닫힘 여부를 관리
  const isHeader = items.some((item) => item.label === '로그아웃');

  return (
    <div className="relative flex">
      {isSelectOpen &&
        createPortal(
          <>
            {/* 오버레이 - 전체 화면 덮기 */}
            <div
              className="fixed inset-0 bg-black/10 z-51"
              onClick={() => setIsSelectOpen(false)}
            />
          </>,
          document.body, //Portal을 이용해 body에 추가
        )}
      <button
        className="px-2 py-3 flex justify-center items-center cursor-pointer"
        onClick={() => setIsSelectOpen((prev) => !prev)}
      >
        <img src={ellipsisIcon} alt="더보기" />
      </button>
      {isSelectOpen &&
        (isHeader ? (
          createPortal(<MoreSelectBox items={items} />, document.body)
        ) : (
          <MoreSelectBox items={items} />
        ))}
    </div>
  );
}

export default MoreOptionsSelect;

// 사용 예시

// 함수 선언하기
//   const handleEditProfile = () => {
//     console.log('프로필 수정 클릭!');
//   };

//   const handleLogout = () => {
//     console.log('로그아웃 클릭!');
//   };

{
  /* <MoreOptionsSelect
            items={[
              { label: '프로필 수정', onClick: handleEditProfile },
              { label: '로그아웃', onClick: handleLogout },
            ]} */
}

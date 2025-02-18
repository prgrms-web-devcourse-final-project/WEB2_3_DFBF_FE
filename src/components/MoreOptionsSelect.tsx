import MoreSelectBox from '@/components/MoreSelectBox';
import ellipsisIcon from '@assets/icons/ellipsis-icon.svg';
import { useEffect, useRef, useState } from 'react';

interface MoreOptionsSelectProps {
  items: { label: string; onClick: () => void }[];
}

function MoreOptionsSelect({ items }: MoreOptionsSelectProps) {
  const [isSelectOpen, setIsSelectOpen] = useState(false); //셀렉트 박스(드롭다운)의 열림/닫힘 여부를 관리
  const selectRef = useRef<HTMLDivElement>(null); // 셀렉트 박스 영역 참조

  // 바깥 클릭 감지하여 셀렉트 박스 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex" ref={selectRef}>
      <button
        className="px-2 py-3 flex justify-center items-center cursor-pointer"
        onClick={() => setIsSelectOpen((prev) => !prev)}
      >
        <img src={ellipsisIcon} alt="더보기" />
      </button>
      {isSelectOpen && <MoreSelectBox items={items} />}
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

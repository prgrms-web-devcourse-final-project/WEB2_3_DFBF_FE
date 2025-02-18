import searchIconDefault from '@assets/icons/search-icon/search-icon-default.svg';
import searchIconHover from '@assets/icons/search-icon/search-icon-hover.svg';

import { useState } from 'react';
function SearchBar() {
  const [icon, setIcon] = useState(searchIconDefault); // 아이콘
  return (
    <div className="w-full h-[38px] rounded-[50px] input-shadow flex items-center px-3 gap-2 focus-within:border-[1.5px] focus-within:border-primary-active">
      <input
        type="text"
        className="w-full outline-none body-m placeholder:text-gray-400"
        placeholder="오늘의 음악을 검색해 보세요"
      />
      <button
        className="cursor-pointer"
        onMouseEnter={() => setIcon(searchIconHover)} // 마우스 오버 시 변경
        onMouseLeave={() => setIcon(searchIconDefault)} // 마우스 벗어날 때 원래대로
      >
        <img src={icon} alt="검색아이콘" />
      </button>
    </div>
  );
}

export default SearchBar;

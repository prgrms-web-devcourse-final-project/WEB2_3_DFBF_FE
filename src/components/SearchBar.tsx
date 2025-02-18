import searchIcon from '@assets/icons/search-icon.svg';
function SearchBar() {
  return (
    <div className="w-full h-[38px] rounded-[50px] input-shadow flex items-center px-3 gap-2 focus-within:border-[1.5px] focus-within:border-primary-active">
      <input
        type="text"
        className="w-full outline-none body-m placeholder:text-gray-400"
        placeholder="오늘의 음악을 검색해 보세요"
      />
      <button className="cursor-pointer">
        <img src={searchIcon} alt="검색아이콘" />
      </button>
    </div>
  );
}

export default SearchBar;

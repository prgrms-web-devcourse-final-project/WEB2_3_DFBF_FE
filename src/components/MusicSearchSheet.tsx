import InfoMessage from '@/components/InfoMessage';
import MusicSearchList from '@/components/MusicSearchList';
import SearchBar from '@/components/SearchBar';
import ModalSheetLayout from '@/layouts/ModalSheetLayout';
import { useState } from 'react';

function MusicSearchSheet() {
  const [query, setQuery] = useState(''); // 검색어 상태
  const [musics, setMusics] = useState([]); // 음악 목록을 저장

  // 음악 리스트 그리는 함수
  const musicListRender = () => {
    // ✅ 1. 검색을 수행하지 않은 초기 상태 (query가 비어 있음)
    if (query === '') {
      return <InfoMessage text="지금 생각나는 음악이 있나요?" />;
    }

    // ✅ 2. 검색을 수행했지만 결과가 없는 경우
    if (musics.length === 0) {
      return <InfoMessage text="검색 결과가 없습니다" />;
    }

    // ✅ 3. 검색 결과가 있는 경우, 리스트를 렌더링
    return (
      <div className="flex flex-col divide-y divide-gray-5">
        {musics.map((music, index) => (
          <MusicSearchList
            key={index}
            albumImage="https://pbs.twimg.com/media/E68WkI4VIAIW8eT.jpg"
            songTitle="Hype Boy"
            artistName="NewJeans"
          />
        ))}
      </div>
    );
  };

  return (
    <ModalSheetLayout>
      <div className="flex flex-col h-full gap-4 px-3">
        <SearchBar isSticky />
        {musicListRender()}
      </div>
    </ModalSheetLayout>
  );
}

export default MusicSearchSheet;

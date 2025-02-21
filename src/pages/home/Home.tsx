import SearchBar from '@/components/SearchBar';
import MainCard from '@/components/MainCard';
import { useState } from 'react';
import EmotionFilter from '@/components/EmotionFilter';

function Home() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null); // 선택된 감정
  const onEmotionClick = (emotion: string) => {
    setSelectedEmotion((prev) => (prev === emotion ? null : emotion));
    console.log(emotion);
  };

  return (
    <div className="flex flex-col gap-5 mt-5 h-fit w-full">
      <SearchBar />
      {/* 감정 필터링 */}
      <div className="flex flex-col items-center gap-5">
        <h2 className="font-saeeum text-2xl text-gray-60">
          나와 같은 감정을 느끼는 사람을 찾아보세요
        </h2>
        <EmotionFilter onEmotionClick={onEmotionClick} selectedEmotion={selectedEmotion} />
      </div>
      {/* 메인카드 리스트 */}
      <div className="flex flex-col items-center gap-2.5 pb-5">
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
      </div>
    </div>
  );
}

export default Home;

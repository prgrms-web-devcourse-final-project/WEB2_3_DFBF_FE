import EmotionBadge from '@/components/EmotionBadge';
import { EMOTIONS } from '@/constants';
import SearchBar from '@/components/SearchBar';
import { twMerge } from 'tailwind-merge';
import MainCard from '@/components/MainCard';

function Home() {
  return (
    <div className="flex flex-col gap-5 mt-5 h-fit w-full border border-amber-300">
      <SearchBar />
      {/* 감정 필터링 */}
      <div className="flex flex-col items-center gap-5">
        <h2 className="font-saeeum text-2xl text-gray-60">
          나와 같은 감정을 느끼는 사람을 찾아보세요
        </h2>
        <div className="w-fit grid grid-cols-4 gap-y-3 gap-x-5">
          {EMOTIONS.map((emotion) => (
            <EmotionBadge size="large" emotion={emotion.key} />
          ))}
        </div>
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

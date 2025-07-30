import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import SearchBar from '@/components/SearchBar';
import { useEffect, useState } from 'react';
import EmotionFilter from '@/components/EmotionFilter';
import { useSheetStore } from '@/store/sheetStore';
import { getEmotionRecords } from '@/apis/emotionRecord';

import MusicSearchSheet from '@/components/modalSheet/MusicSearchSheet';
import { useMusicCardStore } from '@/store/MusicCardStore';

import LoadingMini from '@/components/loading/LoadingMini';
import Loading from '@/components/loading/Loading';
import MainCardList from '@/pages/home/components/MainCardList';
import { Outlet } from 'react-router';

function Home() {
  const { isMusicSheetOpen, openSheet, closeAllSheets } = useSheetStore(); // 모달 시트
  const { selectedPostMusic, clearPostMusic } = useMusicCardStore(); // 선택된 음악

  const [searchText, setSearchText] = useState(''); // 검색어
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null); // 선택된 감정 필터

  // 감정 필터링
  const onEmotionClick = (emotion: string) => {
    setSelectedEmotion((prev) => (prev === emotion ? null : emotion));
  };

  // 감정 기록 불러오기
  const {
    data: emotionRecords,
    isLoading, // 첫 페이지 가져오는 중
    fetchNextPage, // 다음 페이지 가져오기 함수
    hasNextPage, // 다음 페이지가 있는지 여부
    isFetchingNextPage, // 다음 페이지 가져오는 중
  } = useInfiniteQuery({
    queryKey: ['emotionRecords', selectedPostMusic?.spotifyId, selectedEmotion],
    queryFn: async ({ pageParam }) => {
      const { data } = await getEmotionRecords(
        pageParam,
        10,
        selectedPostMusic?.spotifyId,
        selectedEmotion,
      );

      // // console.log('감정 기록 불러오기', data);
      return data;
    },

    getNextPageParam: (last) => {
      if (last.currentPage < last.totalPages) {
        return last.currentPage + 1;
      }

      // 다음 페이지가 없으면 undefined 반환
      return undefined;
    },
    initialPageParam: 1, // 첫 페이지 번호 초기화!
  });

  const allRecords = emotionRecords?.pages.flatMap((page) => page.records) ?? [];

  // 무한 스크롤 감지 요소 추가
  const { ref, inView } = useInView();

  // 무한 스크롤
  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage]);

  // 음악 선택 시 검색창에 표시
  useEffect(() => {
    if (selectedPostMusic) {
      closeAllSheets();
      setSearchText(`${selectedPostMusic.artist} - ${selectedPostMusic.title}`);
    } else if (!selectedPostMusic && searchText) {
      // 음악 선택 해제 시 검색창 초기화
      setSearchText('');
    }
  }, [selectedPostMusic]);

  // 검색어가 비어있으면 음악 선택 초기화
  useEffect(() => {
    if (!searchText && selectedPostMusic) {
      clearPostMusic();
      // // console.log('텍스트 지웠으니 음악도 날림', selectedPostMusic);
    }
  }, [searchText]);

  return (
    <div className="flex flex-col w-full gap-5 mt-5">
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        onClick={() => openSheet('isMusicSheetOpen')} // 음악 검색 모달 열기
      />

      {/* 감정 필터링 */}
      <div className="flex flex-col items-center gap-5">
        <h2 className="text-2xl font-saeeum text-gray-60">
          나와 같은 감정을 느끼는 사람을 찾아보세요
        </h2>
        <EmotionFilter onEmotionClick={onEmotionClick} selectedEmotion={selectedEmotion} />
      </div>

      {/* 메인카드 리스트 */}
      <div className="pb-5">
        <MainCardList records={allRecords} />
        {hasNextPage && !isFetchingNextPage && (
          <div className="m-auto" ref={ref}>
            <LoadingMini />
          </div>
        )}
      </div>
      <Outlet />
      {isLoading && <Loading />}
      {isMusicSheetOpen && <MusicSearchSheet />}
    </div>
  );
}

export default Home;

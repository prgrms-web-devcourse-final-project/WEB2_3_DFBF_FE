import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import SearchBar from '@/components/SearchBar';
import MainCard from '@/components/MainCard';
import { useEffect, useState } from 'react';
import EmotionFilter from '@/components/EmotionFilter';
import { useSheetStore } from '@/store/sheetStore';
import CardDetailModal from '@/components/modalSheet/CardDetailModal';
import { getEmotionRecords } from '@/apis/emotionRecord';
import { formatDate } from '@/utils/formatDate';
import MusicSearchSheet from '@/components/modalSheet/MusicSearchSheet';
import { useMusicCardStore } from '@/store/MusicCardStore';
import InfoMessage from '@/components/InfoMessage';
import LoadingMini from '@/components/loading/LoadingMini';
import Loading from '@/components/loading/Loading';
import { useScrollStore } from '@/store/scrollStore';

function Home() {
  const { scrollContainerRefCurrent } = useScrollStore();
  const { isMusicSheetOpen, openSheet, closeAllSheets } = useSheetStore(); // 모달 시트
  const { selectedPostMusic, clearPostMusic } = useMusicCardStore(); // 선택된 음악

  const [searchText, setSearchText] = useState(''); // 검색어
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null); // 선택된 감정 필터
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null); // 선택한 타인 감정 게시글 id -> 게시글 상세 모달 열기

  // 감정 필터링
  const onEmotionClick = (emotion: string) => {
    setSelectedEmotion((prev) => (prev === emotion ? null : emotion));
    console.log(selectedEmotion);
  };

  // 유저 상세 페이지 모달 열기
  const handleOpenSheet = (recordId: number) => {
    setSelectedRecordId(recordId);
    openSheet('isCardSheetOpen'); // 모달 열기
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
      // console.log('pageParam:', pageParam);
      try {
        const { data } = await getEmotionRecords(
          pageParam,
          10,
          selectedPostMusic?.spotifyId,
          selectedEmotion,
        );

        return data;
      } catch (error) {
        console.error('감정 기록 불러오기 에러', error);
        return { records: [], currentPage: 1, totalPages: 1 };
      }
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

  useEffect(() => {
    // 첫 페이지 로드
    // console.log('페이지 로드', isLoading);
  }, [isLoading]);

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
      setSearchText(`${selectedPostMusic.artistName} - ${selectedPostMusic.songTitle}`);
    } else if (!selectedPostMusic && searchText) {
      // 음악 선택 해제 시 검색창 초기화
      setSearchText('');
    }
  }, [selectedPostMusic]);

  // 검색어가 비어있으면 음악 선택 초기화
  useEffect(() => {
    if (!searchText && selectedPostMusic) {
      clearPostMusic();
      // console.log('텍스트 지웠으니 음악도 날림', selectedPostMusic);
    }
  }, [searchText]);

  //홈 이동 시 스크롤 제일 위로
  useEffect(() => {
    if (scrollContainerRefCurrent) {
      console.log(scrollContainerRefCurrent);
      scrollContainerRefCurrent.scrollTop = 0; // 제일 위로 스크롤
    }
  }, [scrollContainerRefCurrent]);

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
      <div className="flex-1">
        {emotionRecords?.pages[0].records.length > 0 ? (
          <>
            <div className="flex flex-col items-center gap-2.5 pb-5 ">
              {emotionRecords?.pages.map((page) =>
                page.records.map((record: EmotionRecord) => (
                  <div className="w-full" key={record.recordId}>
                    <div onClick={() => handleOpenSheet(record.recordId)}>
                      <MainCard
                        albumImage={record.spotifyMusic.albumImage} // 앨범 이미지
                        nickname={record.nickName} // 닉네임
                        emotion={record.emotion} // 감정
                        title={record.spotifyMusic.title} // 노래 제목
                        artist={record.spotifyMusic.artist} // 가수
                        comment={record.comment} // 글 내용
                        createdAt={formatDate(record.createdAt)} // 날짜
                        isChatting={true} // 현재 채팅중인지
                      />
                    </div>
                  </div>
                )),
              )}
              {hasNextPage && !isFetchingNextPage && (
                <div className="m-auto" ref={ref}>
                  <LoadingMini />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <InfoMessage text="아직 작성된 글이 없어요" />
          </div>
        )}
      </div>
      {selectedRecordId !== null && (
        <CardDetailModal recordId={selectedRecordId} isChatting={false} />
      )}
      {isLoading && <Loading />}
      {isMusicSheetOpen && <MusicSearchSheet />}
    </div>
  );
}

export default Home;

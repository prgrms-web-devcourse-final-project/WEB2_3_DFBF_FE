import InfoMessage from '@/components/InfoMessage';
import MusicSearchList from '@/components/modalSheet/MusicSearchList';
import SearchBar from '@/components/SearchBar';
import { useSpotifyAuth } from '@/hooks/useSpotifyAuth';
import ModalSheetLayout from '@/layouts/ModalSheetLayout';
import { useEffect, useRef, useState } from 'react';
import defaultImage from '@assets/images/default.png';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';

function MusicSearchSheet() {
  const [searchText, setSearchText] = useState('');
  const [query, setQuery] = useState('');
  //spotify 로그인 후 토큰 가져오기
  const { token } = useSpotifyAuth();

  // 무한 스크롤 감지용 ref
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  //Spotify 음악 검색
  const fetchMusic = async ({ pageParam = 0 }) => {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&offset=${pageParam}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return { items: data.tracks.items, total: data.tracks.total };
  };

  const {
    data, // 가져온 데이터
    isLoading, // 첫 페이지 로딩 중
    isFetchingNextPage, // 다음 페이지 로딩 중
    hasNextPage, // 다음 페이지 여부
    fetchNextPage, // 다음 페이지 요청 함수
  } = useInfiniteQuery({
    queryKey: ['musics', query], // 검색어를 쿼리 키로 사용
    queryFn: fetchMusic,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * 20;
      return nextOffset < lastPage.total ? nextOffset : undefined;
    },
    enabled: !!query, // 검색어가 있을 때만 API 호출
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  //디바운스 적용
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchText.trim()) {
        setQuery(searchText);
      } else {
        setQuery('');
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchText]);

  //무한스크롤 IO
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage(); // 하단에 도달하면 다음 페이지를 요청
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  //음악 리스트 렌더링
  const musicListRender = () => {
    if (!query) {
      return <InfoMessage text="지금 생각나는 음악이 있나요?" />;
    }

    if (!data?.pages[0].items.length) {
      return <InfoMessage text="검색 결과가 없습니다" />;
    }

    return (
      <div className="flex flex-col divide-y divide-gray-5">
        {data?.pages.map((page, index) => (
          <div key={index}>
            {page.items.map((music: SpotifyMusic, i: number) => (
              <MusicSearchList
                key={i}
                albumImage={music.album.images?.[0]?.url || defaultImage}
                songTitle={music.name}
                artistName={music.artists[0].name}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <ModalSheetLayout>
      <div className="flex flex-col h-full gap-4 px-3">
        <SearchBar isSticky searchText={searchText} setSearchText={setSearchText} />
        {musicListRender()}
        <div ref={loadMoreRef} className="min-h-[10px]"></div>
      </div>
    </ModalSheetLayout>
  );
}

export default MusicSearchSheet;

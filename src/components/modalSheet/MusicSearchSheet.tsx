import InfoMessage from '@/components/InfoMessage';
import MusicSearchList from '@/components/modalSheet/MusicSearchList';
import SearchBar from '@/components/SearchBar';
import ModalSheetLayout from '@/layouts/ModalSheetLayout';
import { useEffect, useRef, useState } from 'react';
import defaultImage from '@assets/images/default.png';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import LoadingMini from '../loading/LoadingMini';
import { useSpotifyStore } from '@/store/spotifyStore';
import { useSpotifyAuth } from '@/hooks/spotify/useSpotifyAuth';

function MusicSearchSheet() {
  const [searchText, setSearchText] = useState('');
  const [query, setQuery] = useState('');
  //로컬 스토리지에서 토큰 가져오기
  const { token } = useSpotifyStore();

  useSpotifyAuth();

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
    if (!token) {
      return (
        <div className="h-[calc(100vh-154px)]">
          <InfoMessage text="Spotify 로그인이 필요합니다." />
        </div>
      );
    }
    if (!query) {
      return (
        <div className="h-[calc(100vh-154px)]">
          <InfoMessage text="지금 생각나는 음악이 있나요?" />
        </div>
      );
    }
    if (isLoading) {
      return (
        <div className="flex justify-center mt-5">
          <LoadingMini />
        </div>
      );
    }

    if (!data?.pages[0].items.length) {
      return (
        <div className="h-[calc(100vh-154px)]">
          <InfoMessage text="검색 결과가 없습니다." />
        </div>
      );
    }

    return (
      <div className="flex flex-col divide-y divide-gray-5">
        {data?.pages.map((page, index) => (
          <div key={index} className="flex flex-col divide-y divide-gray-5">
            {page.items.map((music: SpotifyMusic, i: number) => (
              <MusicSearchList
                key={i}
                spotifyId={music.id}
                albumImage={music.album.images?.[0]?.url || defaultImage}
                songTitle={music.name}
                artistName={music.artists[0].name}
              />
            ))}
          </div>
        ))}
        {isFetchingNextPage && (
          <div className="flex justify-center mt-5">
            <LoadingMini />
          </div>
        )}
      </div>
    );
  };

  return (
    <ModalSheetLayout>
      <div className="flex flex-col h-auto gap-4 px-3">
        <div className="sticky top-[60px] bg-white rounded-b-[20px]">
          <SearchBar isSticky searchText={searchText} setSearchText={setSearchText} />
        </div>
        {musicListRender()}
        <div ref={loadMoreRef} className="min-h-[10px]"></div>
      </div>
    </ModalSheetLayout>
  );
}

export default MusicSearchSheet;

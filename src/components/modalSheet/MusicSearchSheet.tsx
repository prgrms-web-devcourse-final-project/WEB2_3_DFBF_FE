import InfoMessage from '@/components/InfoMessage';
import MusicSearchList from '@/components/modalSheet/MusicSearchList';
import SearchBar from '@/components/SearchBar';
import { useSpotifyAuth } from '@/hooks/useSpotifyAuth';
import ModalSheetLayout from '@/layouts/ModalSheetLayout';
import { useEffect, useState } from 'react';
import defaultImage from '@assets/images/default.png';

interface SpotifyMusic {
  album: {
    album_type: string;
    artists: SpotifyArtist[];
    available_markets: string[];
    external_urls: { spotify: string };
    href: string;
    id: string;
    images?: { url: string; height: number; width: number }[];
    name: string;
    release_date?: string;
    release_date_precision?: string;
    total_tracks?: number;
    type: string;
    uri: string;
  };
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { isrc: string };
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
}

interface SpotifyArtist {
  external_urls: { spotify: string };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

function MusicSearchSheet() {
  const [query, setQuery] = useState(''); // 검색어 상태
  const [musics, setMusics] = useState<SpotifyMusic[]>([]); // 음악 목록을 저장

  const { token } = useSpotifyAuth();

  // spotify 음악 검색
  const searchMusic = async (query: string) => {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const data = await res.json();
    if (data.tracks.items.length > 0) {
      console.log(data.tracks.items);
      setMusics(data.tracks.items); // 검색된 트랙들 저장
    } else {
      setMusics([]); // 검색 결과가 없으면 빈 배열
    }
  };

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
            albumImage={music.album.images?.[0]?.url || defaultImage}
            songTitle={music.name}
            artistName={music.artists[0].name}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (query === '') {
      setMusics([]);
      return;
    }
    const debounce = setTimeout(() => {
      if (query.trim()) searchMusic(query);
    }, 300); // 디바운스

    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <ModalSheetLayout>
      <div className="flex flex-col h-full gap-4 px-3">
        <SearchBar isSticky query={query} setQuery={setQuery} />
        {musicListRender()}
      </div>
    </ModalSheetLayout>
  );
}

export default MusicSearchSheet;

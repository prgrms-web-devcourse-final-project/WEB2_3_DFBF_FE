import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const searchYoutubeVideo = async (query: string) => {
  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query,
    )}&type=video&maxResults=1&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`,
  );
  return data.items[0].id.videoId; // 첫 번째 검색 결과의 영상 ID 반환
};

// React Query
export const useSearchYoutubeVideo = (query: string|null) => {
  return useQuery({
    queryKey: ['youtubeSearch', query], // 캐싱을 위한 키
    queryFn: () => (query ? searchYoutubeVideo(query) : null), // API 요청 함수
    enabled: !!query, // query가 존재할 때만 실행
    staleTime: 1000 * 60 * 10, // 10분 동안 캐싱
  });
};

import axios from 'axios';

export const searchYoutubeVideo = async (query: string) => {
  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      query,
    )}&type=video&maxResults=1&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`,
  );
  return data.items[0].id.videoId; // 첫 번째 검색 결과의 영상 ID 반환
};

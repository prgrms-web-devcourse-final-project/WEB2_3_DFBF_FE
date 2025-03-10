import { getSpotifyVideoId } from '@/apis/emotionRecord';
import { searchYoutubeVideo } from '@/apis/youtube';

export const fetchSpotifyVideoId = async (spotifyId: string, artist: string, title: string) => {
  try {
    const data = await getSpotifyVideoId(spotifyId); // 서버에 videoId 조회
    console.log('videoId 조회 결과:', data);

    // 서버에 videoId 가 있으면
    if (data.code === 200 && data.data) {
      console.log('서버 videoId 존재함!:', data.data);
      return data.data;
    }
    // 서버에 videoId 가 없으면
    else {
      // youtube 검색
      const newVideoId = await searchYoutubeVideo(`${artist} - ${title} lyrics`);
      console.log('유튜브 videoId:', newVideoId);
      return newVideoId;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

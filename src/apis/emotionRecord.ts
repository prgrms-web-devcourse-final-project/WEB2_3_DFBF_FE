import { axiosInstance } from '@/apis/axios';

export interface EmotionRecordRequest {
  spotifyId: string;
  title: string;
  artist: string;
  albumImage: string;
  emotion: string;
  comment: string;
}

// 감정 기록 포스팅
export const postEmotionRecord = async (emotionRecord: EmotionRecordRequest) => {
  const { data } = await axiosInstance.post(`/emotion`, emotionRecord);
  return data;
};

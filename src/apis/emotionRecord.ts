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

// 유저별 감정 기록 조회
export const getUserEmotionRecords = async (tag: string, page = 0, size = 10) => {
  const { data } = await axiosInstance.get('/emotion/user', {
    params: { tag, page, size },
  });
  return data;
};

// 상세 감정 기록 조회
export const getEmotionRecordById = async (recordId: number) => {
  const { data } = await axiosInstance.get(`/emotion/${recordId}`);
  return data;
};

// 메인 페이지 감정 기록 조회
export const getEmotionRecords = async (page = 0, size = 10) => {
  const { data } = await axiosInstance.get('/emotion', {
    params: { page, size },
  });
  return data;
};

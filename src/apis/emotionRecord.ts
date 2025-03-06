import { axiosInstance } from '@/apis/axios';

export interface EmotionRecordRequest {
  spotifyId: string;
  title: string;
  artist: string;
  albumImage: string;
  emotion: string;
  comment: string;
}

interface EmotionRecordsParams {
  page: number;
  size: number;
  spotifyId?: string;
  emotions?: string;
}

// 감정 기록 포스팅
export const postEmotionRecord = async (emotionRecord: EmotionRecordRequest) => {
  const { data } = await axiosInstance.post(`/emotion`, emotionRecord);
  return data;
};

// spotifyId로 videoId 조회
export const getSpotifyVideoId = async (spotifyId: string) => {
  const { data } = await axiosInstance.get(`/emotion/spotify-video`, {
    params: { spotifyId },
  });
  return data;
};

// 감정 기록 수정
export const putEmotionRecord = async (recordId: number, emotionRecord: EmotionRecordRequest) => {
  const { data } = await axiosInstance.put(`/emotion/${recordId}`, emotionRecord);
  return data;
};

// 유저별 감정 기록 조회
export const getUserEmotionRecords = async (tag: string, page: number, size = 10) => {
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

// 감정 기록 삭제
export const deleteEmotionRecord = async (recordId: number) => {
  const { data } = await axiosInstance.delete(`/emotion/${recordId}`);
  return data;
};

// 메인 페이지 감정 기록 조회
export const getEmotionRecords = async (
  page: number,
  size: number,
  spotifyId?: string,
  emotions?: string | null,
) => {
  const params: EmotionRecordsParams = { page, size };

  if (spotifyId) params.spotifyId = spotifyId;
  if (emotions) params.emotions = emotions;

  const { data } = await axiosInstance.get('/emotion', {
    params,
  });
  return data;
};

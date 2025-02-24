// Spotify 음악 정보
interface RecordSpotifyMusic {
  spotifyId: number;
  title: string;
  artist: string;
  albumImage: string;
}

// 개별 기록 데이터
interface EmotionRecord {
  recordId: number;
  emotion: string;
  spotifyMusic: RecordSpotifyMusic;
  comment: string;
  createdAt: string;
}

// 전체 데이터 구조
interface EmotionRecordResponse {
  records: Record[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
}
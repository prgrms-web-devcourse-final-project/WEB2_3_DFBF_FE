// Spotify 음악 정보
interface RecordSpotifyMusic {
  albumImage: string;
  artist: string;
  spotifyId: string;
  title: string;
}

// 개별 기록 데이터
interface EmotionRecord {
  comment: string;
  createdAt: string;
  emotion: string;
  nickName: string;
  recordId: number;
  spotifyMusic: RecordSpotifyMusic;
}

// 전체 데이터 구조
interface EmotionRecordResponse {
  records: EmotionRecord[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
}

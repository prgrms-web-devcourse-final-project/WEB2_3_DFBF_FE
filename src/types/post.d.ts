// 감정 정보 타입
interface Emotion {
    emotion_id: number;
    name: string;
  }
  
  // 음악 정보 타입
  interface SpotifyMusic {
    spotify_id: number;
    title: string;
    artist: string;
    album_image: string | null | undefined;
  }
  
  // 감정 기록 타입
  interface EmotionRecord {
    record_id: number;
    user_id: number;
    emotion: Emotion;
    spotify_music: SpotifyMusic;
    comment: string;
    created_at: string; // ISO 8601 날짜 문자열
  }
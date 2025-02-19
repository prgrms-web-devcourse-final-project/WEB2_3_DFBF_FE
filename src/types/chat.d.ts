interface ChatHistory {
  chatroom_id: number;
  nickname: string;
  emotion: string;
  spotify_id: number;
  title: string;
  artist: string;
  album_image: string | null;
  created_at: string; // 또는 Date
}

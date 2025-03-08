interface ChatHistory {
  chatRoomId: number;
  nickname: string;
  emotion: string;
  spotifyId: number;
  title: string;
  artist: string;
  albumImage: string | null;
  createdAt: string; // 또는 Date
  comment: string;
}

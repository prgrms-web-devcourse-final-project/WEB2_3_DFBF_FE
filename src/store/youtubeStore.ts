import { create } from 'zustand';

interface YouTubePlayerState {
  videoId: string | null;
  isPlaying: boolean;
}

interface YouTubeStore {
  isApiReady: boolean;
  setApiReady: () => void;
  players: Record<string, YouTubePlayerState>; // 여러 개의 플레이어를 저장
  setVideoId: (playerId: string, id: string|null) => void;
  setIsPlaying: (playerId: string, playing?: boolean | ((prev: boolean) => boolean)) => void;
}

export const useYouTubeStore = create<YouTubeStore>((set) => ({
  isApiReady: false,
  setApiReady: () => set({ isApiReady: true }),
  players: {}, // 여러 개의 플레이어를 저장할 객체

  setVideoId: (playerId, id) =>
    set((state) => ({
      players: {
        ...state.players,
        [playerId]: {
          ...state.players[playerId],
          videoId: id,
        },
      },
    })),

  setIsPlaying: (playerId, playing) =>
    set((state) => ({
      players: {
        ...state.players,
        [playerId]: {
          ...state.players[playerId],
          isPlaying:
            typeof playing === 'boolean' ? playing : !state.players[playerId]?.isPlaying, // 토글 가능
        },
      },
    })),
}));

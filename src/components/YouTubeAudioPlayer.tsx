// import React, { useEffect, useRef } from 'react';
// // import YouTube from 'react-youtube';
// import { useYouTubeStore } from '@/store/youtubeStore';
// import { createPortal } from 'react-dom';
// // import { twMerge } from 'tailwind-merge';

// // YouTube Player Props 정의
// //1: MusicCard 2: chat 3: post
// interface YouTubeAudioPlayerProps {
//   playerId: '1' | '2' | '3';
// }

// const YouTubeAudioPlayer: React.FC<YouTubeAudioPlayerProps> = ({ playerId }) => {
//   const { isApiReady, players, setIsPlaying } = useYouTubeStore();

//   const playerRef = useRef<YT.Player | null>(null);
//   const videoId = players[playerId]?.videoId || null;
//   const isPlaying = players[playerId]?.isPlaying || false;

//   // 플레이어 생성
//   const createPlayer = () => {
//     if (!isApiReady || !videoId) {
//       if (playerRef.current && playerRef.current.seekTo) {
//         playerRef.current.seekTo(0, false);
//         playerRef.current.pauseVideo();
//       }
//       return;
//     } // API 준비되지 않았거나 videoId가 없으면

//     if (!playerRef.current) {
//       playerRef.current = new window.YT.Player(`player-${playerId}`, {
//         height: '1px',
//         width: '1px',
//         videoId: videoId,
//         playerVars: {
//           autoplay: 0,
//           controls: 0,
//           playsinline: 1,
//           origin: window.location.origin, // 현재 페이지의 origin을 전달
//         },
//       });
//     } else {
//       playerRef.current.loadVideoById(videoId); // 이미 플레이어가 있으면 비디오를 새로 로드
//       playerRef.current.pauseVideo();
//       setIsPlaying(playerId, false);
//     }
//   };

//   // isPlaying 변경 시 실행
//   useEffect(() => {
//     if (!playerRef.current) return; // 플레이어가 초기화되지 않았으면 실행 안 함

//     if (isPlaying) {
//       playerRef.current.playVideo?.();
//     } else {
//       playerRef.current.pauseVideo?.();
//     }
//   }, [isPlaying]);

//   useEffect(() => {
//     createPlayer();
//   }, [videoId, isApiReady]);

//   useEffect(() => {
//     const playerElement = document.getElementById(`player-${playerId}`);
//     if (playerElement) {
//       playerElement.style.position = 'absolute';
//       playerElement.style.top = '0px';
//     }
//   }, []);
//   return createPortal(<div id={`player-${playerId}`}></div>, document.body);
// };

// export default YouTubeAudioPlayer;

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useYouTubeStore } from '@/store/youtubeStore';

// YouTube Player Props 정의
// 1: MusicCard, 2: chat, 3: post
interface YouTubeAudioPlayerProps {
  playerId: '1' | '2' | '3';
}

const YouTubeAudioPlayer: React.FC<YouTubeAudioPlayerProps> = ({ playerId }) => {
  // 1. 스토어에서 필요한 상태와 함수를 가져옵니다.
  const { isApiReady, players, setIsPlaying } = useYouTubeStore();
  const playerRef = useRef<YT.Player | null>(null);

  // players 객체에서 현재 playerId에 맞는 videoId와 isPlaying 상태를 안전하게 추출합니다.
  const { videoId, isPlaying } = players[playerId] || { videoId: null, isPlaying: false };

  // 2. 플레이어 생성, 파괴를 관리하는 메인 useEffect
  useEffect(() => {
    // API가 준비되지 않았거나 재생할 videoId가 없으면 플레이어를 생성하지 않습니다.
    if (!isApiReady || !videoId) {
      return;
    }

    // 새 플레이어 인스턴스를 생성합니다.
    playerRef.current = new window.YT.Player(`player-${playerId}`, {
      height: '0', // 플레이어는 보이지 않도록 처리합니다.
      width: '0',
      videoId: videoId,
      playerVars: {
        playsinline: 1,
        origin: window.location.origin,
      },
      events: {
        // 플레이어가 준비되면 호출됩니다.
        onReady: (event: any) => {
          // isPlaying 상태가 true이면 비디오를 재생합니다.
          if (isPlaying) {
            event.target.playVideo();
          }
        },
        // 플레이어의 상태가 변경될 때마다 호출됩니다. (재생, 일시정지 등)
        onStateChange: (event: any) => {
          // 실제 플레이어 상태를 스토어(전역 상태)에 반영합니다.
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(playerId, true);
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(playerId, false);
          }
        },
      },
    });

    // 3. Cleanup 함수 (매우 중요)
    // useEffect가 다시 실행되기 전(즉, videoId가 바뀔 때) 또는 컴포넌트가 사라질 때 호출됩니다.
    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy(); // 기존 플레이어를 완전히 제거하여 메모리 누수를 방지합니다.
        playerRef.current = null;
      }
    };
    // isApiReady, videoId가 변경될 때마다 이 로직을 다시 실행합니다.
  }, [isApiReady, videoId, playerId, isPlaying, setIsPlaying]);

  // 4. 스토어의 isPlaying 상태가 바뀔 때 플레이어를 제어하는 useEffect
  useEffect(() => {
    // 플레이어 인스턴스가 없거나, 아직 제어할 준비가 안 됐으면 아무것도 하지 않습니다.
    if (!playerRef.current || typeof playerRef.current.getPlayerState !== 'function') {
      return;
    }

    const playerState = playerRef.current.getPlayerState();

    // 스토어 상태와 실제 플레이어 상태를 동기화합니다.
    if (isPlaying && playerState !== window.YT.PlayerState.PLAYING) {
      playerRef.current.playVideo();
    } else if (!isPlaying && playerState !== window.YT.PlayerState.PAUSED) {
      playerRef.current.pauseVideo();
    }
  }, [isPlaying]); // isPlaying 상태가 변경될 때만 실행합니다.

  // 5. 플레이어를 body 최상단에 렌더링합니다.
  return createPortal(<div id={`player-${playerId}`} />, document.body);
};

export default YouTubeAudioPlayer;

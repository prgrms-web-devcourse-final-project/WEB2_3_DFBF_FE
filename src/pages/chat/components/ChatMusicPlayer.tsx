import React, { useEffect, useRef, useState } from 'react';
import defaultImage from '@assets/images/default.png';
import play from '@assets/icons/play/play.svg';
import pause from '@assets/icons/pause.svg';
import { useSearchYoutubeVideo } from '@/apis/youtube';
import { useYouTubeStore } from '@/store/youtubeStore';

export default function ChatMusicPlayer() {
  const [moveDistance, setMoveDistance] = useState(0);
  const titleRef = useRef<HTMLParagraphElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 음악 정보
  const musicInfo = {
    spotify_id: 33,
    title: '라일락',
    artist: '아이유',
    album_image: 'https://img2.sbs.co.kr/img/seditor/VD/2021/03/31/SR81617163961686-640-0.jpg',
  };

  const { setVideoId, players, setIsPlaying } = useYouTubeStore();
  const isPlaying = players['2']?.isPlaying || false;

  // React Query로 유튜브 비디오 ID 가져오기
  const query = musicInfo.title ? `${musicInfo.artist} - ${musicInfo.title} lyrics` : null;
  const { data: searchedVideoId, isLoading, isError } = useSearchYoutubeVideo(query);

  const handlePlayButton = () => {
    setIsPlaying('2', (prev) => !prev);
  };

  // videoId가 변경될 때마다 zustand store의 videoId를 업데이트
  useEffect(() => {
    if (searchedVideoId) {
      setVideoId('2', searchedVideoId); // YouTube store의 videoId를 업데이트
    }
  }, [searchedVideoId]);

  // setTimeout을 사용해 렌더링이 완료된 후 측정하여 정확하게 측정
  useEffect(() => {
    if (titleRef.current && containerRef.current) {
      setTimeout(() => {
        if (!titleRef.current || !containerRef.current) return; // null 체크
        const titleWidth = titleRef.current.scrollWidth; // 컨텐츠 전체 길이
        const containerWidth = containerRef.current.clientWidth; // 실제 표시되는 영역

        setMoveDistance(titleWidth > containerWidth ? titleWidth - containerWidth : 0);
      }, 50); // 약간의 지연을 줘서 렌더링 이후 측정
    }
  }, [musicInfo]);

  useEffect(() => {
    return () => {
      setIsPlaying('2', false);
      setVideoId('2', null);
    };
  }, []);

  // 유튜브 비디오 로딩 중 처리
  if (isLoading)
    return (
      <div className="px-2 py-1 flex justify-between card-shadow rounded-lg mx-[46px] bg-white/90 backdrop-blur-[2px]">
        <div className="flex w-[calc(100%-28px)]">
          <img src={defaultImage} alt="album" className="w-[48px] h-[48px]" />
          <div className="mx-2 flex-grow overflow-hidden relative">
            <div ref={containerRef} className="w-full">
              <p className="inline-block whitespace-nowrap body-m text-gray-80">로딩 중...</p>
            </div>
          </div>
        </div>
        <button className="cursor-pointer">
          <img src={play} className="w-[28px]" alt="play" />
        </button>
      </div>
    );
  if (isError)
    return (
      <div className="px-2 py-1 flex justify-between card-shadow rounded-lg mx-[46px] bg-white/90 backdrop-blur-[2px]">
        <div className="flex w-[calc(100%-28px)]">
          <img src={defaultImage} alt="album" className="w-[48px] h-[48px]" />
          <div className="mx-2 flex-grow overflow-hidden relative">
            <div ref={containerRef} className="w-full">
              <p className="inline-block whitespace-nowrap body-m text-gray-80">
                노래를 불러오는데 실패했습니다.
              </p>
            </div>
          </div>
        </div>
        <button className="cursor-pointer">
          <img src={play} className="w-[28px]" alt="play" />
        </button>
      </div>
    );

  return (
    <div className="px-2 py-1 flex justify-between card-shadow rounded-lg mx-[46px] bg-white/90 backdrop-blur-[2px]">
      <div className="flex w-[calc(100%-28px)]">
        <img
          src={musicInfo.album_image}
          alt="album"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // 무한 루프 방지
            target.src = defaultImage; // 기본 이미지로 변경
          }}
          className="w-[48px] h-[48px] object-cover"
        />
        <div className="relative flex-grow mx-2 overflow-hidden">
          <div ref={containerRef} className="w-full">
            <p
              ref={titleRef}
              className="inline-block whitespace-nowrap body-m text-gray-80"
              style={
                {
                  animation:
                    moveDistance > 0
                      ? `marquee ${Math.max(4, Number((moveDistance / 20).toFixed(2)))}s linear infinite`
                      : 'none',
                  '--move-distance': `${moveDistance}px`,
                } as React.CSSProperties
              }
            >
              {musicInfo.title}
            </p>
          </div>
          <p className="inline-block whitespace-nowrap caption-r text-gray-60">
            {musicInfo.artist}
          </p>
        </div>
      </div>
      <button onClick={handlePlayButton}>
        <img src={isPlaying ? pause : play} className="w-[28px]" alt="play" />
      </button>
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import defaultImage from '@assets/images/default.png';
import play from '@assets/icons/play/play.svg';
import pause from '@assets/icons/pause.svg';
import { useYouTubeStore } from '@/store/youtubeStore';
import { useSheetStore } from '@/store/sheetStore';
import { useQuery } from '@tanstack/react-query';
import { getEmotionRecordById, getSpotifyVideoId } from '@/apis/emotionRecord';

export default function ChatMusicPlayer() {
  const [moveDistance, setMoveDistance] = useState(0);
  const titleRef = useRef<HTMLParagraphElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  //임시
  const { currentRecord } = useSheetStore();
  const { data } = useQuery({
    queryKey: ['emotionRecord', currentRecord?.recordId],
    queryFn: () => getEmotionRecordById(currentRecord?.recordId!),
  });

  const { setVideoId, players, setIsPlaying } = useYouTubeStore();
  const isPlaying = players['2']?.isPlaying || false;

  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getVideoId = async () => {
      if (!data?.data?.spotifyMusic) return;

      try {
        setIsLoading(true);
        const currentMusicId = data.data.spotifyMusic.spotifyId;
        const res = await getSpotifyVideoId(currentMusicId);
        const savedVideoId = res.data.videoId;
        setCurrentVideoId(savedVideoId);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getVideoId();
  }, []);

  const handlePlayButton = () => {
    setIsPlaying('2', (prev) => !prev);
  };

  // videoId가 변경될 때마다 zustand store의 videoId를 업데이트
  useEffect(() => {
    if (currentVideoId) {
      setVideoId('2', currentVideoId); // YouTube store의 videoId를 업데이트
    }
  }, [currentVideoId]);

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
  }, [data]);

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
          src={data?.data?.spotifyMusic.albumImage}
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
              {data?.data?.spotifyMusic.title}
            </p>
          </div>
          <p className="inline-block whitespace-nowrap caption-r text-gray-60">
            {data?.data?.spotifyMusic.artist}
          </p>
        </div>
      </div>
      <button onClick={handlePlayButton}>
        <img src={isPlaying ? pause : play} className="w-[28px]" alt="play" />
      </button>
    </div>
  );
}

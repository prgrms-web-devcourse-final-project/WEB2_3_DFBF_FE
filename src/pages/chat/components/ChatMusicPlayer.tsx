import React, { useEffect, useRef, useState } from 'react';
import play from '@/assets/icons/play.svg';
import pause from '@/assets/icons/pause.svg';

type ChatMusicPlayerProps = {};

export default function ChatMusicPlayer({}: ChatMusicPlayerProps) {
  const [moveDistance, setMoveDistance] = useState(0);
  const titleRef = useRef<HTMLParagraphElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const title = '봄여름가을겨울봄여름가을겨울봄여름가을겨울';
  // '사랑하긴 했었나요 스쳐가는 인연이었나요 짧지않은 우리 함께했던 시간들이 자꾸 내 마음을 가둬두네';

  // 재생 / 일시정지 토글
  const togglePlay = () => {
    // if (!playerRef.current) return;

    // if (isPlaying) {
    //   playerRef.current.pauseVideo();
    // } else {
    //   playerRef.current.playVideo();
    // }
    // setIsPlaying(!isPlaying);
    setIsPlaying(!isPlaying);
  };

  //setTimeout을 사용해 렌더링이 완료된 후 측정하여 정확하게 측정
  useEffect(() => {
    if (titleRef.current && containerRef.current) {
      setTimeout(() => {
        if (!titleRef.current || !containerRef.current) return; // null 체크
        const titleWidth = titleRef.current.scrollWidth; // 컨텐츠 전체 길이
        const containerWidth = containerRef.current.clientWidth; // 실제 표시되는 영역

        setMoveDistance(titleWidth > containerWidth ? titleWidth - containerWidth : 0);
      }, 50); // 약간의 지연을 줘서 렌더링 이후 측정
    }
  }, [title]);

  return (
    <div className="px-2 py-1 flex justify-between card-shadow rounded-lg mx-[46px] bg-white/90 backdrop-blur-[2px]">
      <div className="flex w-[calc(100%-28px)]">
        <img
          src="https://i.namu.wiki/i/w05YtvYIjsU8_F_BzLip37dZ8lmXl9clwVbjgfwraiybgU554d_ev9pSYYUgXBIJLpJtchguQ9L09xz2f_5iFWZe0mV2uCHI3XPSMo7OWnMin4tn5qEI4wsy1_j-cU8b2zNAZMX-tpfk5p6hQA2nzw.webp"
          alt="album"
          className="w-[43px] h-[43px]"
        />
        <div className="mx-2 flex-grow overflow-hidden relative">
          <div ref={containerRef} className="w-full">
            <p
              ref={titleRef}
              className="inline-block whitespace-nowrap"
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
              {title}
            </p>
          </div>
          <p>BIGBANG</p>
        </div>
      </div>
      <button onClick={togglePlay}>
        <img src={isPlaying ? pause : play} className="w-[28px]" alt="play" />
      </button>
    </div>
  );
}

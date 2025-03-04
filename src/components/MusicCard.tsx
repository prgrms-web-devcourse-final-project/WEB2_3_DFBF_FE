import Button from '@/components/Button';
import defaultImage from '@assets/images/default.png';
import play from '@assets/icons/play/play-circle.svg';
import pause from '@assets/icons/pause-circle.svg';
import { useEffect } from 'react';
import { useSearchYoutubeVideo } from '@/apis/youtube';
import { useSheetStore } from '@/store/sheetStore';
import MusicSearchSheet from './modalSheet/MusicSearchSheet';
import { useYouTubeStore } from '@/store/youtubeStore';
import { useLocation, useParams } from 'react-router';
import { twMerge } from 'tailwind-merge';

interface MusicCardProps {
  image?: string | null; // 음악 이미지
  title?: string; // 음악 제목
  artist?: string; // 음악 설명
  buttonContent?: string; // 버튼 텍스트
  isMusicSelect?: boolean; // 음악 선택 상태
  buttonType?: 'primary' | 'secondary'; // 버튼 타입
  rightElement?: 'none' | 'play' | 'button'; // 오른쪽 요소 타입
}

export default function MusicCard({
  image,
  title,
  artist,
  isMusicSelect = false,
  buttonContent = '등록',
  buttonType = 'primary',
  rightElement = 'button',
}: MusicCardProps) {
  const location = useLocation();
  const { postId } = useParams();
  const isUserPage = location.pathname.includes('/mypage') || location.pathname.includes('/user');
  const isPostPage = location.pathname === '/post' || Boolean(postId);
  //edit 페이지 이면 유튜브 로드 X
  const isUserEditPage = location.pathname === '/mypage/edit';
  // 음악 선택 여부에 따른 텍스트 스타일
  const artistTextStyle = isMusicSelect ? 'caption-r' : 'font-saeeum text-[14px] leading-[18px]';

  const { isMusicSheetOpen, openSheet } = useSheetStore();

  //query
  const query = title && !isUserEditPage ? `${artist} - ${title} lyrics` : null;
  const { data: searchedVideoId, isLoading, isError } = useSearchYoutubeVideo(query);

  const { setVideoId, players, setIsPlaying } = useYouTubeStore();

  const isPlaying = players['1']?.isPlaying || false;

  const handlePlayButton = () => {
    setIsPlaying('1', (prev) => !prev);
  };
  // 유튜브 API는 `rightElement === 'play'`일 때만 호출
  const shouldFetchYouTube = rightElement === 'play';

  // videoId가 변경될 때마다 zustand store의 videoId를 업데이트
  useEffect(() => {
    if (shouldFetchYouTube && searchedVideoId && isUserPage) {
      setVideoId('1', searchedVideoId); // YouTube store의 videoId를 업데이트
    }
  }, [searchedVideoId]);

  useEffect(() => {
    return () => {
      setIsPlaying('1', false);
      setVideoId('1', null);
    };
  }, []);

  return (
    <>
      <div className="flex gap-2 p-[10px] w-[296px] rounded-lg bg-white/80 card-shadow">
        <div className="w-[58px] h-[58px] rounded-lg overflow-hidden flex-shrink-0">
          <img
            className="object-cover w-full h-full"
            src={image ?? defaultImage}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // 무한 루프 방지
              target.src = defaultImage; // 기본 이미지로 변경
            }}
            alt={`${title || '음악'} 앨범 커버`}
          />
        </div>
        <div className="flex flex-1 items-center justify-between min-w-0 gap-0.5">
          <div className="flex flex-col flex-1 min-w-0">
            <div className="overflow-hidden body-large-m whitespace-nowrap text-ellipsis">
              {title ?? (isPostPage ? '음악을 등록해 주세요' : '테마곡이 비어있어요')}
            </div>
            <div
              className={twMerge(
                ' whitespace-nowrap text-ellipsis overflow-hidden text-gray-60',
                artistTextStyle,
              )}
            >
              {artist ??
                (isPostPage ? '지금 생각나는 음악이 있나요?' : '음악으로 나를 소개해 보세요!')}
            </div>
          </div>
          {rightElement === 'button' && (
            <Button
              onClick={() => openSheet('isMusicSheetOpen')}
              variant={buttonType}
              className="w-[51px] h-[32px] flex-shrink-0"
            >
              {buttonContent}
            </Button>
          )}
          {title && isUserPage && rightElement === 'play' && (
            <button onClick={handlePlayButton} className="transition hover:brightness-120">
              <img src={isPlaying ? pause : play} alt={`playIcon`} />
            </button>
          )}
        </div>
      </div>
      {isMusicSheetOpen && <MusicSearchSheet />}
    </>
  );
}

// 사용예시
//1.
// <MusicCard
//   title="Playlist"
//   artist="Add your favorite music!"
//   buttonType="secondary"
//   buttonContent="삭제"
//   rightElement="button"
// />

//2.
// <MusicCard
//   title="Playlist"
//   artist="Add your favorite music!"
//   rightElement="play"
//   isPlaying={false}
// />

//3.
// <MusicCard rightElement="none" />

import Button from '@/components/Button';
import { useMusicCardStore } from '@/store/MusicCardStore';
import { useLocation } from 'react-router';

interface MusicSearchListProps {
  spotifyId: string; // 스포티파이 ID
  songTitle: string; // 노래 제목
  artistName: string; // 가수
  albumImage: string; // 앨범이미지
}

function MusicSearchList({ spotifyId, songTitle, artistName, albumImage }: MusicSearchListProps) {
  const { selectPostMusic, selectProfileMusic } = useMusicCardStore();
  const location = useLocation(); // 현재 URL 가져오기

  // URL에 따라 selectPostMusic 또는 selectProfileMusic을 호출
  const handleSelectMusic = () => {
    if (location.pathname.includes('/edit')) {
      // URL에 "/profile"이 포함되면 selectProfileMusic 호출
      selectProfileMusic({ spotifyId, title: songTitle, artist: artistName, album: albumImage });
    } else {
      // 기본적으로 selectPostMusic 호출
      selectPostMusic({ spotifyId, songTitle, artistName, albumImage });
    }
  };

  return (
    <div className="px-3 py-2 flex items-center justify-between bg-white cursor-pointer hover:bg-gray-5">
      <div className="flex gap-2 items-center">
        <img src={albumImage} alt="앨범 이미지" className="w-10 h-10 rounded-lg" />
        <div className="flex flex-col">
          <span className="body-m line-clamp-1">{songTitle}</span>
          <span className="caption-r text-gray-60 line-clamp-1">{artistName}</span>
        </div>
      </div>
      <Button onClick={handleSelectMusic} className="w-[51px] h-[32px] flex-shrink-0">
        선택
      </Button>
    </div>
  );
}

export default MusicSearchList;

// 사용예시

{
  /* <MusicSearchList
  albumImage="https://pbs.twimg.com/media/E68WkI4VIAIW8eT.jpg"
  songTitle="Hype Boy"
  artistName="NewJeans"
/>; */
}

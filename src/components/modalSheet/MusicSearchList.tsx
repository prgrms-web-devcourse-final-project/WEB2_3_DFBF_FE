import Button from '@/components/Button';
import { useContext } from 'react';
import { PostMusicContext } from '@/pages/post/context/PostMusicContext';

interface MusicSearchListProps {
  spotifyId: string; // 스포티파이 ID
  songTitle: string; // 노래 제목
  artistName: string; // 가수
  albumImage: string; // 앨범이미지
}

function MusicSearchList({ spotifyId, songTitle, artistName, albumImage }: MusicSearchListProps) {
  const { selectPostMusic } = useContext(PostMusicContext)!;

  return (
    <div className="px-3 py-2 flex items-center justify-between bg-white cursor-pointer hover:bg-gray-5">
      <div className="flex gap-2 items-center">
        <img src={albumImage} alt="앨범 이미지" className="w-10 h-10 rounded-lg" />
        <div className="flex flex-col">
          <span className="body-m">{songTitle}</span>
          <span className="caption-r text-gray-60">{artistName}</span>
        </div>
      </div>
      <Button
        onClick={() => selectPostMusic({ spotifyId, songTitle, artistName, albumImage })}
        className="w-[51px] h-[32px]"
      >
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

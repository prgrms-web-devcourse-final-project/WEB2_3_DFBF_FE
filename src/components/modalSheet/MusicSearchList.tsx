import Button from '@/components/Button';

interface MusicSearchListProps {
  albumImage: string; // 앨범이미지
  songTitle: string; // 노래 제목
  artistName: string; // 가수
}

function MusicSearchList({ albumImage, songTitle, artistName }: MusicSearchListProps) {
  return (
    <div className="px-3 py-2 flex items-center justify-between bg-white cursor-pointer hover:bg-gray-5">
      <div className="flex gap-2 items-center">
        <img src={albumImage} alt="앨범 이미지" className="w-10 h-10 rounded-lg" />
        <div className="flex flex-col">
          <span className="body-m">{songTitle}</span>
          <span className="caption-r text-gray-60">{artistName}</span>
        </div>
      </div>
      <Button className="w-[51px] h-[32px]">선택</Button>
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

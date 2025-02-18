import EmotionBadge from '@/components/EmotionBadge';

interface EmotionRecordCardProps {
  emotion: string; // 감정
  albumImage: string; // 앨범이미지
  songTitle: string; // 노래 제목
  artistName: string; // 가수
  date: string; // 날짜
}

function EmotionRecordCard({
  emotion,
  albumImage,
  songTitle,
  artistName,
  date,
}: EmotionRecordCardProps) {
  return (
    <div className="px-3 py-[10px] w-[140px] h-[213px] flex flex-col justify-between card-shadow rounded-lg">
      <div className="flex flex-col gap-[6px]">
        <EmotionBadge size="small" emotion={emotion} />
        <img
          src={albumImage}
          alt="앨범 이미지"
          className="w-full aspect-square object-cover rounded-lg"
        />
      </div>
      <div className="">
        <span className="body-b">
          {artistName} - {songTitle}
        </span>
        <span className="caption-r">{date}</span>
      </div>
    </div>
  );
}

export default EmotionRecordCard;

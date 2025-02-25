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
    <div className="px-3 py-[10px] w-[140px] h-[213px] flex flex-col justify-between card-shadow rounded-lg cursor-pointer bg-white/80">
      <div className="flex flex-col gap-[6px]">
        <EmotionBadge size="small" emotion={emotion} />
        <img
          src={albumImage}
          alt="앨범 이미지"
          className="object-cover w-full rounded-lg aspect-square"
        />
      </div>
      <div className="">
        <div className="overflow-hidden body-b text-ellipsis whitespace-nowrap">
          {artistName} - {songTitle}
        </div>
        <span className="caption-r">{date}</span>
      </div>
    </div>
  );
}

export default EmotionRecordCard;

// 사용 예시
{
  /* <EmotionRecordCard
  emotion="HAPPY"
  albumImage="https://pbs.twimg.com/media/E68WkI4VIAIW8eT.jpg"
  songTitle="Hype Boy"
  artistName="NewJeans"
  date="2025.02.20"
/> */
}

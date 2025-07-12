import EmotionBadge from '@/components/EmotionBadge';
import { formatDate } from '@/utils/formatDate';
import defaultImage from '@assets/images/default.png';

interface EmotionRecordCardProps {
  record: EmotionRecord;
  onClick?: () => void; // 카드 눌렀을 때 실행될 함수
}

function EmotionRecordCard({ record, onClick }: EmotionRecordCardProps) {
  const {
    emotion,
    spotifyMusic: { albumImage, title: songTitle, artist: artistName },
    createdAt,
  } = record;

  return (
    <div
      className="px-3 py-[10px] w-[140px] h-[213px] flex flex-col justify-between card-shadow rounded-lg cursor-pointer bg-white/80"
      onClick={onClick}
    >
      {/* 감정 뱃지 */}
      <div className="flex flex-col gap-1.5 border border-blue-500">
        <EmotionBadge size="small" emotion={emotion} />
        <img
          src={albumImage}
          alt="앨범 이미지"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // 무한 루프 방지
            target.src = defaultImage; // 기본 이미지로 변경
          }}
          className="object-cover w-full rounded-lg aspect-square"
        />
      </div>
      {/* 가수이름 노래제목 / 날짜 */}
      <div>
        <div className="overflow-hidden body-b text-ellipsis whitespace-nowrap">
          {artistName} - {songTitle}
        </div>
        <div className="caption-r">{formatDate(createdAt)}</div>
      </div>
    </div>
  );
}

export default EmotionRecordCard;

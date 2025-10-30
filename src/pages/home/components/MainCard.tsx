import { ImageKitImg } from '@/components';
import EmotionBadge from '@/components/EmotionBadge';
import { formatDate } from '@/utils/formatDate';
import { Link } from 'react-router';

interface MainCardProps {
  record: EmotionRecord;
}

export default function MainCard({ record }: MainCardProps) {
  return (
    <Link
      to={`/home/${record.recordId}`}
      state={{ scrollLock: true }}
      className="flex flex-col gap-1 bg-white/80 rounded-lg card-shadow px-3 py-2.5"
    >
      {/* 닉네임 + 상태 */}
      <div className="flex items-center gap-1">
        <span className="caption-m text-gray-70">{record.nickName}</span>
        <span className="caption-r text-gray-60">님은 지금</span>
        <EmotionBadge size="small" emotion={record.emotion} />
      </div>

      {/* 노래 + 글 정보 */}
      <div className="flex gap-2">
        {/* 앨범커버 */}
        <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-lg">
          <ImageKitImg
            src={record.spotifyMusic.albumImage}
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>
        {/* 정보 */}
        <div className="flex flex-col gap-1">
          <p className="break-all body-b text-gray-80 line-clamp-1">
            {record.spotifyMusic.title} - {record.spotifyMusic.artist}
          </p>
          <p className="break-all caption-r text-gray-60 line-clamp-1">{record.comment}</p>
          <span className="text-[9px] text-gray-60 font-light">{formatDate(record.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
}

import EmotionBadge from '@/components/EmotionBadge';
import defaultImage from '@assets/images/default.png';

interface MainCardProps {
  albumImage: string; // 앨범 이미지
  nickname: string; // 닉네임
  emotion: string; // 감정
  title: string; // 노래 제목
  artist: string; // 가수
  comment: string; // 글 내용
  createdAt: string; // 날짜
}

export default function MainCard({
  albumImage,
  nickname,
  emotion,
  title,
  artist,
  comment,
  createdAt,
}: MainCardProps) {
  return (
    <div className="flex-none w-full cursor-pointer">
      <div className="flex flex-col gap-1 bg-white/80 rounded-lg card-shadow px-3 py-2.5 hover:bg-white transition ">
        {/* 닉네임 + 상태 */}
        <div className="flex items-center gap-1">
          <span className="caption-m text-gray-70">{nickname}</span>
          <span className="caption-r text-gray-60">님은 지금</span>
          <EmotionBadge size="small" emotion={emotion} />
        </div>

        {/* 노래 + 글 정보 */}
        <div className="flex gap-2">
          {/* 앨범커버 */}
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <img
              className="w-full h-full object-cover"
              src={albumImage || defaultImage}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; // 무한 루프 방지
                target.src = defaultImage; // 기본 이미지로 변경
              }}
              alt="앨범이미지"
            />
          </div>
          {/* 정보 */}
          <div className="flex flex-col gap-1">
            <p className="body-b text-gray-80 line-clamp-1 break-all">
              {title} - {artist}
            </p>
            <p className="caption-r text-gray-60 line-clamp-1 break-all">{comment}</p>
            <span className="text-[9px] text-gray-60 font-light">{createdAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

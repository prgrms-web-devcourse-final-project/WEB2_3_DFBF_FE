import Button from '@/components/Button';
import defaultImage from '@assets/images/default.png';
import play from '@assets/icons/play-circle.svg';
import pause from '@assets/icons/pause-circle.svg';

interface MusicCardProps {
  image?: string; // 음악 이미지
  title?: string; // 음악 제목
  description?: string; // 음악 설명
  buttonContent?: string; // 버튼 텍스트
  buttonType?: 'primary' | 'secondary'; // 버튼 타입
  rightElement?: 'none' | 'play' | 'button'; // 오른쪽 요소 타입
  isPlaying?: boolean; // 음악 재생 여부
}

export default function MusicCard({
  image = defaultImage,
  title = '음악을 등록해 주세ssssssssssssssss요',
  description = ' 지금 생각나는 음악이 있나요?sssssssssss',
  buttonContent = '등록',
  buttonType = 'primary',
  rightElement = 'button',
  isPlaying = true,
}: MusicCardProps) {
  const playIcon = isPlaying ? pause : play; // 재생 중이면 일시정지 아이콘, 일시정지 중이면 재생 아이콘

  return (
    <div className="flex gap-2 p-[10px] w-[296px] rounded-lg bg-white/80 card-shadow">
      <div className="w-[58px] h-[58px] rounded-lg overflow-hidden flex-shrink-0">
        <img
          className="w-full h-full object-cover"
          src={image}
          alt={`${title || '음악'} 앨범 커버`}
        />
      </div>
      <div className="flex flex-1 items-center justify-between min-w-0 gap-0.5">
        <div className="flex flex-1 flex-col  min-w-0">
          <div className=" body-large-m whitespace-nowrap text-ellipsis overflow-hidden">
            {title}
          </div>
          <div className="font-saeeum text-[14px] leading-[18px] whitespace-nowrap text-ellipsis overflow-hidden">
            {description}
          </div>
        </div>
        {rightElement === 'button' && (
          <Button type={buttonType} className="w-[51px] h-[32px] flex-shrink-0">
            {buttonContent}
          </Button>
        )}
        {rightElement === 'play' && (
          <button className="hover:brightness-120 transition">
            <img src={playIcon} alt={`playIcon`} />
          </button>
        )}
      </div>
    </div>
  );
}

// 사용예시
//1.
// <MusicCard
//   title="Playlist"
//   description="Add your favorite music!"
//   buttonType="secondary"
//   buttonContent="삭제"
//   rightElement="button"
// />

//2.
// <MusicCard
//   title="Playlist"
//   description="Add your favorite music!"
//   rightElement="play"
//   isPlaying={false}
// />

//3.
// <MusicCard rightElement="none" />

import EmotionBadge from '@/components/EmotionBadge';
import headset from '@assets/icons/headset-icon.svg';
import defaultImage from '@assets/images/default.png';

interface MainCardProps {
  nickname: string; // 닉네임
  emotion: string; // 감정
  title: string; // 노래 제목
  artist: string; // 가수
  content: string; // 글 내용
  date: string; // 날짜
  isChatting: boolean; // 현재 채팅중인지
}

// 더미데이터
const dummyData: MainCardProps = {
  nickname: '하입뽀이일곱자',
  emotion: 'EXCITED',
  title: 'Hype Boy',
  artist: 'NewJeans',
  content: '오늘은 날씨가 정말 좋다...',
  date: '2025.02.15',
  isChatting: true,
};

export default function MainCard() {
  return (
    <div className="flex-none w-full">
      <div className="flex flex-col gap-1 bg-white/80 rounded-lg card-shadow px-3 py-2.5 ">
        {/* 닉네임 + 상태 */}
        <div className="flex items-center gap-1">
          <span className="caption-m text-gray-70">{dummyData.nickname}</span>
          {dummyData.isChatting && (
            <span>
              <img src={headset} alt="헤드셋 아이콘" />
            </span>
          )}
          <span className="caption-r text-gray-60">님은 지금</span>
          <EmotionBadge size="small" emotion={dummyData.emotion} />
        </div>

        {/* 노래 + 글 정보 */}
        <div className="flex gap-2">
          {/* 앨범커버 */}
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <img className="w-full h-full object-cover" src={defaultImage} alt="기본값" />
          </div>
          {/* 정보 */}
          <div className="flex flex-col gap-1">
            <p className="body-b text-gray-80 line-clamp-1 break-all">
              {dummyData.title} - {dummyData.artist}
            </p>
            <p className="caption-r text-gray-60 line-clamp-1 break-all">{dummyData.content}</p>
            <span className="text-[9px] text-gray-60 font-light">{dummyData.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

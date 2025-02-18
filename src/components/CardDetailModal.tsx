import EmotionBadge from '@/components/EmotionBadge';
import headsetIcon from '@/assets/icons/headset-icon.svg';
import ChatActionButtons from '@/components/ChatActionButtons';
import Overlay from '@/components/Overlay';

interface CardDetailModalProps {
  emotion: string; // 감정
  albumImage: string; // 앨범이미지
  songTitle: string; // 노래 제목
  artistName: string; // 가수
  date: string; // 날짜
  authorName: string; // 글작성자
  isChatting: boolean; // 현재 채팅중인지 (임시)
  isOwnPost: boolean; // 본인 글 여부(임시)
}

function CardDetailModal({
  emotion,
  albumImage,
  songTitle,
  artistName,
  date,
  authorName,
  isChatting,
  isOwnPost,
}: CardDetailModalProps) {
  return (
    <Overlay>
      {/* 모달 */}
      <div className="bg-white p-4 rounded-lg min-w-[280px] w-[80%] flex flex-col gap-3 h-[50vh] min-h-[300px]">
        <div className=" flex flex-col gap-3">
          {/* 상세정보 */}
          <div className=" flex gap-2 items-center ">
            <img src={albumImage} alt="앨범 이미지" className="w-16 h-16 rounded-[8px]" />
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <EmotionBadge size="small" emotion={emotion} />
                <span className=" font-light text-gray-60 text-[10px]">{date}</span>
              </div>
              <div className="body-b overflow-hidden text-ellipsis whitespace-nowrap">
                {songTitle} - {artistName}
              </div>
              <div className="caption-r text-gray-60 flex gap-1 items-center">
                <span>{authorName}</span>
                {isChatting && <img src={headsetIcon} alt="헤드셋 아이콘" />}
              </div>
            </div>
          </div>
          {/* 버튼 */}
          <div className="flex gap-[6px]">
            {!isOwnPost && <ChatActionButtons isChatting={isChatting} />}
          </div>
        </div>
        {/* 내용 */}
        <div className="body-r h-full">오늘은 날씨가 정말 좋다...</div>
      </div>
    </Overlay>
  );
}

export default CardDetailModal;

// 사용예시

//  <CardDetailModal
//    emotion="HAPPY"
//    albumImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDr6SB_fokX3TJBAFcrIisQ_YGwVVO0F8PCw&s"
//    songTitle="hypeboy"
//    artistName="뉴진스"
//    date="2025.02.15"
//    authorName="하입보이"
//    isChatting={false}
//    isOwnPost={true}
//  />;

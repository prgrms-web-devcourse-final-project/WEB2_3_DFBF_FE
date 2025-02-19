import Button from './Button';
import MoreOptionsSelect from './MoreOptionsSelect';
import defaultImage from '@assets/images/default.png';

interface ChatHistoryCardProps {
  item: ChatHistory;
}

export default function ChatHistoryCard({ item }: ChatHistoryCardProps) {
  const getTimeAgo = () => {
    const createdAt = new Date(item.created_at).getTime();
    const today = new Date().getTime();
    const diffTime = today - createdAt;
    //1분 60*1000 1시간 60*60*1000  1일 60*60*24*1000 1주 60*60*24*7*1000  1달 60*60*24*7*30*1000
    //~분 전 ~시간 전 ~일 전 ~달 전
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 12 * month;
    if (diffTime < minute) return '방금 전';
    else if (diffTime < hour) return `${Math.floor(diffTime / minute)}분 전`;
    else if (diffTime < day) return `${Math.floor(diffTime / hour)}시간 전`;
    else if (diffTime < month) return `${Math.floor(diffTime / day)}일 전`;
    else if (diffTime < year) return `${Math.floor(diffTime / month)}달 전`;
    else return `${Math.floor(diffTime / year)}년 전`;
  };
  const handleDeleteChat = () => {
    console.log('삭제');
  };

  return (
    <div className="w-full p-3 card-shadow bg-white/80 rounded-lg">
      <div className="flex justify-between">
        <div className="flex caption-m text-gray-60">
          <p className="mr-2">{item.nickname}</p>
          <p>{getTimeAgo()} 생성</p>
        </div>
        <MoreOptionsSelect
          items={[{ label: '삭제하기', onClick: handleDeleteChat }]}
        ></MoreOptionsSelect>
      </div>
      <div className="flex mt-1 mb-3">
        <img
          className="w-[40px] h-[40px] mr-2"
          src={item.album_image ?? defaultImage}
          alt="앨범이미지"
        />
        <div>
          <p className="body-b text-gray-80 line-clamp-1">
            {item.title} - {item.artist}
          </p>
          <p className="caption-r text-gray-60 line-clamp-1">여기에 뭘 넣어야할까</p>
        </div>
      </div>
      <Button type="primary" className="body-m">
        다시 대화 요청하기
      </Button>
    </div>
  );
}
import Button from './Button';
import MoreOptionsSelect from './MoreOptionsSelect';

interface ChatRecordCardProps {}

export default function ChatRecordCard({}: ChatRecordCardProps) {
  const handleDeleteChat = () => {
    console.log('삭제');
  };

  return (
    <div className="p-3 mx-3 card-shadow">
      <div className="flex justify-between">
        <div className="flex caption-m text-gray-60">
          <p className="mr-2">하입뽀이</p>
          <p>2일 전</p>
        </div>
        <MoreOptionsSelect
          items={[{ label: '삭제하기', onClick: handleDeleteChat }]}
        ></MoreOptionsSelect>
      </div>
      <div className="flex mt-1 mb-3">
        <img
          className="w-[40px] h-[40px] mr-2"
          src="https://i.namu.wiki/i/vAf8O9ZM6pImCZP-GhmSu4XgE5WOmkGxsQaZbcxWCIYKjH_jk-aMZYG3wvWyvoKfqsSeZm9c4EyjM0mnUre8an1D3S6pl3pZtFsC2wspg5qO7g7fA-damUXg_T-Rvb8u0lsHUhh43_kZ7YPjneaJ2Q.webp"
          alt="앨범이미지"
        />
        <div>
          <p className="body-b text-gray-80 line-clamp-1">High High - GD&TOP</p>
          <p className="caption-r text-gray-60 line-clamp-1">씐난다</p>
        </div>
      </div>
      <Button type="primary" className="body-m">
        다시 대화 요청하기
      </Button>
    </div>
  );
}

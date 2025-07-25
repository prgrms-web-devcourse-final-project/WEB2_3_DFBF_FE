import { InfoMessage } from '@/components';
import MainCard from '@/pages/home/components/MainCard';

interface MainCardListProps {
  records: EmotionRecord[];
}

export default function MainCardList({ records }: MainCardListProps) {
  if (records.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <InfoMessage text="아직 작성된 글이 없어요" />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2.5">
      {records.map((record) => (
        <MainCard key={record.recordId} record={record} />
      ))}
    </div>
  );
}

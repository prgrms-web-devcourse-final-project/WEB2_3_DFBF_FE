import { InfoMessage, EmotionRecordCard } from '@/components';
import { useNavigate } from 'react-router';
interface EmotionRecordCardListProps {
  records: EmotionRecord[];
  basePath: string;
}

function EmotionRecordCardList({ records, basePath }: EmotionRecordCardListProps) {
  const navigate = useNavigate();
  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <InfoMessage text="포스트가 비어있어요" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 min-[500px]:grid-cols-3 gap-x-3 gap-y-6">
      {records.map((record) => (
        <EmotionRecordCard
          key={record.recordId}
          record={record}
          onClick={() => navigate(`${basePath}/${record.recordId}`)}
        />
      ))}
    </div>
  );
}

export default EmotionRecordCardList;

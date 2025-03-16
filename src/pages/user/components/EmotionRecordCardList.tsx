import EmotionRecordCard from '@/components/EmotionRecordCard';
import InfoMessage from '@/components/InfoMessage';
import { formatDate } from '@/utils/formatDate';

interface EmotionRecordCardListProps {
  emotionRecords: EmotionRecordPages[];
  handleOpenSheet: (recordId: number) => void;
}

function EmotionRecordCardList({ emotionRecords, handleOpenSheet }: EmotionRecordCardListProps) {
  // emotionRecords가 undefined일 경우 아무것도 렌더링하지 않음
  if (!emotionRecords) return null;

  if (!emotionRecords?.[0]?.data?.records?.length) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <InfoMessage text="포스트가 비어있어요" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 min-[500px]:grid-cols-3 gap-x-3 gap-y-6">
      {emotionRecords.map((page) =>
        page.data.records.map((record: EmotionRecord) => (
          <EmotionRecordCard
            key={record.recordId}
            emotion={record.emotion}
            albumImage={record.spotifyMusic.albumImage}
            songTitle={record.spotifyMusic.title}
            artistName={record.spotifyMusic.artist}
            date={formatDate(record.createdAt)}
            onClick={() => handleOpenSheet(record.recordId)}
          />
        )),
      )}
    </div>
  );
}

export default EmotionRecordCardList;

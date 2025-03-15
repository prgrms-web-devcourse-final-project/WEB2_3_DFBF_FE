import EmotionRecordCard from '@/components/EmotionRecordCard';
import InfoMessage from '@/components/InfoMessage';
import LoadingMini from '@/components/loading/LoadingMini';
import { formatDate } from '@/utils/formatDate';

interface EmotionRecordCardListProps {
  emotionRecords: EmotionRecordPages[]; // 정확한 타입을 지정하면 더 좋음
  handleOpenSheet: (recordId: number) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  refProp: (node?: Element | null) => void;
}

function EmotionRecordCardList({
  emotionRecords,
  handleOpenSheet,
  hasNextPage,
  isFetchingNextPage,
  refProp,
}: EmotionRecordCardListProps) {
  if (!emotionRecords?.[0]?.data?.records?.length) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <InfoMessage text="포스트가 비어있어요" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 min-[500px]:grid-cols-3 gap-x-3 gap-y-6 pb-4">
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
      {hasNextPage && !isFetchingNextPage && (
        <div className="border border-blue-500" ref={refProp}>
          <LoadingMini />
        </div>
      )}
    </div>
  );
}

export default EmotionRecordCardList;

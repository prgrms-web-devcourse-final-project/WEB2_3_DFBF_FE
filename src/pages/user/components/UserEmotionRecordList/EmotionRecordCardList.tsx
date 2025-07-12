import EmotionRecordCard from '@/pages/user/components/UserEmotionRecordList/EmotionRecordCard';
import InfoMessage from '@/components/InfoMessage';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import LoadingMini from '@/components/loading/LoadingMini';

interface EmotionRecordCardListProps {
  emotionRecords: EmotionRecordPages[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  handleOpenSheet: (recordId: number) => void;
}

function EmotionRecordCardList({
  emotionRecords,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  handleOpenSheet,
}: EmotionRecordCardListProps) {
  const { ref, inView } = useInView({
    rootMargin: `0px 0px -62px 0px`,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

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
    <>
      <div className="grid grid-cols-2 min-[500px]:grid-cols-3 gap-x-3 gap-y-6 ">
        {emotionRecords.map((page) =>
          page.data.records.map((record: EmotionRecord) => (
            <EmotionRecordCard
              key={record.recordId}
              record={record}
              onClick={() => handleOpenSheet(record.recordId)}
            />
          )),
        )}
      </div>
      {hasNextPage && !isFetchingNextPage && (
        <div ref={ref}>
          <LoadingMini />
        </div>
      )}
    </>
  );
}

export default EmotionRecordCardList;

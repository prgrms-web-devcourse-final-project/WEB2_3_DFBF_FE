import { LoadingMini } from '@/components/loading';
import { EmotionRecordCardList } from '@/components';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface EmotionRecordSectionProps {
  records: EmotionRecord[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const EmotionRecordSection = ({
  records,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: EmotionRecordSectionProps) => {
  const { ref, inView } = useInView({
    rootMargin: `0px 0px -69px 0px`,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col items-center">
      <EmotionRecordCardList records={records} />
      {hasNextPage && !isFetchingNextPage && (
        <div ref={ref}>
          <LoadingMini />
        </div>
      )}
    </div>
  );
};

export default EmotionRecordSection;

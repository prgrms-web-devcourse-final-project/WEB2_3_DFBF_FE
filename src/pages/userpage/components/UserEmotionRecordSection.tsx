import { EmotionRecordSection } from '@/components';
import { useInfiniteUserEmotionRecords } from '@/pages/userpage/hooks';

interface UserEmotionRecordSectionProps {
  userId: string;
}

const UserEmotionRecordSection = ({ userId }: UserEmotionRecordSectionProps) => {
  const {
    data, // 불러온 감정 기록 페이지 데이터
    fetchNextPage, // 다음 페이지 데이터를 불러오는 함수
    hasNextPage, // 다음 페이지가 존재하는지 여부 (boolean)
    isFetchingNextPage, // 다음 페이지를 현재 불러오고 있는 중인지 여부 (boolean)
  } = useInfiniteUserEmotionRecords(userId);

  const records = data?.pages.flatMap((page) => page.data.records) ?? [];

  return (
    <EmotionRecordSection
      records={records}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

export default UserEmotionRecordSection;

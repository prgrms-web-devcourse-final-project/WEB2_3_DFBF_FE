import dayjs from 'dayjs';

export const formatDate = (dateString: string) => {
  if (!dateString) return '';
  return dayjs(dateString).format('YYYY.MM.DD');
};

// 사용 예시
// console.log(formatDate('2025-02-26 23:35')); // 2025.02.26

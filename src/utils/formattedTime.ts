import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const formattedTime = (timeLeft: number) => {
  return dayjs.duration(timeLeft, 'seconds').format('mm:ss');
};

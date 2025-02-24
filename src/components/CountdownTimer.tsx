import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(300); // 300초 = 5분

  useEffect(() => {
    if (timeLeft <= 0) return; // 타이머 종료
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

  return (
    <div
      className={twMerge('caption-r', timeLeft === 0 ? 'text-gray-60' : 'text-functional-danger')}
    >
      {formattedTime}
    </div>
  );
}

export default CountdownTimer;

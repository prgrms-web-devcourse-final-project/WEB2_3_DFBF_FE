import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface CountdownTimerProps {
  onTimeout?: () => void; // 시간이 만료되었을 때 핸들링할 함수
}

function CountdownTimer({ onTimeout }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(300); // 300초 = 5분

  useEffect(() => {
    // 타이머 종료
    if (timeLeft <= 0) {
      if (onTimeout) onTimeout();
      return;
    }
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

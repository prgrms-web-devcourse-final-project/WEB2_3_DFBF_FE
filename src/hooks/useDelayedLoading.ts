import { useEffect, useState } from 'react';

interface UseDelayedLoadingProps {
  isPending: boolean;
  delay?: number; // 기본값: 100ms
}

//로딩 상태가 pending일 때 delay 후 로딩 UI를 표시합니다.
const useDelayedLoading = ({ isPending, delay = 100 }: UseDelayedLoadingProps) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    let loadingTimeout: NodeJS.Timeout;
    if (isPending) {
      loadingTimeout = setTimeout(() => setShowLoading(true), delay);
    } else {
      setShowLoading(false);
    }
    return () => clearTimeout(loadingTimeout);
  }, [isPending, delay]);

  return showLoading;
};

export default useDelayedLoading;

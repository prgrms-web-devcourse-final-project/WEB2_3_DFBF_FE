import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

// 무한스크롤용
export default function LoadingMini() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('https://cdn.lottielab.com/l/Dep5onAFaPJbNs.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data));
  }, []);
  return (
    <div className="relative w-[45px] h-[45px] overflow-hidden">
      <Lottie
        animationData={animationData}
        style={{ width: 50, height: 50, position: 'absolute', top: '0px' }}
      />
    </div>
  );
}

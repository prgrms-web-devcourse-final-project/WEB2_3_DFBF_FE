import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function Loading() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('https://cdn.lottielab.com/l/Dep5onAFaPJbNs.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data));
  }, []);
  return (
    <div className="relative w-full h-[45px] overflow-hidden flex justify-center items-center">
      <Lottie
        animationData={animationData}
        style={{ width: 50, height: 50, position: 'absolute', top: '0px' }}
      />
    </div>
  );
}

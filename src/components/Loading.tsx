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
    <div className=" w-full h-[50px] overflow-hidden flex justify-center items-center">
      <Lottie animationData={animationData} style={{ width: 70, height: 70 }} />
    </div>
  );
}

import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';

export default function Loading() {
  const [animationData, setAnimationData] = useState(null);

  const defaultOptions = {
    loop: true,
    autoplay: true, // 자동 재생
    animationData: animationData, // 애니메이션 JSON 데이터
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    fetch('https://cdn.lottielab.com/l/Dep5onAFaPJbNs.json')
      .then((response) => response.json())
      .then((data) => setAnimationData(data));
  }, []);
  return (
    <div className=" w-full h-[50px] overflow-hidden flex justify-center items-center">
      <Lottie options={defaultOptions} height={70} width={70} />
    </div>
  );
}

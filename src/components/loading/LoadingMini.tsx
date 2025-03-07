import Lottie from 'lottie-react';
import animationData from '@/assets/lottie/loading.json';

// 무한스크롤용
export default function LoadingMini() {
  return (
    <div className="relative w-[45px] h-[45px] overflow-hidden">
      <Lottie
        animationData={animationData}
        style={{ width: 50, height: 50, position: 'absolute', top: '0px' }}
      />
    </div>
  );
}

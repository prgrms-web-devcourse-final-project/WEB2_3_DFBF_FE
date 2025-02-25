import Button from '@/components/Button';
import MusicAnimation from '@/components/MusicAnimation';
import { Link } from 'react-router';
function Landing() {
  return (
    <div className="flex flex-col w-full justify-center relative">
      <div className="flex flex-col gap-3 mt-[44px] mb-[180px]">
        <p className="h3-b text-gray-80 text-center">
          음악으로 감정을 기록하고 <br /> 누군가와 이어지는 순간
        </p>
        <p className="caption-r text-gray-60 text-center">
          당신의 감정을 음악으로 표현하고 <br /> 같은 감정을 나누는 이들과 연결되세요
        </p>
        <MusicAnimation />
      </div>
      <Link to="/login">
        <Button variant="primary" className="absolute bottom-10 z-3">
          지금 시작하기
        </Button>
      </Link>
    </div>
  );
}

export default Landing;

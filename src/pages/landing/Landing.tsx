import Button from '@/components/button/Button';
import MusicAnimation from '@/components/MusicAnimation';
import { useNavigate } from 'react-router';
function Landing() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login');
  };
  return (
    <div className="relative flex flex-col justify-center w-full h-full">
      <div className="flex flex-col gap-3 mt-[44px] mb-[180px]">
        <p className="text-center h3-b text-gray-80">
          음악으로 감정을 기록하고 <br /> 누군가와 이어지는 순간
        </p>
        <p className="text-center caption-r text-gray-60">
          당신의 감정을 음악으로 표현하고 <br /> 같은 감정을 나누는 이들과 연결되세요
        </p>
        <MusicAnimation />
      </div>
      <Button variant="primary" className="absolute bottom-10 z-3" onClick={handleStart}>
        지금 시작하기
      </Button>
    </div>
  );
}

export default Landing;

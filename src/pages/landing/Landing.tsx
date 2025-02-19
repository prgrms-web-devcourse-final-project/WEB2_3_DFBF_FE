import PuffLoader from 'react-spinners/PuffLoader';
import musicIcon from '@/assets/icons/music-icon.svg';
import Button from '@/components/Button';
function Landing() {
  return (
    <div className="flex flex-col w-full justify-center relative">
      <div className="flex flex-col gap-3 mb-[140px]">
        <p className="h3-b text-gray-80 text-center">
          음악으로 감정을 기록하고 <br /> 누군가와 이어지는 순간
        </p>
        <p className="caption-r text-gray-60 text-center">
          당신의 감정을 음악으로 표현하고 <br /> 같은 감정을 나누는 이들과 연결되세요
        </p>
        <div className="relative w-full h-full mt-[120px] flex items-center justify-center">
          {/* PuffLoader */}
          <div className="absolute z-0">
            <PuffLoader size={240} color="#EFDAFB" />
          </div>

          {/* 배경2*/}
          <div className="absolute z-1">
            <div className="bg-[#F5E8FD] w-[170px] h-[170px] rounded-full flex items-center justify-center"></div>
          </div>
          {/* 음표 + 배경1*/}
          <div className="absolute z-2">
            <div className="bg-[#efdafb] w-[140px] h-[140px] rounded-full flex items-center justify-center">
              <img src={musicIcon} alt="음표" />
            </div>
          </div>
        </div>
      </div>
      <Button type="primary" className="absolute bottom-10 z-3">
        지금 시작하기
      </Button>
    </div>
  );
}

export default Landing;

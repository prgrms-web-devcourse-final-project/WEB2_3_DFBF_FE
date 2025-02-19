import PuffLoader from 'react-spinners/PuffLoader';
import musicIcon from '@/assets/icons/music-icon.svg';
function Landing() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center gap-3 mt-[30px]">
        <p className="h3-b text-gray-80 text-center">
          음악으로 감정을 기록하고 <br /> 누군가와 이어지는 순간
        </p>
        <p className="caption-r text-gray-60 text-center">
          당신의 감정을 음악으로 표현하고 <br /> 같은 감정을 나누는 이들과 연결되세요
        </p>
        <div className="relative w-full h-full mt-[120px] flex items-center justify-center">
          {/* PuffLoader */}
          <div className="absolute z-0">
            <PuffLoader size={250} color="#F5E8FD" />
          </div>

          {/* 음표 배경*/}
          <div className="absolute z-10">
            <div className="bg-[#efdafb] w-[140px] h-[140px] rounded-full flex items-center justify-center">
              <img src={musicIcon} alt="음표" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;

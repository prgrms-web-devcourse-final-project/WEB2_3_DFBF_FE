import PuffLoader from 'react-spinners/PuffLoader';
import musicIcon from '@/assets/icons/music-icon.svg';

export default function MusicAnimation() {
  return (
    <div className="relative w-full mt-[120px] flex items-center justify-center">
      {/* PuffLoader */}
      <div className="absolute z-0">
        <PuffLoader size={240} color="#dca4f4" />
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
  );
}

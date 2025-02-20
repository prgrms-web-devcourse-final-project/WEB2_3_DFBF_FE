import logoIcon from '@assets/icons/logo-icon.svg';

// 로고 + text
function InfoMessage({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-2">
        <img src={logoIcon} alt="로고" className="w-10 h-10" />
        <span className="text-[14px] font-saeeum">{text}</span>
      </div>
    </div>
  );
}

export default InfoMessage;

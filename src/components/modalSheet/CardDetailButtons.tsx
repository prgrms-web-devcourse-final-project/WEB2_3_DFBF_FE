interface CardDetailButtonsProps {
  icon: string;
  label: string;
  onClick?: () => void;
}

function CardDetailButtons({ icon, label, onClick }: CardDetailButtonsProps) {
  return (
    <button className="flex flex-col items-center gap-1 cursor-pointer" onClick={onClick}>
      <span className="w-[38px] h-[38px] rounded-full bg-gray-5 flex justify-center items-center hover:bg-gray-10">
        <img src={icon} alt="아이콘" />
      </span>
      <span className="text-[9px] text-gray-50 font-normal">{label}</span>
    </button>
  );
}

export default CardDetailButtons;

// 사용 예시
// <CardDetailButtons icon={commentIcon} label="대화하기" />;

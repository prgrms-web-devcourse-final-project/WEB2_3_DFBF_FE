interface CardDetailButtonsProps {
  icon: string;
  label: string;
}

function CardDetailButtons({ icon, label }: CardDetailButtonsProps) {
  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer">
      <div className="w-[38px] h-[38px] rounded-full bg-gray-5 flex justify-center items-center hover:bg-gray-10">
        <img src={icon} alt="아이콘" />
      </div>
      <span className="text-[9px] text-gray-50 font-normal">{label}</span>
    </div>
  );
}

export default CardDetailButtons;

// 사용 예시
// <CardDetailButtons icon={commentIcon} label="대화하기" />;

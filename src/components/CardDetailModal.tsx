import EmotionBadge from '@/components/EmotionBadge';

function CardDetailModal() {
  return (
    //   전체화면
    <div className="fixed inset-0 flex items-center justify-center z-10 ">
      {/* 흑백화면 */}
      <div className="max-w-[600px] w-full bg-black/50 h-screen flex justify-center items-center px-5">
        {/* 모달 */}
        <div className="bg-white p-4 rounded-lg w-full border-2 border-blue-500 flex flex-col gap-3 h-[50vh] min-h-[264px] justify-center">
          {/* 상세정보 */}
          <div className="border border-red-500 flex gap-2 items-center ">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDr6SB_fokX3TJBAFcrIisQ_YGwVVO0F8PCw&s"
              alt="앨범 이미지"
              className="w-16 h-16 rounded-[8px]"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <EmotionBadge size="small" emotion="HAPPY" />
                <span className=" font-light text-gray-60 text-[10px]">2025.02.15</span>
              </div>
              <div className="body-b overflow-hidden text-ellipsis whitespace-nowrap">
                Hype Boy - 뉴진스
              </div>
              <div className="caption-r text-gray-60">하입보이</div>
            </div>
          </div>
          {/* 내용 */}
          <div className="body-r">
            오늘은 날씨가 정말 좋다... 졸리다... 드디어 금요일이다. 내일은 주말이다. 주말엔 알바
            간다. 귀찮다.오늘은 날씨가 정말 좋다... 졸리다ㅏㅏ
          </div>
          {/* 버튼 */}
          <div className="border-2 border-red-500"></div>
        </div>
      </div>
    </div>
  );
}

export default CardDetailModal;

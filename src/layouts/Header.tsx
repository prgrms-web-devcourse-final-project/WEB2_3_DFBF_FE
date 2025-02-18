import logo from "@assets/icons/logo.png";
import notificationIcon from "@assets/icons/notification.svg";
import ellipsisButton from "@/assets/icons/ellipsisButton.svg";
import { Link } from "react-router";
import MoreSelectBox from "@/components/MoreSelectBox";
import { useState } from "react";

interface HeaderProps {
  showNotification?: boolean; // 알림 아이콘을 표시할지 여부
  showMoreOptions?: boolean; // 더보기 메뉴를 표시할지 여부
}

function Header({ showNotification, showMoreOptions }: HeaderProps) {
  console.log(showNotification);
  const [isMoreSelectBoxOpen, setIsMoreSelectBoxOpen] = useState(false);
  return (
    <header className="h-[44px] bg-[#FBF5FF]/90 backdrop-blur-sm px-3 flex items-center justify-between">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>

      {/* 알림 아이콘, 더보기 메뉴 아이콘 표시 */}
      <div className="flex gap-1 relative">
        {/* 알림 */}
        {showNotification && (
          <div className="px-2 py-3 flex justify-center items-center">
            <img src={notificationIcon} alt="알림" />
          </div>
        )}
        {/* 더보기 메뉴 */}
        {showMoreOptions && (
          <div
            className="px-2 py-3 flex justify-center items-center"
            onClick={() => setIsMoreSelectBoxOpen((prev) => !prev)}
          >
            <img src={ellipsisButton} alt="더보기" />
          </div>
        )}
        {isMoreSelectBoxOpen && (
          <MoreSelectBox items={["프로필 수정", "로그아웃"]} />
        )}
      </div>
    </header>
  );
}

export default Header;

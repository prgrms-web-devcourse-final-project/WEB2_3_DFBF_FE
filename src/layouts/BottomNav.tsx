import { NavLink } from 'react-router';
import {
  chatDefault,
  chatActive,
  chatHover,
  homeDefault,
  homeActive,
  homeHover,
  mypageDefault,
  mypageActive,
  mypageHover,
} from '@/assets/icons/nav';

const navItems = [
  { path: '/', label: '홈', icons: { default: homeDefault, hover: homeHover, active: homeActive } },
  {
    path: '/chat',
    label: '채팅',
    icons: { default: chatDefault, hover: chatHover, active: chatActive },
  },
  {
    path: '/mypage',
    label: '마이페이지',
    icons: { default: mypageDefault, hover: mypageHover, active: mypageActive },
  },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 flex max-w-[600px] min-w-[320px] w-full bg-secondary-1 py-1">
      {navItems.map(({ path, label, icons }) => (
        <NavLink
          key={path}
          to={path}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-0.5"
        >
          {({ isActive }) => (
            <>
              <img src={isActive ? icons.active : icons.default} alt={`${label} Icon`} />
              <span
                className={`text-[10px] leading-[18px] line-hi text-gray-50 ${isActive && 'text-primary-active'}`}
              >
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

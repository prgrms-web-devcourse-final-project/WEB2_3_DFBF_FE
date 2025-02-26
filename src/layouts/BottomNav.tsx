import { NavLink } from 'react-router';
import { chatDefault, homeDefault, mypageDefault } from '@/assets/icons/nav';
import { twMerge } from 'tailwind-merge';
import HomeActive from '@/assets/icons/nav/HomeActive';
import ChatActive from '@/assets/icons/nav/ChatActive';
import MyPageActive from '@/assets/icons/nav/MyPageActive';

const navItems = [
  { path: '/home', label: '홈', icons: { default: homeDefault, active: <HomeActive /> } },
  {
    path: '/chat',
    label: '채팅',
    icons: { default: chatDefault, active: <ChatActive /> },
  },
  {
    path: '/mypage',
    label: '마이페이지',
    icons: { default: mypageDefault, active: <MyPageActive /> },
  },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-padding-nav bottom-0 left-1/2 -translate-x-1/2 z-40 flex max-w-[600px] min-w-[320px] w-full bg-secondary-1 py-1">
      {navItems.map(({ path, label, icons }) => (
        <NavLink
          key={path}
          to={path}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 py-0.5 hover:brightness-120 transition"
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                icons.active
              ) : (
                <img src={icons.default} className="w-6 h-6" alt={`${label} Icon`} />
              )}

              <span
                className={twMerge(
                  'text-[10px] leading-[18px] text-gray-50',
                  isActive && 'text-primary-active',
                )}
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

import { NavLink, useLocation } from 'react-router';
import {
  chatDefault,
  homeDefault,
  mypageDefault,
  HomeActive,
  ChatActive,
  MyPageActive,
} from '@/assets/icons/nav';
import { cn } from '@/utils';

const navItems = [
  {
    path: '/home',
    label: '홈',
    icons: {
      default: <img src={homeDefault} alt="홈 아이콘" className="w-6 h-6" />,
      active: <HomeActive />,
    },
  },
  {
    path: '/chat',
    label: '채팅',
    icons: {
      default: <img src={chatDefault} alt="채팅 아이콘" className="w-6 h-6" />,
      active: <ChatActive />,
    },
  },
  {
    path: '/mypage',
    label: '마이페이지',
    icons: {
      default: <img src={mypageDefault} alt="마이페이지 아이콘" className="w-6 h-6" />,
      active: <MyPageActive />,
    },
  },
];

export default function BottomNav() {
  const location = useLocation(); // 현재 URL 가져오기
  //바텀 nav 바 필요한 페이지
  const showNav =
    //메인 페이지
    location.pathname === '/home' ||
    //마이 페이지
    location.pathname === '/mypage' ||
    //유저 페이지
    location.pathname.startsWith('/user') ||
    //지난 대화 기록 페이지
    location.pathname === '/chat';

  if (!showNav) return null;

  return (
    <>
      <nav className="fixed bottom-padding-nav bottom-0 left-1/2 -translate-x-1/2 z-40 flex max-w-[600px] min-w-[320px] w-full bg-secondary-1 pt-1">
        {navItems.map(({ path, label, icons }) => (
          <NavLink
            key={path}
            to={path}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-0.5 hover:brightness-120 transition"
          >
            {({ isActive }) => (
              <>
                {isActive ? icons.active : icons.default}
                <span
                  className={cn(
                    'text-[10px] leading-[18px',
                    isActive ? 'text-primary-active' : 'text-gray-50',
                  )}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Spacer: 콘텐츠가 하단바에 가려지지 않도록 */}
      <div className="h-[69px]" />
    </>
  );
}

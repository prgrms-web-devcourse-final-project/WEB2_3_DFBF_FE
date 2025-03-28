import BottomNav from '@/layouts/bottomNav/BottomNav';
import { useLocation } from 'react-router';

const BottomNavWrapper = () => {
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

  return showNav ? <BottomNav /> : null;
};

export default BottomNavWrapper;

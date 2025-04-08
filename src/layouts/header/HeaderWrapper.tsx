import Header from '@/layouts/header/Header';
import HeaderChat from '@/layouts/header/HeaderChat';
import HeaderWithBack from '@/layouts/header/HeaderWithBack';
import MypageEditHeader from '@/layouts/header/MypageEditHeader';
import MypageHeader from '@/layouts/header/MypageHeader';
import UserPageHeader from '@/layouts/header/UserPageHeader';
import { useLocation } from 'react-router';

const HeaderWrapper = () => {
  const { pathname } = useLocation();

  if (pathname.startsWith('/user')) {
    return <UserPageHeader />;
  }

  if (pathname.startsWith('/chatroom')) {
    return <HeaderChat showLogo showNickname />;
  }

  if (pathname === '/home' || pathname === '/chat') {
    return <Header />;
  }

  if (pathname === '/mypage') {
    return <MypageHeader />;
  }

  if (pathname === '/post') {
    return <HeaderWithBack text="글 등록" />;
  }

  if (pathname === '/signup') {
    return <HeaderWithBack text="회원가입" />;
  }

  if (pathname === '/mypage/blocklist') {
    return <HeaderWithBack text="차단 목록" />;
  }

  if (pathname === '/mypage/edit') {
    return <MypageEditHeader />;
  }

  return <Header />;
};

export default HeaderWrapper;

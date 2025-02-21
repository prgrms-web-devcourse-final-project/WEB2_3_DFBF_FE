import Header from '@/layouts/header/Header';
import BottomNav from '@/layouts/BottomNav';
import { Outlet, useLocation } from 'react-router';
import HeaderWithBack from '@/layouts/header/HeaderWithBack';
import HeaderChat from '@/layouts/header/HeaderChat';
import { twMerge } from 'tailwind-merge';

function Layout() {
  const location = useLocation(); // 현재 URL 가져오기
  //바텀 nav 바 필요한 페이지
  const showNav =
    //메인 페이지
    location.pathname === '/home' ||
    //마이 페이지
    location.pathname === '/mypage' ||
    //유저 페이지
    location.pathname === '/user' ||
    //지난 대화 기록 페이지
    location.pathname === '/chat';

  const renderBottomNav = () => {
    if (showNav) {
      return <BottomNav />;
    } else return null;
  };

  const renderHeader = () => {
    if (
      //메인 페이지
      location.pathname === '/home' ||
      //지난 채팅 기록 페이지
      location.pathname === '/chat'
    ) {
      return <Header showPostButton />;
    } else if (
      //내 정보 페이지
      location.pathname === '/mypage'
    ) {
      return <Header showMoreOptions showPostButton />;
    } else if (
      //글 작성 페이지
      location.pathname === '/posting' ||
      //회원가입 페이지
      location.pathname === '/signup'
    ) {
      return <HeaderWithBack />;
    } else if (
      //유저 페이지
      location.pathname.includes('/user')
    ) {
      return <HeaderWithBack showMoreOptions />;
    } else if (
      //채팅방 페이지
      location.pathname.includes('/chatroom')
    ) {
      return <HeaderChat showLogo showNickname />;
    } else if (
      //정보 수정 페이지
      location.pathname.includes('/mypage/edit')
    ) {
      return <HeaderWithBack text="내 정보 수정" />;
    } else return <Header />;
  };

  return (
    <div className="relative max-w-[600px] min-w-[320px] w-full min-h-screen mx-auto bg-background flex flex-col">
      {/* 헤더 */}
      {renderHeader()}

      {/* 메인 컨텐츠 영역 */}
      <div
        className={twMerge(
          'pt-[44px] flex-1 flex justify-center w-full px-3',
          showNav && 'pb-[62px] ', // 하단 네비게이션 숨길때만 padding주기
        )}
      >
        <Outlet />
      </div>

      {/* 하단 네비게이션 */}
      {renderBottomNav()}
    </div>
  );
}

export default Layout;

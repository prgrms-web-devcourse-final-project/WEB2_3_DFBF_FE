import Header from '@/layouts/header/Header';
import BottomNav from '@/layouts/BottomNav';
import { Outlet } from 'react-router';
import HeaderWithBack from '@/layouts/header/HeaderWithBack';
import HeaderChat from '@/layouts/header/HeaderChat';

function Layout() {
  return (
    <div className="relative max-w-[600px] min-w-[320px] w-full h-full min-h-screen mx-auto bg-background">
      <Header showMoreOptions />
      <div className="flex justify-center h-full w-full px-3">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}

export default Layout;

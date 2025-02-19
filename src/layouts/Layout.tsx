import Header from '@/layouts/header/Header';
import BottomNav from '@/layouts/BottomNav';
import { Outlet } from 'react-router';
import HeaderWithBack from '@/layouts/header/HeaderWithBack';
import HeaderChat from '@/layouts/header/HeaderChat';

function Layout() {
  return (
    <div className="max-w-[600px] w-full h-screen mx-auto flex flex-col">
      <Header />
      <div className="flex-1 ">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}

export default Layout;

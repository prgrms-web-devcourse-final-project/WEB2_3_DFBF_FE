import Header from '@/layouts/Header';
import BottomNav from '@/layouts/BottomNav';
import { Outlet } from 'react-router';

function Layout() {
  return (
    <div className="relative max-w-[600px] min-w-[320px] w-full h-full min-h-screen mx-auto bg-background">
      <Header showMoreOptions />
      <div className="h-full px-3 flex justify-center">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}

export default Layout;

import Header from '@/layouts/Header';
import BottomNav from '@/layouts/BottomNav';
import { Outlet } from 'react-router';

function Layout() {
  return (
    <div className="max-w-[600px] w-full h-screen mx-auto flex flex-col">
      <Header showMoreOptions />
      <div className="flex-1 ">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}

export default Layout;

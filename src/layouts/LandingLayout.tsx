import Header from '@/layouts/Header';
import BottomNav from '@/layouts/BottomNav';
import { Outlet } from 'react-router';

function LandingLayout() {
  return (
    <div className="max-w-[700px] w-full h-screen mx-auto flex flex-col border border-red-500">
      <Header showNotification showMoreOptions />
      <div className="flex-1 border border-blue-500">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}

export default LandingLayout;

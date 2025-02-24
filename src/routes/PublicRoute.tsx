import { useAuthStore } from '@/store/authStore';
import { Navigate, Outlet } from 'react-router';

const PublicRoute = () => {
  // 임시 로그인 체크
  // const isAuthenticated = true;
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;

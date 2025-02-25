import { useAuthStore } from '@/store/authStore';
import { Navigate, Outlet } from 'react-router';

const PrivateRoute = () => {
  // 임시 로그인 체크
  // const isAuthenticated = true;
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;

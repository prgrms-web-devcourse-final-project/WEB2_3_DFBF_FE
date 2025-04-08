import { useAuthStore } from '@/store/authStore';
import { Navigate, Outlet } from 'react-router';

const PublicRoute = () => {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <Navigate to="/home" replace /> : <Outlet />;
};

export default PublicRoute;

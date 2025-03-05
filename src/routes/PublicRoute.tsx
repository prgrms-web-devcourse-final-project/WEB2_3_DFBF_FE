import { useAuthStore } from '@/store/authStore';
import { Navigate, Outlet } from 'react-router';

const PublicRoute = () => {

  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;

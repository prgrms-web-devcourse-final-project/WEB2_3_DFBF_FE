import { useAuthStore } from '@/store/authStore';
import { Navigate, Outlet } from 'react-router';

const PrivateRoute = () => {

  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;

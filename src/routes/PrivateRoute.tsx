import { useSSE } from '@/hooks/useSSE';
import { useAuthStore } from '@/store/authStore';
import { Navigate, Outlet } from 'react-router';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuthStore();
  useSSE();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;

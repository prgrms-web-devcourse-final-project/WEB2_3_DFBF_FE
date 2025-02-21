import { Navigate, Outlet } from 'react-router';

// 실제 로그인 여부를 체크하는 함수 (임시로 false, 실제 인증 로직 적용 필요)
const isAuthenticated = true;

const PrivateRoute = () => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;

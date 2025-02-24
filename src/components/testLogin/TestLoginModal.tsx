import { login, logout } from '@/apis/auth';
import { useAuthStore } from '@/store/authStore';

// 테스트계정
const id = 'test1234';
const password = 'test1234!';

// 로그인
const handleLogin = async () => {
  try {
    const { code, data } = await login(id, password);
    console.log('로그인 됨', code, data.accessToken);
  } catch (error) {
    console.log('로그인 에러', error);
  }
};

// 로그아웃
const handleLogout = async () => {
  try {
    await logout();
    console.log('로그아웃 됨');
  } catch (error) {
    console.log('로그아웃 에러', error);
  }
};

export default function TestLoginModal() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="fixed top-0 left-0 z-50">
      {isAuthenticated ? (
        <>
          <button
            onClick={handleLogout}
            className="caption-r bg-black/30 text-white px-1 py-1 rounded"
          >
            로그아웃
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="caption-r bg-black/30 text-white px-1 py-1 rounded"
        >
          로그인
        </button>
      )}
    </div>
  );
}

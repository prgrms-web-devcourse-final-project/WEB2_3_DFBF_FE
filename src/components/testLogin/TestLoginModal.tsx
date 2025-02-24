import { login, logout } from '@/apis/auth';
import { axiosInstance } from '@/apis/axios';
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

const handleTokenReissue = async () => {
  console.log('AT 재발급 시도');
  try {
    const { data } = await axiosInstance.post('/auth/token');
    console.log('AT 재발급:', data);

    if (!data.data) {
      console.log('토큰 정상');
      return;
    }

    if (data.data.accessToken) {
      console.log('토큰 재발급 성공:', data.data.accessToken);
    }
  } catch (error) {
    console.error(error);
    //window.location.href = '/'; // 로그인 페이지로 이동
    throw error;
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
          <button
            onClick={handleTokenReissue}
            className="caption-r bg-black/30 text-white px-1 py-1 rounded"
          >
            rt 재발급
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

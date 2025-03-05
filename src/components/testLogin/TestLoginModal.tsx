import { login, postLogout, reissueToken } from '@/apis/auth';
import { axiosInstance } from '@/apis/axios';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router';

// 테스트계정
const id = 'test1212';
const password = 'test1212!';

export default function TestLoginModal() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  // 로그인
  const handleLogin = async () => {
    console.log('로그인 시작');
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
      const { code } = await postLogout();
      if (code === 200) {
        logout();
        useAuthStore.persist.clearStorage(); // 로컬스토리지에서 persist 데이터 삭제
        navigate('/');
      }
    } catch (error) {
      console.error('로그아웃 에러가 발생했습니다.');
    }
  };

  // 토큰 재발급
  const handleTokenReissue = async () => {
    try {
      await reissueToken();
    } catch (error) {
      console.error('토큰 재발급 에러', error);
      useAuthStore.getState().logout(); // 전역 상태 초기화
    }
  };

  //test
  const test = async () => {
    try {
      console.log('테스트 시작');
      const data = await axiosInstance.get('/user');
      console.log('테스트:', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-60">
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
          <button onClick={test} className="caption-r bg-black/30 text-white px-1 py-1 rounded">
            테스트
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

import { getKakaoLogin } from '@/apis/auth';
import Loading from '@/components/loading/Loading';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function KaKaoRedirection() {
  const navigate = useNavigate();
  const kakaoCode = new URL(window.location.href).searchParams.get('code');
  const { setAccessToken } = useAuthStore();

  const handleKaKaoLogin = async () => {
    try {
      console.log('kakaoCode', kakaoCode);
      const { code, data } = await getKakaoLogin(kakaoCode as string);
      if (code === 200) {
        setAccessToken(data.accessToken);
        navigate('/home');
      } else {
        throw new Error('로그인 에러');
      }
    } catch (error) {
      console.error('로그인 에러가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (kakaoCode) {
      console.log('🔴 kakaoCode', kakaoCode);
      handleKaKaoLogin();
    }
  }, []);
  return <Loading />;
}

export default KaKaoRedirection;

import { getKakaoLogin } from '@/apis/auth';
import { useAuthStore } from '@/store/authStore';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

function KaKaoRedirection() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');
  const { setAccessToken } = useAuthStore;

  const handleKaKaoLogin = async () => {
    try {
      const data = await getKakaoLogin(code as string);
      // 토큰 저장하기
      navigate('/home');
    } catch (error) {}
  };

  useEffect(() => {
    handleKaKaoLogin();
  }, []);
  return <div>KaKaoRedirection</div>;
}

export default KaKaoRedirection;

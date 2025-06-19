import { Link, useNavigate } from 'react-router';
import { login } from '@/apis/auth';
import Button from '@/components/button/Button';
import logo from '@assets/icons/logo.svg';
import kakao from '@assets/icons/kakao-icon.svg';
import Input from '@/components/Input';
import { useState } from 'react';
import { useModalStore } from '@/store/modalStore';
import SpinLoading from '@/components/loading/SpinLoading';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const { openModal, closeModal } = useModalStore();
  const navigate = useNavigate();

  const [userId, setUserId] = useState(''); //아이디
  const [userPassword, setUserPassword] = useState(''); //비밀번호

  // 아이디 입력
  const handleChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  // 비밀번호 입력
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
  };

  // 로그인 실패 모달
  const handleLoginFailModal = (massage: string) => {
    openModal({
      title: '로그인 실패',
      message: massage,
      onConfirm: () => {
        closeModal();
      },
    });
  };

  // 입력 필드 초기화
  const resetInputs = () => {
    setUserId('');
    setUserPassword('');
  };

  // 로그인
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 현재 포커스된 요소의 포커스 제거
    (document.activeElement as HTMLElement | null)?.blur();

    const trimmedId = userId.trim();
    const trimmedPassword = userPassword.trim();

    if (!trimmedId || !trimmedPassword) {
      handleLoginFailModal('아이디와 비밀번호는 공백일 수 없습니다');
      resetInputs();
      return;
    }

    try {
      setIsLoading(true);
      await login(trimmedId, trimmedPassword);
      navigate('/home');
      // console.log('로그인 됨', code, data.accessToken);
    } catch (error) {
      handleLoginFailModal('아이디와 비밀번호를 다시 확인해 주세요.'); // 로그인 실패 모달
      // console.log('로그인 에러', error);
    } finally {
      setIsLoading(false);
    }
    resetInputs();
  };

  const handleKakaoLogin = () => {
    const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.href = link;
  };

  const renderButtonContent = () => {
    if (isLoading) {
      return <SpinLoading />;
    } else return <span>로그인</span>;
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[380px]">
      {/* 로고 */}
      <img className="w-[186px] h-[39px] mb-8" src={logo} alt="사운드링크 로고" />
      {/* 로그인 폼 */}
      <form
        onSubmit={(e) => handleLogin(e)}
        autoComplete="off"
        className="w-full pb-2.5 border-b border-gray-15"
      >
        <div className="flex flex-col gap-2 w-full">
          {/* 아이디 */}
          <div>
            <label htmlFor="userId" className="body-r text-gray-80 ml-[5px] mb-0.5">
              아이디
            </label>
            <Input
              id="userId"
              placeholder="아이디를 입력해 주세요"
              value={userId}
              onChange={(e) => handleChangeUserId(e)}
            />
          </div>
          {/* 비밀번호 */}
          <div>
            <label htmlFor="password" className="body-r text-gray-80 ml-[5px] mb-0.5">
              비밀번호
            </label>
            <Input
              id="password"
              placeholder="비밀번호를 입력해 주세요"
              type="password"
              value={userPassword}
              onChange={(e) => handleChangePassword(e)}
            />
          </div>
        </div>
        <Button className="focus:outline-primary-active mt-[14px]" type="submit">
          {renderButtonContent()}
        </Button>
      </form>

      <div className="flex flex-col gap-3 items-center w-full mt-2.5 ">
        {/* 소셜 로그인 */}
        <Button
          className="bg-[#FEE500] text-gray-80 gap-1.5 hover:bg-[#fded63]"
          onClick={handleKakaoLogin}
        >
          <img className="w-4" src={kakao} alt="카카오 아이콘" />
          <span className="text-black/85">카카오로 시작하기</span>
        </Button>
        {/* 회원가입 */}
        <div className="caption-r">
          계정이 없으신가요?
          <Link to="/signup" className="text-primary-active ml-1">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

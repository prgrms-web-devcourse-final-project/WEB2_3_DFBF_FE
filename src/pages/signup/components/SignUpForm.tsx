import Button from '@/components/button/Button';
import SpinLoading from '@/components/loading/SpinLoading';
import { useSignUp } from '@/hooks/useSignUp';
import AuthCodeInput from '@/pages/signup/components/AuthCodeInput';
import EmailInput from '@/pages/signup/components/EmailInput';
import IdInput from '@/pages/signup/components/IdInput';
import NicknameInput from '@/pages/signup/components/NicknameInput';
import PasswordConfirmInput from '@/pages/signup/components/PasswordConfirmInput';
import PasswordInput from '@/pages/signup/components/PasswordInput';
import { useState } from 'react';

function SignUpForm() {
  const { mutate: signUp, isPending } = useSignUp();
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    nickname: '',
    email: '',
  });
  const [validity, setValidity] = useState({
    id: false,
    password: false,
    passwordConfirm: false,
    nickname: false,
    email: false,
    authcode: false,
  });
  const isButtonEnabled = Object.values(validity).every(Boolean); // 회언가입 버튼 유효성 판단

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 폼 제출 방지
    if (!isButtonEnabled) return; // 유효하지 않으면 실행하지 않음
    signUp(formData);
  };

  const renderButtonContent = () => {
    if (isPending) {
      return <SpinLoading />;
    } else return <span>지금 시작하기</span>;
  };
  return (
    <form className="flex flex-col justify-between w-full h-full" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <IdInput
          setValue={(id) => setFormData((prev) => ({ ...prev, id }))}
          validity={validity.id}
          setValidity={(id) => setValidity((prev) => ({ ...prev, id }))}
        />
        <PasswordInput
          setValue={(password) => setFormData((prev) => ({ ...prev, password }))}
          setValidity={(password) => setValidity((prev) => ({ ...prev, password }))}
        />
        <PasswordConfirmInput
          setValidity={(passwordConfirm) => setValidity((prev) => ({ ...prev, passwordConfirm }))}
          password={formData.password}
        />
        <NicknameInput
          setValue={(nickname) => setFormData((prev) => ({ ...prev, nickname }))}
          validity={validity.nickname}
          setValidity={(nickname) => setValidity((prev) => ({ ...prev, nickname }))}
        />
        <EmailInput
          setValue={(email) => setFormData((prev) => ({ ...prev, email }))}
          validity={validity.email}
          setValidity={(email) => setValidity((prev) => ({ ...prev, email }))}
          authcodeValidity={validity.authcode}
        />
        {validity.email && (
          <AuthCodeInput
            emailvalidity={validity.email}
            email={formData.email}
            validity={validity.authcode}
            setValidity={(authcode) => setValidity((prev) => ({ ...prev, authcode }))}
          />
        )}
      </div>
      <Button variant={isButtonEnabled ? 'primary' : 'disabled'} className="py-[7px] body-m">
        {renderButtonContent()}
      </Button>
    </form>
  );
}

export default SignUpForm;

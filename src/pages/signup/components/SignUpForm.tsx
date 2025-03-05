import { postSignUp } from '@/apis/user';
import Button from '@/components/Button';
import SpinLoading from '@/components/loading/SpinLoading';
import AuthCodeInput from '@/pages/signup/components/AuthCodeInput';
import EmailInput from '@/pages/signup/components/EmailInput';
import IdInput from '@/pages/signup/components/IdInput';
import NicknameInput from '@/pages/signup/components/NicknameInput';
import PasswordConfirmInput from '@/pages/signup/components/PasswordConfirmInput';
import PasswordInput from '@/pages/signup/components/PasswordInput';
import { useModalStore } from '@/store/modalStore';
import { useState } from 'react';
import { useNavigate } from 'react-router';

type ValidationMessage = {
  type: 'success' | 'error' | '';
  message: string;
};

interface ValidationMessages {
  id: ValidationMessage;
  password: ValidationMessage;
  passwordConfirm: ValidationMessage;
  nickname: ValidationMessage;
  email: ValidationMessage;
  emailVerificationConfirm: ValidationMessage;
}

function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { openModal, closeModal } = useModalStore(); // 모달
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    email: '',
  });
  const [validity, setValidity] = useState({
    id: false,
    password: false,
    passwordConfirm: false,
    nickname: false,
    email: false,
  });

  const [emailSent, setEmailSent] = useState(false); // 이메일 전송 요청 여부

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { code } = await postSignUp(
        formData.nickname,
        formData.id,
        formData.password,
        formData.email,
      );
      if (code === 200) {
        openModal({
          title: '회원가입 성공 🎉',
          message: '사운드링크에 오신 것을 환영합니다',
          confirmText: '로그인하러 가기',
          onConfirm() {
            navigate('/login');
            closeModal();
          },
        });
      }
    } catch (error) {
      console.log('회원가입 실패');
    } finally {
      setIsLoading(false);
    }
  };

  const renderButtonContent = () => {
    if (isLoading) {
      return <SpinLoading />;
    } else return <span>지금 시작하기</span>;
  };
  return (
    <form className="flex flex-col justify-between w-full h-full" onSubmit={handleSumbit}>
      <div className="flex flex-col">
        <IdInput setValue={(id) => setFormData((prev) => ({ ...prev, id }))} />
        {/* <PasswordInput
          value={formData.password}
          setValue={(password) => setFormData((prev) => ({ ...prev, password }))}
        />
        <PasswordConfirmInput
          value={formData.passwordConfirm}
          password={formData.password}
          setValue={(passwordConfirm) => setFormData((prev) => ({ ...prev, passwordConfirm }))}
          }
        />
        <NicknameInput
          value={formData.nickname}
          setValue={(nickname) => setFormData((prev) => ({ ...prev, nickname }))}
        />
        <EmailInput
          value={formData.email}
          setValue={(email) => setFormData((prev) => ({ ...prev, email }))}
          onSendEmail={() => setEmailSent(true)}
        />
        <AuthCodeInput
          emailSent={emailSent}
          email={formData.email}
        /> */}
      </div>
      <Button variant="primary" className="py-[7px] body-m">
        {renderButtonContent()}
      </Button>
    </form>
  );
}

export default SignUpForm;

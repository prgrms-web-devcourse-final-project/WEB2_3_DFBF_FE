import { postSignUp } from '@/apis/user';
import LoadingSpinnerButton from '@/components/button/LoadingSpinnerButton';
import AuthCodeInput from '@/pages/signup/components/AuthCodeInput';
import EmailInput from '@/pages/signup/components/EmailInput';
import IdInput from '@/pages/signup/components/IdInput';
import NicknameInput from '@/pages/signup/components/NicknameInput';
import PasswordConfirmInput from '@/pages/signup/components/PasswordConfirmInput';
import PasswordInput from '@/pages/signup/components/PasswordInput';
import { useModalStore } from '@/store/modalStore';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';

type ValidityState = {
  id: boolean;
  password: boolean;
  passwordConfirm: boolean;
  nickname: boolean;
  email: boolean;
  authcode: boolean;
};

function SignUpForm() {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalStore(); // 모달 상태 사용

  // 회원가입 로직
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: (formData: { nickname: string; id: string; password: string; email: string }) =>
      postSignUp(formData.nickname, formData.id, formData.password, formData.email),

    onSuccess: ({ code }) => {
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
      } else {
        throw new Error('회원가입도중 오류가 발생했습니다.');
      }
    },

    onError: () => {
      // // console.log('회원가입 실패');
      openModal({
        title: '오류 발생',
        message: '잠시 후 다시 시도해주세요.',
        onConfirm: () => {
          closeModal();
        },
      });
    },
  });

  // 회원가입 ref
  const formDataRef = useRef({
    id: '',
    password: '',
    nickname: '',
    email: '',
  });

  // 필드마다 유효성
  const [validity, setValidity] = useState<ValidityState>({
    id: false,
    password: false,
    passwordConfirm: false,
    nickname: false,
    email: false,
    authcode: false,
  });
  const buttonEnabled = Object.values(validity).every(Boolean); // 회언가입 버튼 유효성 판단

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 폼 제출 방지
    if (!buttonEnabled) return; // 유효하지 않으면 실행하지 않음
    signUp(formDataRef.current);
  };

  // validity 업데이트 함수
  const updateValidity = (key: keyof ValidityState, value: boolean) => {
    setValidity((prev) => {
      if (prev[key] === value) return prev; // 값이 동일하면 변경 X
      return { ...prev, [key]: value };
    });
  };

  return (
    <form className="flex flex-col justify-between w-full h-full" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <IdInput
          changeFormID={(newID) => (formDataRef.current.id = newID)}
          setValidity={(value) => updateValidity('id', value)}
        />
        <PasswordInput
          changeFormPassword={(newPassword) => (formDataRef.current.password = newPassword)}
          setValidity={(value) => updateValidity('password', value)}
        />
        <PasswordConfirmInput
          setValidity={(value) => updateValidity('passwordConfirm', value)}
          password={formDataRef.current.password}
        />
        <NicknameInput
          changeFormNickname={(newNickname) => (formDataRef.current.nickname = newNickname)}
          setValidity={(value) => updateValidity('nickname', value)}
        />
        <EmailInput
          changeFormEmail={(newEmail) => (formDataRef.current.email = newEmail)}
          setValidity={(value) => updateValidity('email', value)}
          emailValidity={validity.email}
          authcodeValidity={validity.authcode}
        />
        {validity.email && (
          <AuthCodeInput
            email={formDataRef.current.email}
            authcodeValidity={validity.authcode}
            setValidity={(value) => updateValidity('authcode', value)}
          />
        )}
      </div>
      <LoadingSpinnerButton
        type="submit"
        isLoading={isPending}
        disabled={buttonEnabled}
        text="지금 시작하기"
      />
    </form>
  );
}

export default SignUpForm;

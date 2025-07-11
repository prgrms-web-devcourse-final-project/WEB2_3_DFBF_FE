import { postSignUp } from '@/apis/signup';
import { LoadingSpinnerButton } from '@/components/button';
import {
  IdInput,
  NicknameInput,
  PasswordGroupSection,
  EmailGroupSection,
} from '@/pages/signup/components';
import { useModalStore } from '@/store/modalStore';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function SignUpForm() {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalStore(); // 모달 상태 사용
  // 회원가입 로직
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: postSignUp,
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
      openModal({
        title: '오류 발생',
        message: '잠시 후 다시 시도해주세요.',
        onConfirm: () => {
          closeModal();
        },
      });
    },
  });

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const isButtonEnabled = id !== '' && password !== '' && email !== '' && nickname !== '';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 폼 제출 방지

    if (!isButtonEnabled) return; // 유효하지 않으면 실행하지 않음
    signUp({
      nickName: nickname,
      loginId: id,
      password: password,
      email: email,
    });
  };

  return (
    <form className="flex flex-col justify-between w-full h-full" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <IdInput onChange={setId} />
        <PasswordGroupSection onChange={setPassword} />
        <NicknameInput onChange={setNickname} />
        <EmailGroupSection onChange={setEmail} email={email} />
      </div>
      <LoadingSpinnerButton
        type="submit"
        isLoading={isPending}
        disabled={!isButtonEnabled}
        text="지금 시작하기"
      />
    </form>
  );
}

export default SignUpForm;

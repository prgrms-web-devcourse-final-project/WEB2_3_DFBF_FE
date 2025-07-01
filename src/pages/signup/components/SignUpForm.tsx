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

type ValidityState = {
  id: boolean;
  password: boolean;
  nickname: boolean;
  email: boolean;
};

function SignUpForm() {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalStore(); // 모달 상태 사용
  const [hasRequested, setHasRequested] = useState(false); // 이미 인증 요청을 했는지
  // 회원가입 로직
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: postSignUp,
    onSuccess: ({ code }) => {
      if (code === 200) {
        setHasRequested(true); // 인증요청 완료
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

  // 필드마다 유효성
  const [validity, setValidity] = useState<ValidityState>({
    id: false,
    password: false,
    nickname: false,
    email: false,
  });
  const buttonEnabled = Object.values(validity).every(Boolean); // 회언가입 버튼 유효성 판단

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 폼 제출 방지
    const formData = new FormData(e.currentTarget);
    const id = formData.get('id') as string;
    const password = formData.get('password') as string;
    const nickname = formData.get('nickname') as string;
    const email = formData.get('email') as string;

    if (!buttonEnabled) return; // 유효하지 않으면 실행하지 않음
    signUp({
      nickName: nickname,
      loginId: id,
      password: password,
      email: email,
    });
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
        <IdInput setValidity={(value) => updateValidity('id', value)} />
        <PasswordGroupSection setValidity={(value) => updateValidity('password', value)} />
        <NicknameInput setValidity={(value) => updateValidity('nickname', value)} />
        <EmailGroupSection updateValidity={updateValidity} validity={validity} />
      </div>
      <LoadingSpinnerButton
        type="submit"
        isLoading={isPending}
        disabled={!buttonEnabled || hasRequested}
        text="지금 시작하기"
      />
    </form>
  );
}

export default SignUpForm;

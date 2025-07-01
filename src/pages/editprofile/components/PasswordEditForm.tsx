import { checkPassword, patchEditProfile } from '@/apis/user';
import { StatusButton } from '@/components/button';
import { CurrentPasswordInput } from '@/pages/editprofile/components';
import { PasswordGroupSection } from '@/pages/signup/components';
import { useModalStore } from '@/store/modalStore';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function PasswordEditForm() {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalStore(); // 모달 관리

  const [validity, setValidity] = useState({
    currentPassword: false,
    password: false,
  });

  const buttonEnabled = Object.values(validity).every(Boolean);

  // validity 업데이트 함수
  const updateValidity = (key: 'currentPassword' | 'password', value: boolean) => {
    setValidity((prev) => {
      if (prev[key] === value) return prev; // 값이 동일하면 변경 X
      return { ...prev, [key]: value };
    });
  };

  // 현재 비밀번호 확인 useMutation
  const {
    mutateAsync: checkCurrentPassword,
    isPending: isCheckingPassword,
    isError: isCheckPasswordError,
    reset,
  } = useMutation({
    mutationFn: async (password: string) => {
      const res = await checkPassword(password);
      if (res.code !== 200) {
        throw new Error('비밀번호 틀림');
      }
      return res;
    },
  });

  // 비밀번호 변경 useMutation
  const {
    mutateAsync: changePassword,
    isPending: isChangingPassword,
    isError: isChangePasswordError,
    isSuccess,
  } = useMutation({
    mutationFn: async (password: string) => {
      const res = await patchEditProfile({ password });
      if (res.code !== 200) {
        throw new Error('비밀번호 변경 실패');
      }
      return res;
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get('current-password') as string;
    const password = formData.get('password') as string;
    // 현재 비밀번호 확인
    try {
      await checkCurrentPassword(currentPassword);
    } catch {
      openModal({
        title: '현재 비밀번호를 다시 확인해주세요',
        onConfirm: () => {
          reset();
          closeModal();
        },
      });
      return;
    }

    // 비밀 번호 변경
    try {
      await changePassword(password);

      openModal({
        title: '비밀번호 변경이 완료되었습니다',
        onConfirm: () => {
          navigate('/mypage');
          closeModal();
        },
      });
    } catch {
      openModal({
        title: '비밀번호 변경 실패',
        message: '잠시 후 다시 시도해주세요.',
        onConfirm: () => {
          closeModal();
          navigate(-1);
        },
      });
    }
  };

  return (
    <form className="flex flex-col justify-between h-full p-5" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <CurrentPasswordInput setValidity={(value) => updateValidity('currentPassword', value)} />
        <PasswordGroupSection
          setValidity={(value) => updateValidity('password', value)}
          passwordLabel="새 비밀번호"
          confirmLabel="새 비밀번호 확인"
          passwordPlaceholder="새 비밀번호를 입력해 주세요"
          confirmPlaceholder="새 비밀번호를 다시 입력해 주세요"
        />
      </div>
      <StatusButton
        isLoading={isCheckingPassword || isChangingPassword}
        isSuccess={isSuccess}
        isError={isCheckPasswordError || isChangePasswordError}
        disabled={!buttonEnabled}
        type="submit"
        text="저장하기"
      />
    </form>
  );
}

export default PasswordEditForm;

import { postSignUp } from '@/apis/user';
import { useModalStore } from '@/store/modalStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export const useSignUp = () => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalStore(); // 모달 상태 사용

  return useMutation({
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
      console.log('회원가입 실패');
    },
  });
};

import { postEmailVerificationCheck } from '@/apis/email';
import { useMutation } from '@tanstack/react-query';

// 이메일와 인증번호 확인 훅
export const useEmailVerificationCheck = (
  email: string, // 이메일
  authcode: string, // 인증코드
  setValidity: (val: boolean) => void,
  setValidationMessage: (val: { success: boolean; message: string }) => void,
  setButtonVariant: (val: 'primary' | 'disabled') => void,
) => {
  const verificationCheckMutation = useMutation({
    mutationFn: () => postEmailVerificationCheck(email, authcode),
    onSuccess: ({ code }) => {
      if (code === 200) {
        setValidationMessage({ success: true, message: '이메일 인증이 완료되었습니다' });
        setButtonVariant('disabled'); // 버튼 비활성화
        setValidity(true); // 완료 처리
      } else {
        setValidationMessage({ success: false, message: '인증 코드가 올바르지 않습니다' });
      }
    },

    onError: () => {
      setValidationMessage({
        success: false,
        message: '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      });
    },
  });

  return {
    verifyEmail: verificationCheckMutation.mutate, // 인증 요청 함수
    isLoading: verificationCheckMutation.isPending, // 로딩 상태
  };
};

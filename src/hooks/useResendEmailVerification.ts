import { postEmailVerificationRequest } from '@/apis/email';
import { useMutation } from '@tanstack/react-query';

// 이메일 재전송 훅
export const useResendEmailVerification = (
  email: string,
  setValidationMessage: (val: { success: boolean; message: string }) => void,
  setButtonVariant: (val: 'primary' | 'disabled') => void,
  setResendCount: React.Dispatch<React.SetStateAction<number>>,
) => {
  const resendEmailMutation = useMutation({
    mutationFn: () => postEmailVerificationRequest(email),
    onSuccess: ({ code }) => {
      if (code === 200) {
        setValidationMessage({
          success: true,
          message: '인증번호가 오지 않았나요?',
        });

        setResendCount((count) => count + 1);
        setButtonVariant('disabled');
      }
    },
    onError: () => {
      setValidationMessage({
        success: false,
        message: '이메일 재전송 중 오류가 발생했습니다. 다시 시도해주세요.',
      });
    },
  });

  return {
    resendEmailVerification: resendEmailMutation.mutate,
    isPending: resendEmailMutation.isPending,
  };
};

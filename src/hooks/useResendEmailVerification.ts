import { postEmailVerificationRequest } from '@/apis/email';
import { MAX_RESEND_COUNT } from '@/constants/email';
import { useMutation } from '@tanstack/react-query';

// 이메일 재전송 훅
export const useResendEmailVerification = (
  email: string,
  setValidationMessage: (val: { success: boolean; message: string }) => void,
  setResendCount: React.Dispatch<React.SetStateAction<number>>,
  resendCount: number, // 재전송횟수
) => {
  const resendEmailMutation = useMutation({
    mutationFn: () => {
      if (resendCount >= MAX_RESEND_COUNT) {
        throw new Error('최대 재전송 횟수를 초과');
      }
      return postEmailVerificationRequest(email);
    },
    onSuccess: ({ code }) => {
      if (code === 200) {
        setValidationMessage({
          success: true,
          message: '인증번호가 오지 않았나요?',
        });

        setResendCount((count) => count + 1);
      }
    },
    onError: (error) => {
      setValidationMessage({
        success: false,
        message:
          error.message === '최대 재전송 횟수를 초과'
            ? '최대 재전송 횟수를 초과했습니다.'
            : '이메일 재전송 중 오류가 발생했습니다. 다시 시도해주세요.',
      });
    },
  });

  return {
    resendEmailVerification: resendEmailMutation.mutate,
    isPending: resendEmailMutation.isPending,
  };
};

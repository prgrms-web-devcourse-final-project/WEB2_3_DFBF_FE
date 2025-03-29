import { postEmailVerificationRequest } from '@/apis/email';
import { useMutation } from '@tanstack/react-query';

// 이메일 인증 요청 훅 (인증 및 재전송)
export const useEmailVerification = (
  email: string,
  setValidationMessage: (val: { success: boolean; message: string }) => void,
  setValidity: (val: boolean) => void,
  setButtonEnabled: (val: boolean) => void,
  setEmail: (val: string) => void, // formdata 수정
) => {
  const emailVerificationMutation = useMutation({
    mutationFn: () => postEmailVerificationRequest(email),
    onSuccess: ({ code }) => {
      if (code === 200) {
        setValidationMessage({
          success: true,
          message: '이메일 인증 메일이 발송되었습니다. 메일함에서 인증번호를 확인 후 입력해주세요',
        });

        setValidity(true); // 폼 유효성 확인 업데이트
        setButtonEnabled(false); // 버튼 막기
        setEmail(email); // 이메일 업데이트하기
      }
    },
    onError: () => {
      setValidationMessage({
        success: false,
        message: '이메일 인증 요청 중 오류가 발생했습니다. 다시 시도해주세요',
      });
    },
  });

  return {
    requestEmailVerification: emailVerificationMutation.mutate, // 이메일 인증 요청 함수
    isPending: emailVerificationMutation.isPending, // 진행 중 여부
  };
};

import { getEmailAvailability } from '@/apis/email';
import { useEmailVerification } from '@/hooks/useEmailVerification';
import { useMutation } from '@tanstack/react-query';

// 이메일 인증 요청 및 이메일 중복 확인 요청
export const useEmailCheck = (
  email: string, // 이메일
  setEmail: (val: string) => void, // formdata 수정
  setValidity: (val: boolean) => void,
  setValidationMessage: (val: { success: boolean; message: string }) => void,
  setButtonEnabled: (val: boolean) => void,
) => {
  // 이메일 인증 요청 훅 사용
  const { requestEmailVerification, isPending } = useEmailVerification(
    email,
    setValidationMessage,
    setValidity,
    setButtonEnabled,
    setEmail,
  );
  // ✅ 이메일 중복 확인 요청
  const emailCheckMutation = useMutation({
    mutationFn: () => getEmailAvailability(email),
    onSuccess: ({ code }) => {
      if (code === 200) {
        requestEmailVerification(); // ✅ 이메일 인증 요청 실행
      } else if (code === 409) {
        setValidationMessage({
          success: false,
          message: '이 이메일은 이미 사용 중입니다. 다른 이메일을 입력해주세요',
        });
      }
    },
    onError: () => {
      setValidationMessage({
        success: false,
        message: '이메일 중복 확인 중 오류가 발생했습니다. 다시 시도해주세요',
      });
    },
  });

  return {
    emailCheck: emailCheckMutation.mutate, // ✅ 이메일 중복 확인 실행 함수
    isChecking: emailCheckMutation.isPending || isPending,
  };
};

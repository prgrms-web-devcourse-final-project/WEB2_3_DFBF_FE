import InputAuthCode from '@/components/InputAuthCode';
import SpinLoading from '@/components/loading/SpinLoading';
import { AUTHCODE_REGEX } from '@/constants';
import { MAX_RESEND_COUNT } from '@/constants/email';
import { useEmailVerification } from '@/hooks/useEmailVerification';
import { useEmailVerificationCheck } from '@/hooks/useEmailVerificationCheck';
import { useResendEmailVerification } from '@/hooks/useResendEmailVerification';
import { useValidationWithButton } from '@/hooks/useValidationWithButton';
import { useEffect, useState } from 'react';

interface AuthCodeInputProps {
  email: string;
  emailvalidity: boolean;
  validity: boolean; // 인증코드 유효성
  setValidity: (val: boolean) => void; // 인증코드 유효성 바꾸는 함수
}
function AuthCodeInput({ email, emailvalidity, validity, setValidity }: AuthCodeInputProps) {
  const [resendCount, setResendCount] = useState(0); // 재전송 횟수
  // 유효성 검사
  const handleValidation = (value: string) => {
    if (value == '') {
      return { success: false, message: '인증번호가 오지 않았나요?' };
    }
    if (!AUTHCODE_REGEX.test(value)) {
      return { success: false, message: '올바른 인증번호를 입력해주세요' };
    }

    return { success: false, message: '' };
  };
  const {
    text,
    validationMessage,
    setValidationMessage,
    buttonVariant,
    handleChange,
    setButtonVariant,
  } = useValidationWithButton(
    validity,
    setValidity,
    handleValidation,
    AUTHCODE_REGEX,
    '인증번호가 오지 않았나요?',
  );

  // 재전송 훅
  const { resendEmailVerification, isPending } = useResendEmailVerification(
    email,
    setValidationMessage,
    setButtonVariant,
    setResendCount,
  );
  // 인증번호 확인 훅
  const { verifyEmail, isLoading } = useEmailVerificationCheck(
    email, // 사용자 이메일
    text.toUpperCase(), // 인증번호 값
    setValidity,
    setValidationMessage,
    setButtonVariant,
  );
  // 시간 초과시 실행할 함수
  const onTimeout = () => {
    setValidationMessage({
      success: false,
      message: '인증 시간이 만료되었습니다. 다시 요청해주세요.',
    });
  };

  const renderButtonContent = () => {
    if (isLoading) {
      return <SpinLoading />;
    } else return <span>인증확인</span>;
  };

  // 이메일 text를 변경하여 인증확인 컴포넌트가 unmounted될 때 authcode 유효성 false로 변경
  useEffect(() => {
    return () => {
      setValidity(false);
    };
  }, []);

  return (
    <InputAuthCode
      type="text"
      id="emailVerificationConfrim"
      label="인증번호 확인"
      placeholder="인증번호 6자리를 입력해 주세요"
      variant={buttonVariant}
      buttonText={renderButtonContent()}
      emailSent={emailvalidity}
      isValid={validationMessage.success} // ✅ 유효성 검사 여부 전달
      validationMessage={validationMessage.message} // ✅ 메시지 전달
      value={text.toUpperCase()}
      onChange={handleChange}
      onClick={() => verifyEmail()}
      onTimeout={onTimeout}
      onResendEmail={() => resendEmailVerification()} // 재전송 요청
      resendCount={resendCount}
      disabled={validity} // 인증코드 유효성
    />
  );
}

export default AuthCodeInput;

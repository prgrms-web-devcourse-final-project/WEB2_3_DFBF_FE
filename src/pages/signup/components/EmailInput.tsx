import InputField from '@/components/InputField';
import SpinLoading from '@/components/loading/SpinLoading';
import { EMAIL_REGEX } from '@/constants';
import { useEmailCheck } from '@/hooks/useEmailCheck';
import { useValidationWithButton } from '@/hooks/useValidationWithButton';
import { useEffect, useState } from 'react';

interface EmailInputProps {
  setValue: (val: string) => void;
  validity: boolean;
  setValidity: (val: boolean) => void;
  authcodeValidity: boolean; // 인증 코드 유효성
}

function EmailInput({ setValue, validity, setValidity, authcodeValidity }: EmailInputProps) {
  const [showLoading, setShowLoading] = useState(false); // 로딩 UI 표시 여부
  // 유효성 검사
  const handleValidation = (value: string) => {
    if (!EMAIL_REGEX.test(value)) {
      return { success: false, message: '입력하신 이메일 주소가 올바른 형식이 아닙니다.' };
    }

    return { success: false, message: '' };
  };

  // 중복확인 훅
  const {
    text,
    validationMessage,
    setValidationMessage,
    buttonVariant,
    handleChange,
    setButtonVariant,
  } = useValidationWithButton({
    validity,
    setValidity,
    handleValidationMessage: handleValidation,
    REGEX: EMAIL_REGEX,
  });

  const { emailCheck, isChecking } = useEmailCheck(
    text,
    setValue,
    setValidity,
    setValidationMessage,
    setButtonVariant,
  );

  // 0.1초 후 로딩 UI 표시
  useEffect(() => {
    let loadingTimeout: NodeJS.Timeout;
    if (isChecking) {
      loadingTimeout = setTimeout(() => setShowLoading(true), 100);
    } else {
      setShowLoading(false);
    }
    return () => clearTimeout(loadingTimeout);
  }, [isChecking]);

  const renderButtonContent = () => {
    if (showLoading) {
      return <SpinLoading />;
    } else return <span>인증요청</span>;
  };

  return (
    <InputField
      type="text"
      id="email"
      label="이메일 인증"
      placeholder="이메일을 입력해 주세요"
      variant={buttonVariant}
      buttonText={renderButtonContent()}
      value={text}
      onChange={handleChange}
      isValid={validationMessage.success} // ✅ 유효성 검사 여부 전달
      validationMessage={validationMessage.message} // ✅ 메시지 전달
      onClick={() => emailCheck()}
      disabled={authcodeValidity} // 인증 코드 유효성
    />
  );
}

export default EmailInput;

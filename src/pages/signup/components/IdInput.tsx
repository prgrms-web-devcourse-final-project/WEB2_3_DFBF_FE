import InputField from '@/components/InputField';
import SpinLoading from '@/components/loading/SpinLoading';
import { ID_REGEX } from '@/constants';
import { useIdAvailability } from '@/hooks/useIdAvailability';
import { useValidationWithButton } from '@/hooks/useValidationWithButton';
import { useEffect, useState } from 'react';

interface IdInputProps {
  setValue: (val: string) => void;
  validity: boolean;
  setValidity: (val: boolean) => void;
}

function IdInput({ setValue, validity, setValidity }: IdInputProps) {
  const [showLoading, setShowLoading] = useState(false); // 로딩 UI 표시 여부

  // 유효성 검사
  const handleValidation = (value: string) => {
    if (!ID_REGEX.test(value)) {
      return { success: false, message: '아이디는 5~20자의 영문과 숫자로만 구성해야 합니다' };
    }
    return { success: false, message: '' };
  };
  // 중복확인 훅
  const { text, validationMessage, setValidationMessage, buttonVariant, handleChange } =
    useValidationWithButton({
      validity,
      setValidity,
      handleValidationMessage: handleValidation,
      REGEX: ID_REGEX,
    });

  const { mutate, isPending } = useIdAvailability(
    text,
    setValue,
    setValidity,
    setValidationMessage,
  );

  // 0.1초 후 로딩 UI 표시
  useEffect(() => {
    let loadingTimeout: NodeJS.Timeout;
    if (isPending) {
      loadingTimeout = setTimeout(() => setShowLoading(true), 100);
    } else {
      setShowLoading(false);
    }
    return () => clearTimeout(loadingTimeout);
  }, [isPending]);

  const renderButtonContent = () => {
    if (showLoading) {
      return <SpinLoading />;
    } else return <span>중복확인</span>;
  };

  return (
    <InputField
      id="id"
      label="아이디"
      placeholder="아이디를 입력해 주세요"
      variant={buttonVariant}
      buttonText={renderButtonContent()}
      value={text}
      onChange={handleChange}
      isValid={validationMessage.success} // ✅ 유효성 검사 여부 전달
      validationMessage={validationMessage.message} // ✅ 메시지 전달
      onClick={() => mutate()}
    />
  );
}

export default IdInput;

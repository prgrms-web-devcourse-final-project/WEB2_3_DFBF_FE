import InputField from '@/components/InputField';
import SpinLoading from '@/components/loading/SpinLoading';
import { MAX_NICKNAME_LENGTH, MIN_NICKNAME_LENGTH, NICKNAME_REGEX } from '@/constants';
import { useNicknameAvailability } from '@/hooks/useNicknameAvailability';
import { useValidationWithButton } from '@/hooks/useValidationWithButton';
import { useEffect, useState } from 'react';

interface NicknameInputProps {
  initialValue?: string; // 초기값
  setValue: (val: string) => void;
  validity: boolean;
  setValidity: (val: boolean) => void;
}

function NicknameInput({ initialValue, setValue, validity, setValidity }: NicknameInputProps) {
  const [showLoading, setShowLoading] = useState(false); // 로딩 UI 표시 여부
  // 유효성 검사
  const handleValidation = (value: string) => {
    if (value.length < MIN_NICKNAME_LENGTH || value.length > MAX_NICKNAME_LENGTH) {
      return { success: false, message: '닉네임은 2~7자 사이로 입력해야 합니다' };
    }
    if (!NICKNAME_REGEX.test(value)) {
      return {
        success: false,
        message:
          '닉네임에는 영어, 한글, 숫자만 사용할 수 있으며, 공백 및 특수문자는 허용되지 않습니다',
      };
    }

    return { success: false, message: '' };
  };
  const { text, validationMessage, setValidationMessage, buttonVariant, handleChange } =
    useValidationWithButton({
      validity,
      setValidity,
      handleValidationMessage: handleValidation,
      REGEX: NICKNAME_REGEX,
      initialText: initialValue,
    });
  // 닉네임 중복을 확인하는 함수
  const { mutate, isPending } = useNicknameAvailability(
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
      type="text"
      id="nickname"
      label="닉네임"
      placeholder="닉네임을 입력해 주세요"
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

export default NicknameInput;

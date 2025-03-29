import InputField from '@/components/InputField';
import { ID_REGEX } from '@/constants';
import { useIdAvailability } from '@/hooks/useIdAvailability';
import { useValidationWithButton } from '@/hooks/useValidationWithButton';

interface IdInputProps {
  setValue: (val: string) => void;
  validity: boolean;
  setValidity: (val: boolean) => void;
}

function IdInput({ setValue, validity, setValidity }: IdInputProps) {
  // 유효성 검사
  const handleValidation = (value: string) => {
    if (!ID_REGEX.test(value)) {
      return { success: false, message: '아이디는 5~20자의 영문과 숫자로만 구성해야 합니다' };
    }
    return { success: false, message: '' };
  };
  // 중복확인 훅
  const { text, validationMessage, setValidationMessage, buttonEnabled, handleChange } =
    useValidationWithButton({
      validity,
      setValidity,
      handleValidationMessage: handleValidation,
      REGEX: ID_REGEX,
    });

  const { isPending, mutate } = useIdAvailability(
    text,
    setValue,
    setValidity,
    setValidationMessage,
  );

  // 버튼 props
  const buttonHandler = {
    buttonEnabled: buttonEnabled,
    buttonText: '중복확인',
    isPending: isPending,
    onClick: mutate,
  };

  return (
    <InputField
      id="id"
      label="아이디"
      placeholder="아이디를 입력해 주세요"
      value={text}
      onChange={handleChange}
      isValid={validationMessage.success} // ✅ 유효성 검사 여부 전달
      validationMessage={validationMessage.message} // ✅ 메시지 전달
      buttonHandler={buttonHandler}
    />
  );
}

export default IdInput;

import InputField from '@/components/InputField';
import SpinLoading from '@/components/loading/SpinLoading';
import { MAX_NICKNAME_LENGTH, MIN_NICKNAME_LENGTH, NICKNAME_REGEX } from '@/constants';
import { useNicknameAvailability } from '@/hooks/useNicknameAvailability';
import { useValidationWithButton } from '@/hooks/useValidationWithButton';

interface NicknameInputProps {
  setValue: (val: string) => void;
  validity: boolean;
  setValidity: (val: boolean) => void;
}

function NicknameInput({ setValue, validity, setValidity }: NicknameInputProps) {
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
    useValidationWithButton(validity, setValidity, handleValidation, NICKNAME_REGEX);
  // 닉네임 중복을 확인하는 함수
  const { mutate, isPending } = useNicknameAvailability(
    text,
    setValue,
    setValidity,
    setValidationMessage,
  );

  const renderButtonContent = () => {
    if (isPending) {
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

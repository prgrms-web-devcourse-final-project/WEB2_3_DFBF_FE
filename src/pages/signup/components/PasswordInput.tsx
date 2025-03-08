import InputField from '@/components/InputField';
import { PASSWORD_REGEX } from '@/constants';
import { useValidation } from '@/hooks/useValidation';

interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  setValue: (val: string) => void;
  setValidity: (val: boolean) => void;
}

function PasswordInput({
  label = '비밀번호',
  placeholder = '비밀번호를 입력해 주세요',
  setValue,
  setValidity,
}: PasswordInputProps) {
  // 유효성 검사
  const handleValidation = (value: string) => {
    if (PASSWORD_REGEX.test(value)) {
      return { success: true, message: '사용 가능한 비밀번호입니다' };
    } else {
      return {
        success: false,
        message: '비밀번호는 8~16자의 영문, 숫자, 특수문자를 포함해야 합니다.',
      };
    }
  };

  const { text, validationMessage, handleChange } = useValidation(handleValidation);

  // ✅ 포커스 아웃 시 유효성 검사 실행
  const handleBlur = () => {
    if (PASSWORD_REGEX.test(text)) {
      setValue(text);
      setValidity(true);
    } else {
      setValidity(false);
    }
  };

  return (
    <InputField
      type="password"
      id="password"
      label={label}
      placeholder={placeholder}
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      isValid={validationMessage.success} // ✅ 유효성 검사 여부 전달
      validationMessage={validationMessage.message} // ✅ 메시지 전달
    />
  );
}

export default PasswordInput;

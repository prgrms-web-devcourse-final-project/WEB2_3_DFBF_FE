import InputField from '@/components/InputField';
import { PASSWORD_REGEX } from '@/constants';
import { useValidation } from '@/hooks/useValidation';

interface PasswordConfirmInputProps {
  setValidity: (val: boolean) => void;
  password: string;
}

function PasswordConfirmInput({ setValidity, password }: PasswordConfirmInputProps) {
  // 유효성 검사
  const handleValidation = (value: string) => {
    if (value === password && PASSWORD_REGEX.test(value)) {
      return { success: true, message: '비밀번호가 일치합니다' };
    } else {
      return { success: false, message: '비밀번호가 일치하지 않습니다' };
    }
  };
  const { text, validationMessage, handleChange } = useValidation(handleValidation);

  // ✅ 포커스 아웃 시 유효성 검사 실행
  const handleBlur = () => {
    if (text === password && PASSWORD_REGEX.test(text)) {
      setValidity(true);
    } else {
      setValidity(false);
    }
  };

  return (
    <InputField
      type="password"
      id="passwordConfirm"
      label="비밀번호 확인"
      placeholder="비밀번호를 다시 입력해 주세요"
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      isValid={validationMessage.success} // ✅ 유효성 검사 여부 전달
      validationMessage={validationMessage.message} // ✅ 메시지 전달
    />
  );
}

export default PasswordConfirmInput;

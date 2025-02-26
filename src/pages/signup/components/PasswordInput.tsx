import InputField from '@/components/InputField';
import { PASSWORD_REQUIRED_RULES } from '@/constants';

interface ValidationResult {
  type: 'success' | 'error' | ''; // 유효성 검사 결과 타입
  message: string; // 에러 메시지 또는 성공 메시지
}

interface PasswordInputProps {
  value: string;
  setValue: (val: string) => void;
  validation: ValidationResult;
  setValidation: (validation: ValidationResult) => void;
}

function PasswordInput({ value, setValue, validation, setValidation }: PasswordInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    const validationResult = handleValidation(newValue);
    setValidation(validationResult);
  };

  // 유효성 검사
  const handleValidation = (value: string): ValidationResult => {
    if (PASSWORD_REQUIRED_RULES.test(value)) {
      return { type: 'success', message: '사용 가능한 비밀번호입니다' };
    } else {
      return {
        type: 'error',
        message: '비밀번호는 8~16자의 영문, 숫자, 특수문자를 포함해야 합니다.',
      };
    }
  };

  return (
    <InputField
      type="password"
      id="password"
      label="비밀번호"
      placeholder="비밀번호를 입력해 주세요"
      isValid={false}
      value={value}
      onChange={handleChange}
      validationMessages={validation}
    />
  );
}

export default PasswordInput;

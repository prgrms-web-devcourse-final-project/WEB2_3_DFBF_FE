import InputField from '@/components/InputField';
import React from 'react';

interface ValidationResult {
  type: 'success' | 'error' | ''; // 유효성 검사 결과 타입
  message: string; // 에러 메시지 또는 성공 메시지
}

interface PasswordConfirmInputProps {
  value: string;
  password: string;
  setValue: (val: string) => void;
  validation: ValidationResult;
  setValidation: (validation: ValidationResult) => void;
}

function PasswordConfirmInput({
  value,
  password,
  setValue,
  validation,
  setValidation,
}: PasswordConfirmInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    const validationResult = handleValidation(newValue);
    setValidation(validationResult);
  };

  // 유효성 검사
  const handleValidation = (value: string): ValidationResult => {
    if (value === password) {
      return { type: 'success', message: '비밀번호가 일치합니다' };
    } else {
      return { type: 'error', message: '비밀번호가 일치하지 않습니다' };
    }
  };

  return (
    <InputField
      type="password"
      id="passwordConfirm"
      label="비밀번호 확인"
      placeholder="비밀번호를 다시 입력해 주세요"
      value={value}
      onChange={handleChange}
      validationMessages={validation}
    />
  );
}

export default PasswordConfirmInput;

import InputField from '@/components/InputField';
import React from 'react';

interface ValidationResult {
  type: 'success' | 'error' | ''; // 유효성 검사 결과 타입
  message: string; // 에러 메시지 또는 성공 메시지
}

interface IdInputProps {
  value: string;
  setValue: (val: string) => void;
  validation: ValidationResult;
  setValidation: (validation: ValidationResult) => void;
}

function IdInput({ value, setValue, validation, setValidation }: IdInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // 유효성 검사
    // const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newValue);
    // setValidation(
    //   isValid
    //     ? { type: 'success', message: '유효한 이메일입니다.' }
    //     : { type: 'error', message: '유효한 이메일 주소를 입력해주세요.' },
    // );
  };
  return (
    <InputField
      type="text"
      id="id"
      label="아이디"
      placeholder="아이디를 입력해 주세요"
      variant="primary"
      buttonText="중복확인"
      value={value}
      onChange={handleChange}
    />
  );
}

export default IdInput;

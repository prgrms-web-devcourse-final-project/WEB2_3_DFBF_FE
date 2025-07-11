import { InputField } from '@/components/input';
import { useEffect, useState } from 'react';

interface PasswordConfirmInputProps {
  label: string;
  placeholder: string;
  onChange: (val: string) => void;
  password: string;
}

function PasswordConfirmInput({
  label,
  placeholder,
  onChange,
  password,
}: PasswordConfirmInputProps) {
  const [text, setText] = useState('');
  const [validationStatus, setValidationStatus] = useState({
    isValid: false, // 유효성 통과여부
    message: '',
  });

  // 비밀번호확인 유효성 확인
  const validateConfirmPassword = (value: string, password: string) => {
    if (value === password && value !== '') {
      setValidationStatus({ isValid: true, message: '비밀번호가 일치합니다' });
    } else {
      setValidationStatus({ isValid: false, message: '비밀번호가 일치하지 않습니다' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    onChange(value); // 상위로 전달
    // 유효성 검사
    validateConfirmPassword(value, password);
  };

  useEffect(() => {
    if (text !== '') {
      validateConfirmPassword(text, password);
    }
  }, [password]);

  return (
    <InputField
      type="password"
      id="passwordConfirm"
      label={label}
      placeholder={placeholder}
      onChange={handleChange}
      isValid={validationStatus.isValid} // ✅ 유효성 검사 여부 전달
      message={validationStatus.message} // ✅ 메시지 전달
    />
  );
}

export default PasswordConfirmInput;

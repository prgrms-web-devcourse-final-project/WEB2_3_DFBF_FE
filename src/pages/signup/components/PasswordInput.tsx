import { InputField } from '@/components/input';
import { PASSWORD_REGEX } from '@/constants';
import { useState } from 'react';

interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  setValidity: (val: boolean) => void;
  passwordRef: React.RefObject<string>;
}

function PasswordInput({
  label = '비밀번호',
  placeholder = '비밀번호를 입력해 주세요',
  passwordRef,
  setValidity,
}: PasswordInputProps) {
  const [validationStatus, setValidationStatus] = useState({
    isValid: false, // 유효성 통과여부
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValidity(false); // form validity 초기화

    // 유효성 검사
    if (PASSWORD_REGEX.test(value)) {
      setValidationStatus({ isValid: true, message: '사용 가능한 비밀번호입니다' });
      passwordRef.current = value; //  password 업데이트
    } else {
      setValidationStatus({
        isValid: false,
        message: '비밀번호는 8~16자의 영문, 숫자, 특수문자를 포함해야 합니다.',
      });
    }
  };

  return (
    <InputField
      type="password"
      id="password"
      label={label}
      name="password"
      placeholder={placeholder}
      onChange={handleChange}
      isValid={validationStatus.isValid}
      message={validationStatus.message}
    />
  );
}

export default PasswordInput;

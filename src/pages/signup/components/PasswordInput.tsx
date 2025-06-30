import InputField from '@/components/input/InputField';
import { PASSWORD_REGEX } from '@/constants';
import { useState } from 'react';

interface PasswordInputProps {
  label?: string;
  placeholder?: string;
  changeFormPassword: (val: string) => void;
  setValidity: (val: boolean) => void;
}

function PasswordInput({
  label = '비밀번호',
  placeholder = '비밀번호를 입력해 주세요',
  changeFormPassword,
  setValidity,
}: PasswordInputProps) {
  const [validationStatus, setValidationStatus] = useState({
    isValid: false, // 유효성 통과여부
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    changeFormPassword(value); // form password 업데이트
    setValidity(false); // form validity 초기화

    // 유효성 검사
    if (PASSWORD_REGEX.test(value)) {
      setValidationStatus({ isValid: true, message: '사용 가능한 비밀번호입니다' });
      setValidity(true); // form validity true로 변경
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
      placeholder={placeholder}
      onChange={handleChange}
      isValid={validationStatus.isValid}
      message={validationStatus.message}
    />
  );
}

export default PasswordInput;

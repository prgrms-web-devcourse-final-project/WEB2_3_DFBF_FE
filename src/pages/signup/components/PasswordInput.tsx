import InputField from '@/components/InputField';
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
  const [text, setText] = useState('');
  const [validationMessage, setValidationMessage] = useState({
    success: false,
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    changeFormPassword(value); // form password 업데이트
    setValidity(false); // form validity 초기화

    // 유효성 검사
    const isValid = PASSWORD_REGEX.test(value);

    if (isValid) {
      setValidationMessage({ success: true, message: '사용 가능한 비밀번호입니다' });
      setValidity(true); // form validity true로 변경
    } else {
      setValidationMessage({
        success: false,
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
      value={text}
      onChange={handleChange}
      isValid={validationMessage.success} // ✅ 유효성 검사 여부 전달
      validationMessage={validationMessage.message} // ✅ 메시지 전달
    />
  );
}

export default PasswordInput;

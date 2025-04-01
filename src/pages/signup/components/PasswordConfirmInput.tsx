import InputField from '@/components/InputField';
import { useState } from 'react';

interface PasswordConfirmInputProps {
  label?: string;
  placeholder?: string;
  setValidity: (val: boolean) => void;
  password: string;
}

function PasswordConfirmInput({
  label = '비밀번호 확인',
  placeholder = '비밀번호를 다시 입력해 주세요',
  setValidity,
  password,
}: PasswordConfirmInputProps) {
  const [text, setText] = useState('');
  const [validationMessage, setValidationMessage] = useState({
    success: false,
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    setValidity(false); // form validity 초기화

    // 유효성 검사
    if (value === password && value !== '') {
      setValidationMessage({ success: true, message: '비밀번호가 일치합니다' });
      setValidity(true);
    } else {
      setValidationMessage({ success: false, message: '비밀번호가 일치하지 않습니다' });
    }
  };

  return (
    <InputField
      type="password"
      id="passwordConfirm"
      label={label}
      placeholder={placeholder}
      value={text}
      onChange={handleChange}
      isValid={validationMessage.success} // ✅ 유효성 검사 여부 전달
      validationMessage={validationMessage.message} // ✅ 메시지 전달
    />
  );
}

export default PasswordConfirmInput;

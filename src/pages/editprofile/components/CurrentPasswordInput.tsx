import InputField from '@/components/input/InputField';
import { useState } from 'react';

interface CurrentPasswordInputPros {
  setCurrentPassword: (val: string) => void;
}

function CurrentPasswordInput({ setCurrentPassword }: CurrentPasswordInputPros) {
  const [text, setText] = useState('');

  const handleonBlur = () => {
    setCurrentPassword(text);
  };

  return (
    <InputField
      type="password"
      id="current-password"
      label="현재 비밀번호"
      placeholder="현재 비밀번호"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={handleonBlur}
    />
  );
}

export default CurrentPasswordInput;

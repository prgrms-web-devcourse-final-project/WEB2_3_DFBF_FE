import { PasswordConfirmInput, PasswordInput } from '@/pages/signup/components';
import { useEffect, useState } from 'react';

interface PasswordGroupSectionProps {
  onChange: (val: string) => void;
  passwordLabel?: string;
  confirmLabel?: string;
  passwordPlaceholder?: string;
  confirmPlaceholder?: string;
}

const PasswordGroupSection = ({
  onChange,
  passwordLabel = '비밀번호',
  confirmLabel = '비밀번호 확인',
  passwordPlaceholder = '비밀번호를 입력해 주세요',
  confirmPlaceholder = '비밀번호를 다시 입력해 주세요',
}: PasswordGroupSectionProps) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (password === confirmPassword) {
      onChange(password);
    } else {
      onChange('');
    }
  }, [password, confirmPassword, onChange]);

  return (
    <>
      <PasswordInput
        onChange={setPassword}
        label={passwordLabel}
        placeholder={passwordPlaceholder}
      />
      <PasswordConfirmInput
        onChange={setConfirmPassword}
        password={password}
        label={confirmLabel}
        placeholder={confirmPlaceholder}
      />
    </>
  );
};

export default PasswordGroupSection;

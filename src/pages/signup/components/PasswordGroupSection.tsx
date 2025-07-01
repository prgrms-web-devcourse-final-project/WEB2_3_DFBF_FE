import { PasswordConfirmInput, PasswordInput } from '@/pages/signup/components';
import { useRef } from 'react';

interface PasswordGroupSectionProps {
  setValidity: (val: boolean) => void;
  passwordLabel?: string;
  confirmLabel?: string;
  passwordPlaceholder?: string;
  confirmPlaceholder?: string;
}

const PasswordGroupSection = ({
  setValidity,
  passwordLabel = '비밀번호',
  confirmLabel = '비밀번호 확인',
  passwordPlaceholder = '비밀번호를 입력해 주세요',
  confirmPlaceholder = '비밀번호를 다시 입력해 주세요',
}: PasswordGroupSectionProps) => {
  const passwordRef = useRef('');
  return (
    <>
      <PasswordInput
        setValidity={setValidity}
        passwordRef={passwordRef}
        label={passwordLabel}
        placeholder={passwordPlaceholder}
      />
      <PasswordConfirmInput
        setValidity={setValidity}
        passwordRef={passwordRef}
        label={confirmLabel}
        placeholder={confirmPlaceholder}
      />
    </>
  );
};

export default PasswordGroupSection;

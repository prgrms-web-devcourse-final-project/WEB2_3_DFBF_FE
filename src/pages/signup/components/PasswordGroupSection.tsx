import { PasswordConfirmInput, PasswordInput } from '@/pages/signup/components';
import { useRef } from 'react';

interface PasswordGroupSectionProps {
  setValidity: (val: boolean) => void;
}

const PasswordGroupSection = ({ setValidity }: PasswordGroupSectionProps) => {
  const passwordRef = useRef('');
  return (
    <>
      <PasswordInput setValidity={setValidity} passwordRef={passwordRef} />
      <PasswordConfirmInput setValidity={setValidity} passwordRef={passwordRef} />
    </>
  );
};

export default PasswordGroupSection;

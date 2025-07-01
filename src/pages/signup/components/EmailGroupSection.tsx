import { AuthCodeInput, EmailInput } from '@/pages/signup/components';
import { useState } from 'react';

interface EmailGroupSectionProps {
  setValidity: (val: boolean) => void;
  emailValidity: boolean;
}

const EmailGroupSection = ({ setValidity, emailValidity }: EmailGroupSectionProps) => {
  const [email, setEmail] = useState('');
  return (
    <>
      <EmailInput setValidity={setValidity} emailValidity={emailValidity} setEmail={setEmail} />
      {email !== '' && (
        <AuthCodeInput email={email} emailValidity={emailValidity} setValidity={setValidity} />
      )}
    </>
  );
};

export default EmailGroupSection;

import { AuthCodeInput, EmailInput } from '@/pages/signup/components';
import { useState } from 'react';

interface EmailGroupSectionProps {
  updateValidity: (key: 'email', value: boolean) => void;
  validity: { email: boolean };
}

const EmailGroupSection = ({ updateValidity, validity }: EmailGroupSectionProps) => {
  const [email, setEmail] = useState('');
  return (
    <>
      <EmailInput
        setValidity={(value) => updateValidity('email', value)}
        emailValidity={validity.email}
        setEmail={setEmail}
      />
      {email !== '' && (
        <AuthCodeInput
          email={email}
          emailValidity={validity.email}
          setValidity={(value) => updateValidity('email', value)}
        />
      )}
    </>
  );
};

export default EmailGroupSection;

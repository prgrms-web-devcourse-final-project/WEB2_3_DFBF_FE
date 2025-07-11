import { AuthCodeInput, EmailInput } from '@/pages/signup/components';
import { useState } from 'react';

interface EmailGroupSectionProps {
  onChange: (val: string) => void;
  email: string;
}

const EmailGroupSection = ({ onChange, email }: EmailGroupSectionProps) => {
  // 인증번호 요청 전 입력된 임시 이메일 값
  const [tempEmail, setTempEmail] = useState('');

  return (
    <>
      <EmailInput onChange={setTempEmail} email={email} />
      {tempEmail !== '' && (
        <AuthCodeInput tempEmail={tempEmail} onChange={onChange} email={email} />
      )}
    </>
  );
};

export default EmailGroupSection;

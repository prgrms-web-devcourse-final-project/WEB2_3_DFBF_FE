import InputAuthCode from '@/components/InputAuthCode';
import { useState } from 'react';

type ButtonType = 'primary' | 'secondary' | 'disabled';

type MessageType = {
  type: 'success' | 'error' | '';
  message: string;
};

interface AuthCodeInputProps {
  emailSent: boolean;
}
function AuthCodeInput({ emailSent }: AuthCodeInputProps) {
  // 버튼 상태를 관리하는 state 추가
  const [buttonVariant, setButtonVariant] = useState<ButtonType>('primary');

  const [message, setMessage] = useState<MessageType>({
    type: '',
    message: '인증번호가 오지 않았나요?',
  });

  return (
    <InputAuthCode
      type="text"
      id="emailVerificationConfrim"
      label="인증번호 확인"
      placeholder="인증번호 4자리를 입력해 주세요"
      variant="primary"
      buttonText="인증확인"
      emailSent={emailSent}
      messages={message}
    />
  );
}

export default AuthCodeInput;

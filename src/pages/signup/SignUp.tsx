import Button from '@/components/Button';
import InputAuthCode from '@/components/InputAuthCode';
import InputField from '@/components/InputField';
import AuthCodeInput from '@/pages/signup/components/AuthCodeInput';
import EmailInput from '@/pages/signup/components/EmailInput';
import IdInput from '@/pages/signup/components/IdInput';
import NicknameInput from '@/pages/signup/components/NicknameInput';
import PasswordConfirmInput from '@/pages/signup/components/PasswordConfirmInput';
import PasswordInput from '@/pages/signup/components/PasswordInput';
import { useState } from 'react';

type ValidationMessage = {
  type: 'success' | 'error' | '';
  message: string;
};

interface ValidationMessages {
  id: ValidationMessage;
  password: ValidationMessage;
  passwordConfirm: ValidationMessage;
  nickname: ValidationMessage;
  email: ValidationMessage;
  emailVerificationConfirm: ValidationMessage;
}

function SignUp() {
  // 전송할 폼데이터
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    email: '',
  });

  const [emailSent, setEmailSent] = useState(false); // 이메일 전송 요청 여부
  // 유효성 검사 후 띄울 메세지
  const [validationMessages, setValidationMessages] = useState<ValidationMessages>({
    id: { type: '', message: '' },
    password: { type: '', message: '' },
    passwordConfirm: { type: '', message: '' },
    nickname: { type: '', message: '' },
    email: { type: '', message: '' },
    emailVerificationConfirm: { type: '', message: '' },
  });

  return (
    <div className=" flex w-full pt-5 pb-[40px] flex-col justify-between">
      <form className="w-full" onSubmit={(e) => e.preventDefault()}>
        <IdInput
          value={formData.id}
          setValue={(id) => setFormData((prev) => ({ ...prev, id }))}
          validation={validationMessages.id}
          setValidation={(validation) =>
            setValidationMessages((prev) => ({ ...prev, id: validation }))
          }
        />
        <PasswordInput
          value={formData.password}
          setValue={(password) => setFormData((prev) => ({ ...prev, password }))}
          validation={validationMessages.password}
          setValidation={(validation) =>
            setValidationMessages((prev) => ({ ...prev, password: validation }))
          }
        />
        <PasswordConfirmInput
          value={formData.passwordConfirm}
          password={formData.password}
          setValue={(passwordConfirm) => setFormData((prev) => ({ ...prev, passwordConfirm }))}
          validation={validationMessages.passwordConfirm}
          setValidation={(validation) =>
            setValidationMessages((prev) => ({ ...prev, passwordConfirm: validation }))
          }
        />
        <NicknameInput
          value={formData.nickname}
          setValue={(nickname) => setFormData((prev) => ({ ...prev, nickname }))}
          validation={validationMessages.nickname}
          setValidation={(validation) =>
            setValidationMessages((prev) => ({ ...prev, nickname: validation }))
          }
        />
        <EmailInput
          value={formData.email}
          setValue={(email) => setFormData((prev) => ({ ...prev, email }))}
          validation={validationMessages.email}
          setValidation={(validation) =>
            setValidationMessages((prev) => ({ ...prev, email: validation }))
          }
          onSendEmail={() => setEmailSent(true)}
        />
        <AuthCodeInput emailSent={emailSent} />
      </form>

      <Button variant="disabled" className="py-[7px] body-m">
        지금 시작하기
      </Button>
    </div>
  );
}

export default SignUp;

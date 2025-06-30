import { postEmailVerificationCheck, postEmailVerificationRequest } from '@/apis/email';
import InputAuthCode from '@/components/InputAuthCode';
import { AUTHCODE_REGEX } from '@/constants';
import { MAX_RESEND_COUNT } from '@/constants/email';
import { useModalStore } from '@/store/modalStore';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

interface AuthCodeInputProps {
  email: string;
  authcodeValidity: boolean;
  setValidity: (val: boolean) => void; // 인증코드 유효성 바꾸는 함수
}
function AuthCodeInput({ email, authcodeValidity, setValidity }: AuthCodeInputProps) {
  const { openModal, closeModal } = useModalStore(); // 모달
  const [resendCount, setResendCount] = useState(0); // 재전송 횟수
  const [text, setText] = useState('');
  const [validationMessage, setValidationMessage] = useState({
    success: false,
    message: '인증번호가 오지 않았나요?',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);

    // 유효성 검사
    const isValid = AUTHCODE_REGEX.test(value);

    if (isValid) {
      setValidationMessage({ success: true, message: '' });
    } else {
      setValidationMessage({ success: false, message: '올바른 인증번호를 입력해주세요' });
    }
  };

  // 이메일 재전송
  const { mutate: resendEmailVerification } = useMutation({
    mutationFn: () => postEmailVerificationRequest(email),
    onSuccess: ({ code }) => {
      if (code === 200) {
        setResendCount((count) => count + 1);
      }
    },
    onError: () => {
      openModal({
        title: '오류 발생',
        message: '잠시 후 다시 시도해주세요.',
        onConfirm: () => {
          closeModal();
        },
      });
    },
  });
  // 인증번호 확인
  const { mutate: verifyEmail, isPending } = useMutation({
    mutationFn: () => postEmailVerificationCheck(email, text),
    onSuccess: ({ code }) => {
      if (code === 200) {
        setValidationMessage({ success: true, message: '이메일 인증이 완료되었습니다' });
        setValidity(true); // 완료 처리
      } else {
        setValidationMessage({ success: false, message: '인증 코드가 올바르지 않습니다' });
      }
    },

    onError: () => {
      setValidationMessage({
        success: false,
        message: '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      });
    },
  });

  // 시간 초과시 실행할 함수
  const onTimeout = () => {
    setValidationMessage({
      success: false,
      message: '인증 시간이 만료되었습니다. 다시 요청해주세요.',
    });
  };

  // 이메일 재전송 함수
  const handleResendEmail = () => {
    if (resendCount >= MAX_RESEND_COUNT) {
      return openModal({
        title: '최대 재전송 횟수 초과',
        message: '새로고침 후 다시 시도해주세요.',
        onConfirm: () => {
          closeModal();
        },
      });
    }

    resendEmailVerification();
  };

  const buttonHandler = {
    disable: validationMessage.success && !authcodeValidity,
    text: '인증확인',
    isLoading: isPending,
    onClick: verifyEmail,
  };

  return (
    <InputAuthCode
      id="emailVerificationConfrim"
      label="인증번호 확인"
      placeholder="인증번호 6자리를 입력해 주세요"
      isValid={validationMessage.success} // ✅ 유효성 검사 여부 전달
      validationMessage={validationMessage.message} // ✅ 메시지 전달
      value={text.toUpperCase()}
      onChange={handleChange}
      onTimeout={onTimeout} // 시간이 만료되었을 때 실행할 함수
      onResendEmail={handleResendEmail} // 재전송 요청
      resendCount={resendCount} // 재전송 횟수
      authcodeValidity={authcodeValidity} // 인증코드 유효성
      buttonHandler={buttonHandler}
    />
  );
}

export default AuthCodeInput;

// setValidationMessage({
//   success: false,
//   message:
//     error.message === '최대 재전송 횟수를 초과'
//       ? '최대 재전송 횟수를 초과했습니다.'
//       : '이메일 재전송 중 오류가 발생했습니다. 다시 시도해주세요.',
// });

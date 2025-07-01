import { getEmailAvailability, postEmailVerificationRequest } from '@/apis/email';
import { LoadingSpinnerButton } from '@/components/button';
import { InputField } from '@/components/input';
import { EMAIL_REGEX } from '@/constants';
import { useModalStore } from '@/store/modalStore';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

interface EmailInputProps {
  setValidity: (val: boolean) => void;
  emailValidity: boolean; // 이메일 유효성
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

function EmailInput({ setValidity, emailValidity, setEmail }: EmailInputProps) {
  const { openModal, closeModal } = useModalStore(); // 모달
  const [text, setText] = useState('');
  const [hasRequested, setHasRequested] = useState(false); // 이미 인증 요청을 했는지
  const [validationStatus, setValidationStatus] = useState({
    isValid: false, // 유효성 통과여부
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    setValidity(false); // form validity 초기화

    // 유효성 검사
    const isValid = EMAIL_REGEX.test(value);

    if (isValid) {
      setValidationStatus({ isValid: true, message: '' });
    } else {
      setValidationStatus({
        isValid: false,
        message: '입력하신 이메일 주소가 올바른 형식이 아닙니다.',
      });
    }
  };

  // 이메일 중복확인
  const { mutate: checkEmailAvailability, isPending: isCheckingEmail } = useMutation({
    mutationFn: () => getEmailAvailability(text),
    onSuccess: ({ code }) => {
      if (code === 200) {
        requestEmailVerification(); // ✅ 이메일 인증 요청 실행
      } else if (code === 409) {
        setValidationStatus({
          isValid: false,
          message: '이 이메일은 이미 사용 중입니다. 다른 이메일을 입력해주세요',
        });
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

  // 이메일 인증 요청
  const { mutate: requestEmailVerification, isPending: isRequestingEmailVerification } =
    useMutation({
      mutationFn: () => postEmailVerificationRequest(text),
      onSuccess: ({ code }) => {
        if (code === 200) {
          setValidationStatus({
            isValid: true,
            message:
              '이메일 인증 메일이 발송되었습니다. 메일함에서 인증번호를 확인 후 입력해주세요',
          });
          setHasRequested(true);
          setEmail(text);
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

  return (
    <InputField
      id="email"
      label="이메일 인증"
      placeholder="이메일을 입력해 주세요"
      value={text}
      name="email"
      onChange={handleChange}
      isValid={validationStatus.isValid}
      message={validationStatus.message}
      disabled={emailValidity}
      actionButton={
        <LoadingSpinnerButton
          isLoading={isCheckingEmail || isRequestingEmailVerification}
          className="w-[65px]"
          text={emailValidity ? '인증완료' : '인증요청'}
          disabled={!validationStatus.isValid || emailValidity || hasRequested}
          onClick={() => checkEmailAvailability()}
        />
      }
    />
  );
}

export default EmailInput;

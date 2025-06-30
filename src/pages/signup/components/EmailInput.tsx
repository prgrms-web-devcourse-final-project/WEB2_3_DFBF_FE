import { getEmailAvailability, postEmailVerificationRequest } from '@/apis/email';
import LoadingSpinnerButton from '@/components/button/LoadingSpinnerButton';
import InputField from '@/components/InputField';
import { EMAIL_REGEX } from '@/constants';
import { useModalStore } from '@/store/modalStore';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

interface EmailInputProps {
  changeFormEmail: (val: string) => void;
  setValidity: (val: boolean) => void;
  authcodeValidity: boolean; // 인증 코드 유효성
  emailValidity: boolean; // 이메일 유효성
}

function EmailInput({
  changeFormEmail,
  setValidity,
  authcodeValidity,
  emailValidity,
}: EmailInputProps) {
  const { openModal, closeModal } = useModalStore(); // 모달
  const [text, setText] = useState('');
  const [validationStatus, setValidationStatus] = useState({
    isValid: false, // 유효성 통과여부
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    changeFormEmail(value); // form id 업데이트
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

          setValidity(true); // 폼 유효성 확인 업데이트
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
      onChange={handleChange}
      isValid={validationStatus.isValid} // ✅ 유효성 검사 여부 전달
      message={validationStatus.message} // ✅ 메시지 전달
      disabled={authcodeValidity} // input disabled
      actionButton={
        <LoadingSpinnerButton
          isLoading={isCheckingEmail && isRequestingEmailVerification}
          className="w-[65px]"
          text="인증요청"
          disabled={!validationStatus.isValid || emailValidity}
          onClick={() => checkEmailAvailability()}
        />
      }
    />
  );
}

export default EmailInput;

import { getEmailAvailability, postEmailVerificationRequest } from '@/apis/email';
import InputField from '@/components/InputField';
import { EMAIL_REGEX } from '@/constants';
import React, { useEffect, useState } from 'react';

interface ValidationResult {
  type: 'success' | 'error' | ''; // 유효성 검사 결과 타입
  message: string; // 에러 메시지 또는 성공 메시지
}

interface EmailInputProps {
  value: string;
  setValue: (val: string) => void;
  validation: ValidationResult;
  setValidation: (validation: ValidationResult) => void;
  onSendEmail: () => void; // 이메일 보냈음을 확인하는 함수
}

function EmailInput({ value, setValue, validation, setValidation, onSendEmail }: EmailInputProps) {
  // 버튼 상태를 관리하는 state 추가
  const [buttonVariant, setButtonVariant] = useState<'primary' | 'secondary' | 'disabled'>(
    'primary',
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    const validationResult = handleValidation(newValue);
    setValidation(validationResult);
  };
  // 유효성 검사
  const handleValidation = (value: string): ValidationResult => {
    if (!EMAIL_REGEX.test(value)) {
      return {
        type: 'error',
        message: '입력하신 이메일 주소가 올바른 형식이 아닙니다.',
      };
    }

    return { type: '', message: '' };
  };

  // 이메일 중복을 확인하는 함수
  const handleEmailCheck = async () => {
    console.log(value);
    try {
      const { data } = await getEmailAvailability(value);
      if (data.code === 200) {
        handlePostEmailVerificationRequest(); // 사용 가능한 이메일 경우에만 이메일 인증 요청 보내기
      } else {
        setValidation({
          type: 'error',
          message: '이 이메일은 이미 사용 중입니다. 다른 이메일을 입력해주세요',
        });
      }
    } catch (error) {
      setValidation({ type: 'error', message: '예기치 않은 오류가 발생했습니다' });
    }
  };

  // 이메일 인증을 요청하는 함수
  const handlePostEmailVerificationRequest = async () => {
    console.log('test', value);
    try {
      await postEmailVerificationRequest(value);
      onSendEmail(); // 이메일 보냈음을 확인하는 함수
      setValidation({
        type: 'success',
        message: '이메일 인증 메일이 발송되었습니다. 메일함에서 인증번호를 확인 후 입력해주세요',
      });
      setButtonVariant('disabled'); // 이메일 인증 요청을 하면 버튼 disabled
    } catch (error) {
      setValidation({ type: 'error', message: '이메일 인증 요청 중 오류가 발생했습니다.' });
      setButtonVariant('primary'); // ❗ 실패한 경우 primary로 복구
    }
  };

  // value나 validation 상태가 변경될 때마다 버튼 상태 업데이트
  useEffect(() => {
    if (value === '' || validation.type === 'error') {
      setButtonVariant('disabled');
    } else if (validation.type === 'success') {
      setButtonVariant('disabled'); // ✅ 성공한 경우에도 disabled 유지!
    } else {
      setButtonVariant('primary');
    }
  }, [value, validation]);

  return (
    <InputField
      type="text"
      id="email"
      label="이메일 인증"
      placeholder="이메일을 입력해 주세요"
      variant={buttonVariant}
      buttonText="인증요청"
      value={value}
      onChange={handleChange}
      validationMessages={validation}
      onClick={handleEmailCheck}
    />
  );
}

export default EmailInput;

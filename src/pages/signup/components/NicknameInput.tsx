import { getNicknameAvailability } from '@/apis/user';
import InputField from '@/components/InputField';
import SpinLoading from '@/components/loading/SpinLoading';
import { NICKNAME_REGEX } from '@/constants';
import { useState } from 'react';

interface ValidationResult {
  type: 'success' | 'error' | ''; // 유효성 검사 결과 타입
  message: string; // 에러 메시지 또는 성공 메시지
}

interface NicknameInputProps {
  value: string;
  setValue: (val: string) => void;
  validation: ValidationResult;
  setValidation: (validation: ValidationResult) => void;
}

function NicknameInput({ value, setValue, validation, setValidation }: NicknameInputProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false); // 로딩 UI 표시 여부

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    const validationResult = handleValidation(newValue);
    setValidation(validationResult);
  };

  // 유효성 검사
  const handleValidation = (value: string): ValidationResult => {
    if (value.length < 2 || value.length > 7) {
      return {
        type: 'error',
        message: '닉네임은 2~7자 사이로 입력해야 합니다',
      };
    }

    if (!NICKNAME_REGEX.test(value)) {
      return {
        type: 'error',
        message:
          '닉네임에는 영어, 한글, 숫자만 사용할 수 있으며, 공백 및 특수문자는 허용되지 않습니다',
      };
    }

    return { type: '', message: '' };
  };
  // 닉네임 중복을 확인하는 함수
  const handleNicknameCheck = async () => {
    try {
      setIsLoading(true);

      // 0.1초 뒤에 showLoading 활성화
      const loadingTimeout = setTimeout(() => {
        setShowLoading(true);
      }, 100);

      const { code } = await getNicknameAvailability(value);

      clearTimeout(loadingTimeout); // 불필요한 타이머 제거
      setIsLoading(false);
      setShowLoading(false); // 로딩 UI 숨기기

      if (code === 200) {
        setValidation({ type: 'success', message: '사용 가능한 닉네임입니다' });
      } else if (code === 409) {
        setValidation({ type: 'error', message: '이미 사용 중인 닉네임입니다' });
      }
    } catch (error) {
      setValidation({ type: 'error', message: '예기치 않은 오류가 발생했습니다' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderButtonContent = () => {
    if (showLoading) {
      return <SpinLoading />;
    } else return <span>중복확인</span>;
  };

  return (
    <InputField
      type="text"
      id="nickname"
      label="닉네임"
      placeholder="닉네임을 입력해 주세요"
      variant={value === '' || validation.type === 'error' ? 'disabled' : 'primary'}
      buttonText={renderButtonContent()}
      value={value}
      onChange={handleChange}
      validationMessages={validation}
      onClick={handleNicknameCheck}
      disabled={isLoading ? true : false}
    />
  );
}

export default NicknameInput;

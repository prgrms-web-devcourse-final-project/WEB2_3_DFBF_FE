import { getIdAvailability } from '@/apis/user';
import InputField from '@/components/InputField';
import { ID_REGEX } from '@/constants';
import React, { useEffect, useState } from 'react';

type ButtonType = 'primary' | 'secondary' | 'disabled';
interface ValidationResult {
  type: 'success' | 'error' | ''; // 유효성 검사 결과 타입
  message: string; // 에러 메시지 또는 성공 메시지
}

interface IdInputProps {
  value: string;
  setValue: (val: string) => void;
  validation: ValidationResult;
  setValidation: (validation: ValidationResult) => void;
}

function IdInput({ value, setValue, validation, setValidation }: IdInputProps) {
  const [buttonVariant, setButtonVariant] = useState<ButtonType>('disabled'); // 버튼 상태를 관리하는 state 추가
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    const validationResult = handleValidation(newValue);
    setValidation(validationResult);
  };

  const handleValidation = (value: string): ValidationResult => {
    if (!ID_REGEX.test(value)) {
      return {
        type: 'error',
        message: '아이디는 5~20자의 영문과 숫자로만 구성해야 합니다',
      };
    }
    return { type: '', message: '' };
  };

  useEffect(() => {
    if (value.length > 0 && ID_REGEX.test(value)) {
      setButtonVariant('primary');
    } else {
      setButtonVariant('disabled');
    }
  }, [value]);

  // 아이디 중복을 확인하는 함수
  const handleIdCheck = async () => {
    try {
      const { code } = await getIdAvailability(value);
      if (code === 200) {
        setValidation({ type: 'success', message: '사용 가능한 아이디입니다' });
      } else if (code === 409) {
        setValidation({ type: 'error', message: '이미 사용 중인 아이디입니다' });
      }
    } catch (error) {
      setValidation({ type: 'error', message: '예기치 않은 오류가 발생했습니다' });
    }
  };
  return (
    <InputField
      type="text"
      id="id"
      label="아이디"
      placeholder="아이디를 입력해 주세요"
      variant={buttonVariant}
      buttonText="중복확인"
      value={value}
      onChange={handleChange}
      validationMessages={validation}
      onClick={handleIdCheck}
    />
  );
}

export default IdInput;

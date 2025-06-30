import { getNicknameAvailability } from '@/apis/user';
import LoadingSpinnerButton from '@/components/button/LoadingSpinnerButton';
import InputField from '@/components/InputField';
import { MAX_NICKNAME_LENGTH, MIN_NICKNAME_LENGTH, NICKNAME_REGEX } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface NicknameInputProps {
  initialText?: string; // 초기값
  changeFormNickname: (val: string) => void;
  setValidity: (val: boolean) => void;
}

function NicknameInput({ initialText = '', changeFormNickname, setValidity }: NicknameInputProps) {
  const [text, setText] = useState('');
  const [validationStatus, setValidationStatus] = useState({
    isValid: false, // 유효성 통과여부
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    changeFormNickname(value); // form id 업데이트
    setValidity(false); // form validity 초기화

    // 유효성 검사

    if (value.length < MIN_NICKNAME_LENGTH || value.length > MAX_NICKNAME_LENGTH) {
      return setValidationStatus({
        isValid: false,
        message: '닉네임은 2~7자 사이로 입력해야 합니다',
      });
    }
    if (!NICKNAME_REGEX.test(value)) {
      setValidationStatus({
        isValid: false,
        message:
          '닉네임에는 영어, 한글, 숫자만 사용할 수 있으며, 공백 및 특수문자는 허용되지 않습니다',
      });
    } else {
      setValidationStatus({ isValid: true, message: '' });
    }
  };
  // 닉네임 중복을 확인하는 함수
  const { mutate, isPending } = useMutation({
    mutationFn: () => getNicknameAvailability(text),
    onSuccess: (data) => {
      if (data.code === 200) {
        setValidationStatus({ isValid: true, message: '사용 가능한 닉네임입니다' });
        setValidity(true);
      } else if (data.code === 409) {
        setValidationStatus({ isValid: false, message: '이미 사용 중인 닉네임입니다' });
      }
    },
    onError: () => {
      setValidationStatus({
        isValid: false,
        message: '예기치 않은 오류가 발생했습니다. 다시 시도해주세요',
      });
    },
  });

  // initialText가 변경되면 text 상태를 업데이트
  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  return (
    <InputField
      id="nickname"
      label="닉네임"
      placeholder="닉네임을 입력해 주세요"
      onChange={handleChange}
      message={validationStatus.message}
      isValid={validationStatus.isValid}
      actionButton={
        <LoadingSpinnerButton
          isLoading={isPending}
          className="w-[65px]"
          text="중복확인"
          disabled={!validationStatus.isValid}
          onClick={() => mutate()}
        />
      }
    />
  );
}

export default NicknameInput;

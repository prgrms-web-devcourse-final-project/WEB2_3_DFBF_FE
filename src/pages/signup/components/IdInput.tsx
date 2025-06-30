import { getIdAvailability } from '@/apis/user';
import LoadingSpinnerButton from '@/components/button/LoadingSpinnerButton';
import InputField from '@/components/input/InputField';
import { ID_REGEX } from '@/constants';
import { useModalStore } from '@/store/modalStore';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

interface IdInputProps {
  changeFormID: (val: string) => void;
  setValidity: (val: boolean) => void;
}
const IdInput = ({ changeFormID, setValidity }: IdInputProps) => {
  const { openModal, closeModal } = useModalStore(); // 모달
  const [text, setText] = useState('');
  const [validationStatus, setValidationStatus] = useState({
    isValid: false, // 유효성 통과여부
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    changeFormID(value); // form id 업데이트
    setValidity(false); // form validity 초기화

    if (ID_REGEX.test(value)) {
      setValidationStatus({ isValid: true, message: '' });
    } else {
      setValidationStatus({
        isValid: false,
        message: '아이디는 5~20자의 영문과 숫자로만 구성해야 합니다',
      });
    }
  };

  // 아이디 중복 확인 API 호출
  const { isPending, mutate } = useMutation({
    mutationFn: () => getIdAvailability(text),
    onSuccess: (data) => {
      if (data.code === 200) {
        setValidationStatus({ isValid: true, message: '사용 가능한 아이디입니다' });
        setValidity(true);
      } else if (data.code === 409) {
        setValidationStatus({ isValid: false, message: '이미 사용 중인 아이디입니다' });
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
  // console.log('새로운 mutate', mutate);
  return (
    <InputField
      id="id"
      label="아이디"
      placeholder="아이디를 입력해 주세요"
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
};

export default IdInput;

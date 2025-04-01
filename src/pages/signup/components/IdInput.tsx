import { getIdAvailability } from '@/apis/user';
import InputField from '@/components/InputField';
import { ID_REGEX } from '@/constants';
import { useModalStore } from '@/store/modalStore';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

interface IdInputProps {
  changeFormID: (val: string) => void;
  setValidity: (val: boolean) => void;
  initialText?: string;
  initialMessage?: string;
}
const IdInput = ({
  changeFormID,
  setValidity,
  initialText = '',
  initialMessage = '',
}: IdInputProps) => {
  const { openModal, closeModal } = useModalStore(); // 모달
  const [text, setText] = useState(initialText);
  const [validationMessage, setValidationMessage] = useState({
    success: false,
    message: initialMessage,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    changeFormID(value); // form id 업데이트
    setValidity(false); // form validity 초기화

    // 유효성 검사
    const isValid = ID_REGEX.test(value);

    if (isValid) {
      setValidationMessage({ success: true, message: '' });
    } else {
      setValidationMessage({
        success: false,
        message: '아이디는 5~20자의 영문과 숫자로만 구성해야 합니다',
      });
    }
  };

  // 아이디 중복 확인 API 호출
  const { isPending, mutate } = useMutation({
    mutationFn: () => getIdAvailability(text),
    onSuccess: (data) => {
      if (data.code === 200) {
        setValidationMessage({ success: true, message: '사용 가능한 아이디입니다' });
        setValidity(true);
      } else if (data.code === 409) {
        setValidationMessage({ success: false, message: '이미 사용 중인 아이디입니다' });
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

  // 버튼 props
  const buttonHandler = {
    buttonEnabled: validationMessage.success,
    buttonText: '중복확인',
    isPending: isPending,
    onClick: mutate,
  };

  return (
    <InputField
      id="id"
      label="아이디"
      placeholder="아이디를 입력해 주세요"
      value={text}
      onChange={handleChange}
      isValid={validationMessage.success} // ✅ 유효성 검사 여부 전달
      validationMessage={validationMessage.message} // ✅ 메시지 전달
      buttonHandler={buttonHandler}
    />
  );
};

export default IdInput;

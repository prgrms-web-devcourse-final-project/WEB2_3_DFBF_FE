import { useEffect, useState } from 'react';

interface useValidationWithButtonProps {
  validity: boolean; // 유효성
  setValidity: (val: boolean) => void; // 유효성 변경 함수
  handleValidationMessage: (val: string) => { success: boolean; message: string }; // 유효성 메시지 관리하는 함수
  REGEX: RegExp; // 정규표현식
  initialMessage?: string; // 선택적 초기 메시지
  initialText?: string; // 기본값 설정
}

// 유효성 검사와 버튼 상태를 함께 관리하는 훅
export const useValidationWithButton = ({
  validity,
  setValidity,
  handleValidationMessage,
  REGEX,
  initialMessage = '', // 기본값 설정
  initialText = '', // 기본값 설정
}: useValidationWithButtonProps) => {
  const [text, setText] = useState(initialText);
  const [validationMessage, setValidationMessage] = useState({
    success: false,
    message: initialMessage,
  });
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    const validationResult = handleValidationMessage(e.target.value);
    setValidationMessage(validationResult);
  };

  useEffect(() => {
    // 유효성이 true가 되었을때, text를 변경하면 다시 validity을 false로 만든다.
    if (validity) {
      setValidity(false);
    }
    // 정규 표현식에 따라서 버튼 달리하기
    if (REGEX.test(text)) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  }, [text]);

  // 초기값 로직 수정
  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  return {
    text,
    setText,
    validationMessage,
    setValidationMessage,
    buttonEnabled,
    handleChange,
    setButtonEnabled,
  };
};

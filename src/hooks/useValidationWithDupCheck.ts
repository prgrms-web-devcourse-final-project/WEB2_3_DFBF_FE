import { useEffect, useState } from 'react';

export const useValidationWithDupCheck = (
  validity: boolean,
  setValidity: (val: boolean) => void,
  handleValidation: (val: string) => { success: boolean; message: string },
  REGEX: RegExp,
) => {
  const [text, setText] = useState('');
  const [validationMessage, setValidationMessage] = useState({ success: false, message: '' });
  const [buttonVariant, setButtonVariant] = useState<'primary' | 'disabled'>('disabled');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    const validationResult = handleValidation(e.target.value);
    setValidationMessage(validationResult);
  };

  useEffect(() => {
    // 중복확인을 눌러서 validity이 true가 되었을때, text를 변경하면 다시 validity을 false로 만든다.
    if (validity) {
      setValidity(false);
    }

    if (REGEX.test(text)) {
      setButtonVariant('primary');
    } else {
      setButtonVariant('disabled');
    }
  }, [text]);

  return { text, setText, validationMessage, setValidationMessage, buttonVariant, handleChange };
};

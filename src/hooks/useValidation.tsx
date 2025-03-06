import { useState } from 'react';

export const useValidation = (
  handleValidation: (val: string) => { success: boolean; message: string },
) => {
  const [text, setText] = useState('');
  const [validationMessage, setValidationMessage] = useState({ success: false, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(text);
    setText(e.target.value);
    const validationResult = handleValidation(e.target.value);
    setValidationMessage(validationResult);
  };

  return { text, setText, validationMessage, handleChange };
};

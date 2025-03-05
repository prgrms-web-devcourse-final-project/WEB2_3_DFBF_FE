import { getIdAvailability } from '@/apis/user';
import InputField from '@/components/InputField';
import SpinLoading from '@/components/loading/SpinLoading';
import { ID_REGEX } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

type ButtonType = 'primary' | 'disabled';

interface IdInputProps {
  setValue: (val: string) => void;
}

function IdInput({ setValue }: IdInputProps) {
  const [text, setText] = useState('');
  const [validation, setValidation] = useState({ success: false, message: '' });
  const [buttonVariant, setButtonVariant] = useState<ButtonType>('disabled'); // 버튼 상태를 관리하는 state 추가

  const { mutate, isPending } = useMutation({
    mutationFn: () => getIdAvailability(text),
    onSuccess: (data) => {
      if (data.code === 200) {
        setValidation({ success: true, message: '사용 가능한 아이디입니다' });
        setValue(text);
      } else if (data.code === 409) {
        setValidation({ success: false, message: '이미 사용 중인 아이디입니다' });
      }
    },
    onError: () => {
      setValidation({
        success: false,
        message: '예기치 않은 오류가 발생했습니다. 다시 시도해주세요',
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setText(newValue);

    const validationResult = handleValidation(newValue);
    setValidation(validationResult);
  };

  const handleValidation = (value: string) => {
    if (!ID_REGEX.test(value)) {
      return { success: false, message: '아이디는 5~20자의 영문과 숫자로만 구성해야 합니다' };
    }
    return { success: false, message: '' };
  };

  useEffect(() => {
    if (ID_REGEX.test(text)) {
      setButtonVariant('primary');
    } else {
      setButtonVariant('disabled');
    }
  }, [text]);

  // 아이디 중복을 확인하는 함수
  // const handleIdCheck = async () => {
  //   try {
  //     setIsLoading(true);
  //     const { code } = await getIdAvailability(value);
  //     if (code === 200) {
  //       setValidation({ success: true, message: '사용 가능한 아이디입니다' });
  //     } else if (code === 409) {
  //       setValidation({ success: false, message: '이미 사용 중인 아이디입니다' });
  //     }
  //   } catch (error) {
  //     setValidation({
  //       success: false,
  //       message: '예기치 않은 오류가 발생했습니다. 다시 시도해주세요',
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const renderButtonContent = () => {
    if (isPending) {
      return <SpinLoading />;
    } else return <span>중복확인</span>;
  };

  return (
    <InputField
      type="text"
      id="id"
      label="아이디"
      placeholder="아이디를 입력해 주세요"
      variant={buttonVariant}
      buttonText={renderButtonContent()}
      value={text}
      onChange={handleChange}
      validationMessage={validation}
      onClick={() => mutate()}
    />
  );
}

export default IdInput;

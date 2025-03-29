import { getIdAvailability } from '@/apis/user';
import { useMutation } from '@tanstack/react-query';

export const useIdAvailability = (
  text: string,
  setValue: (val: string) => void,
  setValidity: (val: boolean) => void,
  setValidation: (val: { success: boolean; message: string }) => void,
) => {
  return useMutation({
    mutationFn: () => getIdAvailability(text),
    onSuccess: (data) => {
      if (data.code === 200) {
        setValidation({ success: true, message: '사용 가능한 아이디입니다' });
        setValue(text);
        setValidity(true);
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
};

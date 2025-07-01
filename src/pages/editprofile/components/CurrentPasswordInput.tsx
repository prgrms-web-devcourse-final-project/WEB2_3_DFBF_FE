import { InputField } from '@/components/input';

interface CurrentPasswordInputPros {
  setValidity: (val: boolean) => void;
}

function CurrentPasswordInput({ setValidity }: CurrentPasswordInputPros) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidity(e.target.value.length > 0);
  };
  return (
    <InputField
      type="password"
      id="current-password"
      name="current-password"
      onChange={handleChange}
      label="현재 비밀번호"
      placeholder="현재 비밀번호을 입력해 주세요"
    />
  );
}

export default CurrentPasswordInput;

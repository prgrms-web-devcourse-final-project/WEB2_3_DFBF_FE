import { InputField } from '@/components/input';

interface CurrentPasswordInputPros {
  onChange: (val: string) => void;
}

function CurrentPasswordInput({ onChange }: CurrentPasswordInputPros) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <InputField
      type="password"
      id="current-password"
      onChange={handleChange}
      label="현재 비밀번호"
      placeholder="현재 비밀번호을 입력해 주세요"
    />
  );
}

export default CurrentPasswordInput;

import Button from '@/components/Button';
import Input, { InputProps } from '@/components/Input';

// 버튼 타입
interface ButtonProps {
  buttonText?: string;
  type?: 'primary' | 'secondary' | 'disabled';
  onClick?: () => void;
}

type ButtonInputProps = InputProps & ButtonProps;

export default function ButtonInput({
  id = 'nickname',
  label = '닉네임',
  isValid = false,
  errorMessage = '중복된 닉네임입니다',
  placeholder = '닉네임을 입력해 주세요',
  buttonText = '중복확인',
  type = 'primary',
  onClick,
  ...props
}: ButtonInputProps) {
  return (
    <div className="flex gap-2 items-end">
      <Input
        id={id}
        label={label}
        isValid={isValid}
        errorMessage={errorMessage}
        type="text"
        placeholder={placeholder}
        className="bg-white"
        {...props}
      />
      <Button type={type} className="w-[65px] flex-shrink-0" onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  );
}

// 사용 예시
{
  /* <ButtonInput
  id="userNickname"
  label="사용자 닉네임"
  isValid={false}
  errorMessage="닉네임이 중복되었습니다."
  placeholder="닉네임을 입력하세요"
  buttonText="중복 확인"
  type="secondary"
  onClick={() => console.log('닉네임 중복 확인 버튼 클릭!')}
/>; */
}

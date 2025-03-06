import Button from '@/components/Button';
import Input from '@/components/Input';
import { twMerge } from 'tailwind-merge';

//id, label 필수
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  className?: string;
  isValid?: boolean;
  validationMessage?: string; // 띄울 메세지
}
interface ButtonProps {
  buttonText?: string | React.ReactNode;
  variant?: 'primary' | 'secondary' | 'disabled';
  onClick?: () => void;
}

export default function InputField({
  id,
  label,
  className,
  buttonText,
  variant,
  onClick,
  isValid,
  validationMessage,
  ...props
}: InputFieldProps & ButtonProps) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="body-r text-gray-80 ml-[5px] mb-0.5">
        {label}
      </label>
      <div className="flex gap-2">
        <Input id={id} {...props} />
        {buttonText && (
          <Button
            variant={variant}
            className="w-[65px] flex-shrink-0"
            onClick={onClick}
            type="button"
          >
            {buttonText}
          </Button>
        )}
      </div>
      <div className="flex items-center h-5">
        {validationMessage !== '' && (
          <p
            className={twMerge(
              'text-functional-danger text-[9px]/[18px] ml-[5px]',
              isValid ? 'text-functional-success' : 'text-functional-danger',
            )}
          >
            {validationMessage}
          </p>
        )}
      </div>
    </div>
  );
}

//사용 예시
{
  // <InputField
  //   type="text"
  //   id="nickname"
  //   label="닉네임"
  //   placeholder="닉네임을 입력해 주세요"
  //   errorMessage="닉네임 중복"
  //   variant="primary"
  //   buttonText="중복확인"
  // />
}

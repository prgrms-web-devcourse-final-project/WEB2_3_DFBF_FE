import LoadingSpinnerButton from '@/components/button/LoadingSpinnerButton';
import Input from '@/components/Input';
import { twMerge } from 'tailwind-merge';

type ButtonHandler = {
  buttonEnabled: boolean;
  buttonText: string;
  isPending: boolean;
  onClick: () => void;
};

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  isValid?: boolean;
  validationMessage?: string;
  buttonHandler?: ButtonHandler;
}

export default function InputField({
  id,
  label,
  isValid,
  validationMessage,
  buttonHandler,
  ...props
}: InputFieldProps) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="body-r text-gray-80 ml-[5px] mb-0.5">
        {label}
      </label>
      <div className="flex gap-2">
        <Input id={id} {...props} />
        {buttonHandler && (
          <LoadingSpinnerButton
            buttonEnabled={buttonHandler.buttonEnabled}
            buttonText={buttonHandler.buttonText}
            isPending={buttonHandler.isPending}
            className="w-[65px] flex-shrink-0"
            onClick={buttonHandler.onClick}
            type="button"
          />
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

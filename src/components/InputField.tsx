import Input from '@/components/Input';
import { twMerge } from 'tailwind-merge';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  isValid?: boolean;
  message?: string;
  actionButton?: React.ReactNode;
}

export default function InputField({
  id,
  label,
  isValid,
  message,
  actionButton,
  ...props
}: InputFieldProps) {
  return (
    <div className="flex flex-col w-full gap-0.5">
      {/* 라벨 */}
      <label htmlFor={id} className="body-r text-gray-80 pl-[5px]">
        {label}
      </label>

      {/* 입력 필드 + 버튼 */}
      <div className="flex gap-2">
        <Input id={id} {...props} />
        {actionButton && <div className="shrink-0">{actionButton}</div>}
      </div>

      {/* 유효성 검사 메시지 */}
      <div className="flex items-center h-[18px]">
        {message && (
          <p
            className={twMerge(
              'text-[9px]/[18px] pl-[5px]',
              isValid ? 'text-functional-success' : 'text-functional-danger',
            )}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

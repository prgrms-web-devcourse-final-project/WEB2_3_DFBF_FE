import Button from '@/components/Button';
import CountdownTimer from '@/components/CountdownTimer';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type ValidationMessage = {
  type: 'success' | 'error' | 'default';
  message: string;
};

interface InputAuthCodeProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  className?: string;
  messages: ValidationMessage; // 띄울 메시지
  emailSent: boolean;
  onTimeout?: () => void; // 시간이 만료되었을 때 실행할 함수
  onResendEmail?: () => void; // 재전송 함수
  resendCount: number; // 재전송 횟수

  // ✅ 버튼 관련 속성 추가
  buttonText: string | React.ReactNode;
  variant: 'primary' | 'secondary' | 'disabled';
  onClick: () => void;
  onButtonClick?: () => void;
}

function InputAuthCode({
  id,
  label,
  className,
  buttonText,
  variant,
  onClick,
  messages,
  emailSent,
  resendCount,
  onTimeout,
  onResendEmail,
  ...props
}: InputAuthCodeProps) {
  const colorMap = {
    success: 'text-functional-success',
    error: 'text-functional-danger',
    default: 'text-gray-60',
  };

  const messageColor = colorMap[messages.type];

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="body-r text-gray-80 ml-[5px] mb-0.5">
        {label}
      </label>
      <div className="flex gap-2">
        <div className="w-full h-[38px] rounded-lg input-shadow outline-0 px-3 caption-m placeholder:text-gray-50 focus-within:ring-1 focus-within:ring-primary-active bg-white flex items-center">
          <input id={id} type="text" className="w-full " {...props} />
          {emailSent && messages?.type !== 'success' && (
            <CountdownTimer key={resendCount} onTimeout={onTimeout} />
          )}
        </div>
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
        {emailSent && (
          <div className="flex gap-2">
            <p
              className={twMerge('text-functional-danger text-[9px]/[18px] ml-[5px]', messageColor)}
            >
              {messages?.message}
            </p>
            {messages.type !== 'success' && (
              <div className="flex gap-1 items-center text-gray-60 text-[9px]">
                <button className="underline cursor-pointer" onClick={onResendEmail}>
                  재전송
                </button>
                <span>({resendCount}/3)</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default InputAuthCode;

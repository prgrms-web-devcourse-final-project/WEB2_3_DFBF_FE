import LoadingSpinnerButton from '@/components/button/LoadingSpinnerButton';
import CountdownTimer from '@/components/CountdownTimer';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonHandler = {
  buttonEnabled: boolean;
  buttonText: string;
  isPending: boolean;
  onClick: () => void;
};

interface InputAuthCodeProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  isValid: boolean;
  validationMessage: string; // 띄울 메세지
  emailSent: boolean;
  onTimeout?: () => void; // 시간이 만료되었을 때 실행할 함수
  onResendEmail?: () => void; // 재전송 함수
  resendCount: number; // 재전송 횟수

  // ✅ 버튼 관련 속성 추가
  buttonHandler?: ButtonHandler;
  onButtonClick?: () => void;
}

function InputAuthCode({
  id,
  label,
  isValid,
  disabled,
  value,
  validationMessage,
  emailSent,
  resendCount,
  onTimeout,
  onResendEmail,
  buttonHandler,
  ...props
}: InputAuthCodeProps) {
  // 메세지 색 선택 로직
  const getMessageColor = (value: string, isValid: boolean) => {
    if (!value) return 'text-gray-60';
    return isValid ? 'text-functional-success' : 'text-functional-danger';
  };

  const messageColor = getMessageColor(value as string, isValid);

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="body-r text-gray-80 ml-[5px] mb-0.5">
        {label}
      </label>
      <div className="flex gap-2">
        <div className="w-full h-[38px] rounded-lg input-shadow outline-0 px-3 caption-m placeholder:text-gray-50 focus-within:ring-1 focus-within:ring-primary-active bg-white flex items-center">
          <input
            id={id}
            type="text"
            className="w-full "
            value={value}
            disabled={disabled}
            {...props}
          />
          {emailSent && !isValid && <CountdownTimer key={resendCount} onTimeout={onTimeout} />}
        </div>
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
        {emailSent && (
          <div className="flex gap-2">
            <p
              className={twMerge('text-functional-danger text-[9px]/[18px] ml-[5px]', messageColor)}
            >
              {validationMessage}
            </p>
            {value === '' && (
              <div className="flex gap-1 items-center text-gray-60 text-[9px]">
                <button className="underline cursor-pointer" onClick={onResendEmail} type="button">
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

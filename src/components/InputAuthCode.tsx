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
  onTimeout?: () => void; // 시간이 만료되었을 때 실행할 함수
  onResendEmail?: () => void; // 재전송 함수
  resendCount: number; // 재전송 횟수
  authcodeValidity: boolean; // 인증코드 유효성

  // ✅ 버튼 관련 속성 추가
  buttonHandler: ButtonHandler;
}

function InputAuthCode({
  id,
  label,
  isValid,
  value,
  validationMessage,
  resendCount,
  onTimeout,
  onResendEmail,
  authcodeValidity,
  buttonHandler,
  ...props
}: InputAuthCodeProps) {
  // 메세지 색 선택 로직
  const getMessageColor = (isValid: boolean) =>
    isValid ? 'text-functional-success' : 'text-functional-danger';

  const messageColor = value ? getMessageColor(isValid) : 'text-gray-60';

  return (
    <div className="flex flex-col w-full">
      {/* 라벨 */}
      <label htmlFor={id} className="body-r text-gray-80 ml-[5px] mb-0.5">
        {label}
      </label>

      {/* 입력 필드와 버튼 */}
      <div className="flex gap-2">
        <div className="w-full h-[38px] rounded-lg input-shadow outline-0 px-3 caption-m placeholder:text-gray-50 focus-within:ring-1 focus-within:ring-primary-active bg-white flex items-center">
          <input id={id} className="w-full " value={value} disabled={authcodeValidity} {...props} />
          {!authcodeValidity && <CountdownTimer key={resendCount} onTimeout={onTimeout} />}
        </div>
        <LoadingSpinnerButton {...buttonHandler} className="w-[65px] flex-shrink-0" type="button" />
      </div>

      {/* 메시지 및 재전송 버튼 */}
      <div className="flex items-center h-5">
        <div className="flex gap-2">
          <p className={twMerge('text-functional-danger text-[9px]/[18px] ml-[5px]', messageColor)}>
            {validationMessage}
          </p>
          {!value && (
            <div className="flex gap-1 items-center text-gray-60 text-[9px]">
              <button className="underline cursor-pointer" onClick={onResendEmail} type="button">
                재전송
              </button>
              <span>({resendCount}/3)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InputAuthCode;

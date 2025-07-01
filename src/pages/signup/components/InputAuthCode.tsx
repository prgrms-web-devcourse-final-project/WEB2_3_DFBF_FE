import { CountdownTimer } from '@/pages/signup/components/';
import { twMerge } from 'tailwind-merge';

interface InputAuthCodeProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  isValid: boolean;
  message: string; // 띄울 메세지
  onTimeout?: () => void; // 시간이 만료되었을 때 실행할 함수
  onResendEmail?: () => void; // 재전송 함수
  resendCount: number; // 재전송 횟수
  isEmailVerified: boolean; // 이메일 인증 여부
  actionButton: React.ReactNode;
}

function InputAuthCode({
  id,
  label,
  isValid,
  value,
  message,
  resendCount,
  onTimeout,
  onResendEmail,
  isEmailVerified,
  actionButton,
  ...props
}: InputAuthCodeProps) {
  // 메세지 색 선택 로직
  const getMessageColor = () => {
    if (message === '인증 시간이 만료되었습니다. 다시 요청해주세요.')
      return 'text-functional-information';
    if (!value) return 'text-gray-60';
    return isValid ? 'text-functional-success' : 'text-functional-danger';
  };

  return (
    <div className="flex flex-col w-full">
      {/* 라벨 */}
      <label htmlFor={id} className="body-r text-gray-80 ml-[5px] mb-0.5">
        {label}
      </label>

      {/* 입력 필드와 버튼 */}
      <div className="flex gap-2">
        <div className="w-full h-[38px] rounded-lg input-shadow outline-0 px-3 caption-m placeholder:text-gray-50 focus-within:ring-1 focus-within:ring-primary-active bg-white flex items-center">
          <input id={id} className="w-full" disabled={isEmailVerified} {...props} />
          {!isEmailVerified && <CountdownTimer key={resendCount} onTimeout={onTimeout} />}
        </div>
        {actionButton}
      </div>

      {/* 메시지 및 재전송 버튼 */}
      <div className="flex items-center h-5">
        <div className="flex gap-2">
          <p className={twMerge('text-[9px]/[18px] ml-[5px]', getMessageColor())}>{message}</p>
          {value === '' && (
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

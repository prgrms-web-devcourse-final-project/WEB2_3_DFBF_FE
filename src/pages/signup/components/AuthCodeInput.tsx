import { postEmailVerificationCheck, postEmailVerificationRequest } from '@/apis/email';
import InputAuthCode from '@/components/InputAuthCode';
import SpinLoading from '@/components/loading/SpinLoading';
import { MAX_RESEND_COUNT } from '@/constants/email';
import { useEffect, useState } from 'react';

type ButtonType = 'primary' | 'secondary' | 'disabled';

type MessageType = {
  type: 'success' | 'error' | 'default';
  message: string;
};
interface ValidationResult {
  type: 'success' | 'error' | ''; // 유효성 검사 결과 타입
  message: string; // 에러 메시지 또는 성공 메시지
}

interface AuthCodeInputProps {
  emailSent: boolean;
  email: string;
  setValidation: (validation: ValidationResult) => void;
}
function AuthCodeInput({ emailSent, email, setValidation }: AuthCodeInputProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false); // 로딩 UI 표시 여부

  const [authCode, setAuthCode] = useState(''); // 인증코드
  const [resendCount, setResendCount] = useState(0); // 재전송 횟수
  const [buttonVariant, setButtonVariant] = useState<ButtonType>('disabled'); // 버튼 상태를 관리하는 state 추가

  const [message, setMessage] = useState<MessageType>({
    type: 'default',
    message: '인증번호가 오지 않았나요?',
  });

  // emailSent 값이 변경될 때 버튼 상태 업데이트
  useEffect(() => {
    if (emailSent && authCode.length !== 0) {
      setButtonVariant('primary');
    } else {
      setButtonVariant('disabled');
    }
  }, [emailSent, authCode]);

  // 이메일과 인증코드들 확인하는 함수
  const handleEmailVerificationCheck = async () => {
    try {
      setIsLoading(true);

      // 0.1초 뒤에 showLoading 활성화
      const loadingTimeout = setTimeout(() => {
        setShowLoading(true);
      }, 100);

      const { code } = await postEmailVerificationCheck(email, authCode);

      clearTimeout(loadingTimeout); // 불필요한 타이머 제거
      setIsLoading(false);
      setShowLoading(false); // 로딩 UI 숨기기

      if (code === 200) {
        setMessage({ type: 'success', message: '이메일 인증이 완료되었습니다' });
        setButtonVariant('disabled');
        setValidation({ type: 'success', message: '' }); // 완료 처리
      } else {
        setMessage({ type: 'error', message: '인증 코드가 올바르지 않습니다' });
      }
    } catch (error) {
      setMessage({ type: 'error', message: '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' });
    } finally {
      setIsLoading(false);
    }
  };

  // 시간 초과시 실행할 함수
  const onTimeout = () => {
    setMessage({ type: 'error', message: '인증 시간이 만료되었습니다. 다시 요청해주세요.' });
  };

  // 이메일 인증을 요청하는 함수
  const handlePostEmailVerificationRequest = async () => {
    if (resendCount >= MAX_RESEND_COUNT) {
      setMessage({ type: 'error', message: '최대 인증 요청 횟수를 초과했습니다.' });
      return;
    }
    try {
      const { code } = await postEmailVerificationRequest(email);
      if (code === 200) {
        setResendCount((prev) => prev + 1); // 재전송 횟수 증가
        setMessage({
          type: 'default',
          message: '인증번호가 오지 않았나요?',
        });
      }
    } catch (error) {
      setMessage({ type: 'error', message: '이메일 인증 요청 중 오류가 발생했습니다.' });
    }
  };

  const renderButtonContent = () => {
    if (showLoading) {
      return <SpinLoading />;
    } else return <span>인증확인</span>;
  };

  return (
    <InputAuthCode
      type="text"
      id="emailVerificationConfrim"
      label="인증번호 확인"
      placeholder="인증번호 6자리를 입력해 주세요"
      variant={buttonVariant}
      buttonText={renderButtonContent()}
      emailSent={emailSent}
      messages={message}
      value={authCode}
      onChange={(e) => setAuthCode(e.target.value)}
      onClick={handleEmailVerificationCheck}
      onTimeout={onTimeout}
      onResendEmail={handlePostEmailVerificationRequest} // 재전송 요청
      resendCount={resendCount}
      disabled={isLoading ? true : false}
    />
  );
}

export default AuthCodeInput;

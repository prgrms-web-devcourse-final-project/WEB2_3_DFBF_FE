import ErrorFallback from '@/components/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';

const logError = (error: Error, info: React.ErrorInfo) => {
  console.error(error, info);
  // error: 발생한 에러 객체
  // info: 추가 정보 (어떤 컴포넌트에서 발생했는지)
};

export default function MyErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      {children}
    </ErrorBoundary>
  );
}

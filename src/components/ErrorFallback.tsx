import ErrorPage from '@/components/ErrorPage';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  // console.log(error);

  return (
    <ErrorPage
      title="500 Server Error"
      message={['서비스 이용에 불편을 드려 죄송합니다.', '잠시 후 다시 시도해 주세요.']}
      onClick={resetErrorBoundary}
      buttonText="다시 시도하기"
    />
  );
}

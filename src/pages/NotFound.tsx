import ErrorPage from '@/components/ErrorPage';
import { useNavigate } from 'react-router';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <ErrorPage
      title="404 Not Found"
      message={['페이지를 찾을 수 없어요', '새로운 감정을 발견하러 가볼까요?']}
      onClick={() => navigate('/')}
      buttonText="홈으로 가기"
    />
  );
}

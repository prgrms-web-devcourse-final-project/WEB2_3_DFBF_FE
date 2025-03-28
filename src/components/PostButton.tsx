import postIcon from '@/assets/icons/new-post-icon.svg';
import { useLocation, useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';

export default function PostButton() {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 가져오기
  const hasPostButton = location.pathname === '/home' || location.pathname === '/mypage';

  if (!hasPostButton) return null;
  return (
    <button
      onClick={() => navigate('/post')}
      className={twMerge(
        'fixed bottom-[80px] w-[38px] h-[38px] bg-primary-normal flex items-center justify-center rounded-full select-shadow cursor-pointer',
        'translate-x-[calc(300px-12px-38px)] left-1/2',
        'max-[600px]:translate-x-0 max-[600px]:left-auto max-[600px]:right-3', // 600px 이하일 때
      )}
    >
      <img src={postIcon} alt="글등록" />
    </button>
  );
}

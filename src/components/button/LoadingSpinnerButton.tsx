import Button from '@/components/button/Button';
import SpinLoading from '@/components/loading/SpinLoading';
import useDelayedLoading from '@/hooks/useDelayedLoading';
import { debounce } from 'lodash';

interface LoadingSpinnerButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  isPending: boolean;
  buttonText: string;
  buttonEnabled: boolean;
  onClick: () => void;
}

// 로딩 스피너 있는 버튼
const LoadingSpinnerButton = ({
  isPending,
  buttonText,
  buttonEnabled,
  onClick,
  ...props
}: LoadingSpinnerButtonProps) => {
  const showLoading = useDelayedLoading({ isPending });

  const debouncedClick = debounce(() => {
    onClick();
  }, 500);

  return (
    <Button
      variant={buttonEnabled ? 'primary' : 'disabled'}
      disabled={isPending}
      onClick={debouncedClick}
      {...props}
    >
      {showLoading ? <SpinLoading /> : buttonText}
    </Button>
  );
};

export default LoadingSpinnerButton;

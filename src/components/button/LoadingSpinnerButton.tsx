import Button from '@/components/button/Button';
import SpinLoading from '@/components/loading/SpinLoading';
import useDelayedLoading from '@/hooks/button/useDelayedLoading';

interface LoadingSpinnerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  text: string;
  disabled?: boolean;
}

// 로딩 스피너 있는 버튼
const LoadingSpinnerButton = ({
  isLoading,
  text,
  disabled,
  className,
  ...props
}: LoadingSpinnerButtonProps) => {
  const showLoading = useDelayedLoading({ isLoading });

  const variant = disabled ? 'disabled' : 'primary';

  return (
    <Button variant={variant} disabled={isLoading || disabled} className={className} {...props}>
      {showLoading ? <SpinLoading /> : text}
    </Button>
  );
};

export default LoadingSpinnerButton;

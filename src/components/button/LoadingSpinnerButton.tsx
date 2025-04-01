import Button from '@/components/button/Button';
import SpinLoading from '@/components/loading/SpinLoading';
import useDelayedLoading from '@/hooks/useDelayedLoading';

interface LoadingSpinnerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isPending: boolean; // pending 되었는지 유무
  buttonText: string; // 버튼 text
  buttonEnabled: boolean; // 버튼 활성화 유무
}

// 로딩 스피너 있는 버튼
const LoadingSpinnerButton = ({
  isPending,
  buttonText,
  buttonEnabled,
  ...props
}: LoadingSpinnerButtonProps) => {
  const showLoading = useDelayedLoading({ isPending });

  return (
    <Button variant={buttonEnabled ? 'primary' : 'disabled'} {...props}>
      {showLoading ? <SpinLoading /> : buttonText}
    </Button>
  );
};

export default LoadingSpinnerButton;

import { Button } from '@/components/button';
import { SpinLoading, ErrorShake, Complete } from '@/components/loading';
import useDelayedLoading from '@/hooks/button/useDelayedLoading';
import { cn } from '@/utils';

interface StatusButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  text: string;
  disabled?: boolean;
}

const StatusButton = ({
  isLoading,
  isSuccess,
  isError,
  text,
  disabled,
  className,
  ...props
}: StatusButtonProps) => {
  const showLoading = useDelayedLoading({ isLoading });

  const variant = disabled ? 'disabled' : 'primary';

  const renderContent = () => {
    if (showLoading) return <SpinLoading />;
    if (isSuccess) return <Complete />;
    if (isError) return <ErrorShake />;
    return <span>{text}</span>;
  };

  return (
    <Button
      variant={variant}
      disabled={isLoading || disabled}
      className={cn(className, isError && 'bg-functional-danger')}
      {...props}
    >
      {renderContent()}
    </Button>
  );
};

export default StatusButton;

import Button from '@/components/button/Button';
import Complete from '@/components/loading/Complete';
import ErrorShake from '@/components/loading/ErrorShake';
import SpinLoading from '@/components/loading/SpinLoading';

interface PostSubmitButtonProps {
  mode: 'create' | 'edit';
  isCompletePost: boolean | null;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  onCompletePost: () => void;
}

export default function PostSubmitButton({
  mode,
  isCompletePost,
  isPending,
  isSuccess,
  isError,
  onCompletePost,
}: PostSubmitButtonProps) {
  const renderButtonContent = () => {
    if (isPending) {
      return <SpinLoading />;
    } else if (isSuccess) {
      return <Complete />;
    } else if (isError) {
      return <ErrorShake />;
    } else return mode === 'edit' ? <span>수정 완료</span> : <span>기록 완료</span>;
  };

  return (
    <>
      <Button
        variant={isCompletePost ? 'primary' : 'disabled'}
        className={isError ? 'bg-functional-danger' : ''}
        onClick={onCompletePost}
      >
        {renderButtonContent()}
      </Button>
    </>
  );
}

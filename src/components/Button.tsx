import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'disabled';
  className?: string;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  const buttonStyle = {
    primary: 'bg-primary-normal hover:bg-primary-hover',
    secondary: 'bg-white border border-primary-active text-primary-active hover:bg-gray-5',
    disabled: 'bg-gray-30 cursor-not-allowed',
  };

  return (
    <>
      <button
        className={twMerge(
          'flex justify-center items-center w-full rounded-lg h-[38px] text-white transition body-m cursor-pointer',
          buttonStyle[variant],
          className,
        )}
        disabled={variant === 'disabled'}
        {...props}
      >
        {children}
      </button>
    </>
  );
}

// 사용 예시
// <Button variant="secondary" className="w-40 py-3 text-lg">
//   Secondary 버튼
// </Button>

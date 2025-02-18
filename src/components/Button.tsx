import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'primary' | 'secondary' | 'disabled';
  className?: string;
  onClick?: () => void;
}

export default function Button({ children, type = 'primary', className, onClick }: ButtonProps) {
  const buttonStyle = {
    primary: 'bg-primary-normal hover:bg-primary-hover',
    secondary: 'bg-white border border-primary-active text-primary-active hover:bg-gray-5',
    disabled: 'bg-gray-30 cursor-not-allowed',
  };

  return (
    <>
      <button
        className={twMerge(
          'flex justify-center items-center w-full rounded-lg h-[38px] text-white transition',
          buttonStyle[type],
          className,
        )}
        disabled={type === 'disabled'}
        onClick={type === 'disabled' ? undefined : onClick}
      >
        {children}
      </button>
    </>
  );
}

// 사용 예시
// <Button type="secondary" className="w-40 py-3 text-lg">
//   Secondary 버튼
// </Button>

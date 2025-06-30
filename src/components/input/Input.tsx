import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={twMerge(
        'w-full h-[38px] rounded-lg input-shadow outline-0 px-3 caption-m placeholder:text-gray-50 focus:ring-1 focus:ring-primary-active bg-white',
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;

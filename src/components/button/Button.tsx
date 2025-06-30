import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'disabled';
}

export const buttonVariants = cva(
  'flex justify-center items-center w-full rounded-lg h-[38px] text-white transition body-m cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-primary-normal hover:bg-primary-hover',
        secondary: 'bg-white border border-primary-active text-primary-active hover:bg-gray-5',
        disabled: 'bg-gray-30 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', type = 'button', disabled, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={variant === 'disabled' || disabled}
        className={cn(buttonVariants({ variant }), className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;

import Button from '@/components/Button';
import CountdownTimer from '@/components/CountdownTimer';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type ValidationMessage = {
  type: 'success' | 'error' | '';
  message: string;
};

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  className?: string;
  messages?: ValidationMessage; // 띄울 메세지
  emailSent: boolean;
}
interface ButtonProps {
  buttonText?: string;
  variant?: 'primary' | 'secondary' | 'disabled';
  onClick?: () => void;
}

function InputAuthCode({
  id,
  label,
  className,
  buttonText,
  variant,
  onClick,
  messages,
  emailSent,
  ...props
}: InputFieldProps & ButtonProps) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="body-r text-gray-80 ml-[5px] mb-0.5">
        {label}
      </label>
      <div className="flex gap-2">
        <div className="w-full h-[38px] rounded-lg input-shadow outline-0 px-3 caption-m placeholder:text-gray-50 focus-within:ring-1 focus-within:ring-primary-active bg-white flex items-center">
          <input id={id} type="text" className=" w-full" {...props} />
          {emailSent && <CountdownTimer />}
        </div>
        {buttonText && (
          <Button variant={variant} className="w-[65px] flex-shrink-0" onClick={onClick}>
            {buttonText}
          </Button>
        )}
      </div>
      <div className="flex items-center h-5 border border-red-500">
        <div className="border border-blue-500 flex">
          <p
            className={twMerge(
              'text-functional-danger text-[9px]/[18px] ml-[5px]',
              messages?.type === 'error' ? 'text-functional-danger' : 'text-functional-success',
            )}
          >
            {messages?.message}
          </p>
          <div className=" border-green-500 border flex gap-1 items-center ">
            <button className="text-[9px]">재전송</button>
            <span className="text-[8px]">(0/3)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputAuthCode;

import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  className?: string;
}

function Input({ id, className, ...props }: InputProps) {
  return (
    <input
      id={id}
      className={twMerge(
        'w-full h-[38px] rounded-lg input-shadow outline-0 px-3 caption-m placeholder:text-gray-50 focus:ring-1 focus:ring-primary-active bg-white',
        className, //사용자 정의 스타일
      )}
      {...props} //추가 속성
    />
  );
}

export default Input;

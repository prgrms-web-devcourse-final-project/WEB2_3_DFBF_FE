import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  className?: string;
  isValid?: boolean;
  errorMessage?: string;
}

export default function Input({
  id,
  label,
  className,
  isValid = true,
  errorMessage = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="body-r text-gray-80 ml-[5px]">
        {label}
      </label>
      <input
        id={id}
        className={twMerge(
          "w-full h-[38px] rounded-lg input-shadow outline-0 px-3 caption-m placeholder:text-gray-50 my-[2px]",
          !isValid ? "border-[1.5px] border-primary-active" : "",
          className //사용자 정의 스타일
        )}
        {...props} //추가 속성
      />
      {!isValid && (
        <p className="text-functional-danger text-[9px]/[18px] ml-[5px]">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

//사용 예시
{
  // <Input
  //   type="text"
  //   id="nickname"
  //   label="닉네임"
  //   placeholder="닉네임을 입력해 주세요"
  //   value={nickname}
  //   onChange={(e) => setNickname(e.target.value)}
  //   isValid={false}
  //   errorMessage="닉네임 중복"
  // />
}

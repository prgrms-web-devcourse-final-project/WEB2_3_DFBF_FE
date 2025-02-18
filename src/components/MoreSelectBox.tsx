import { twMerge } from "tailwind-merge";

interface MoreSelectBoxProps {}

export default function MoreSelectBox({}: MoreSelectBoxProps) {
  const items = ["프로필 수정", "로그아웃"];
  return (
    <div className="bg-white select-shadow rounded-lg divide-y-[0.5px] divide-gray-10 absolute top-8 right-1">
      {items.map((item, index) => (
        <button
          key={index}
          className={twMerge(
            "flex justify-center items-center w-full h-[38px] body-m cursor-pointer transition-all whitespace-nowrap px-5 hover:bg-secondary-1 hover:text-primary-active"
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

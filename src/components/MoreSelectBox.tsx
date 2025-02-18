import { twMerge } from 'tailwind-merge';

interface MoreSelectBoxProps {
  items: { label: string; onClick: () => void }[];
}

export default function MoreSelectBox({ items }: MoreSelectBoxProps) {
  const isHeader = items.some((item) => item.label === '로그아웃');

  return (
    <div
      className={twMerge(
        'bg-white select-shadow rounded-lg divide-y-[0.5px] divide-gray-10 absolute top-8 overflow-hidden z-52',
        isHeader ? 'right-4' : 'right-1',
      )}
    >
      {items.map(({ label, onClick }) => (
        <button
          key={label}
          className={twMerge(
            'flex justify-center items-center w-full h-[38px] body-m cursor-pointer transition-all whitespace-nowrap px-5 hover:bg-secondary-1 hover:text-primary-active',
          )}
          onClick={onClick}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

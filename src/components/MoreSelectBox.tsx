import { twMerge } from 'tailwind-merge';

interface MoreSelectBoxProps {
  items: { label: string; onClick: () => void }[];
}

export default function MoreSelectBox({ items }: MoreSelectBoxProps) {
  return (
    <div className="bg-white select-shadow rounded-lg divide-y-[0.5px] divide-gray-10 absolute top-8 right-1 overflow-hidden">
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

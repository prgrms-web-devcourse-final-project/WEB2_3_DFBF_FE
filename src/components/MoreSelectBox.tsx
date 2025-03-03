import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface MoreSelectBoxProps {
  items: { label: string; onClick?: () => void }[];
}

export default function MoreSelectBox({ items }: MoreSelectBoxProps) {
  return (
      <motion.div
        key="more-select-box"
        className="bg-white select-shadow rounded-lg divide-y-[0.5px] divide-gray-10 absolute top-8 right-1 overflow-hidden"
        initial={{ scale: 0.5, opacity: 0 }} // 초기 상태: 투명도 0, 위쪽으로 이동
        animate={{ scale: 1, opacity: 1 }} // 애니메이션: 투명도 1, 원래 위치로
        transition={{ duration: 0.1, ease: 'easeOut' }} // 애니메이션 시간
        style={{ originX: 1, originY: 0 }}
        exit={{ scale: 0.5, opacity: 0 }}
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
      </motion.div>
  );
}

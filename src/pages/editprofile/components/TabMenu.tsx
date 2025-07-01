import { cn } from '@/utils';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface TabMenuProps {
  activeTab: 'profile' | 'password';
  onChange: (tab: 'profile' | 'password') => void;
}

const TabMenu = ({ activeTab, onChange }: TabMenuProps) => {
  const [hoverTab, setHoverTab] = useState<'profile' | 'password' | null>(null);
  const currentTab = hoverTab || activeTab;

  return (
    <div className="relative flex">
      <button
        className={cn('p-3 flex-1 cursor-pointer', activeTab === 'profile' && 'font-bold')}
        onClick={() => onChange('profile')}
        onMouseEnter={() => setHoverTab('profile')}
        onMouseLeave={() => setHoverTab(null)}
      >
        프로필 수정
      </button>
      <button
        className={cn('p-3 flex-1 cursor-pointer', activeTab === 'password' && 'font-bold')}
        onClick={() => onChange('password')}
        onMouseEnter={() => setHoverTab('password')}
        onMouseLeave={() => setHoverTab(null)}
      >
        비밀번호 변경
      </button>
      <motion.div
        layout
        className={twMerge(
          'absolute bottom-0 h-[2px] w-1/2 bg-primary-active transition-all duration-300',
          currentTab === 'profile' ? 'left-0' : 'left-1/2',
        )}
      />
    </div>
  );
};

export default TabMenu;

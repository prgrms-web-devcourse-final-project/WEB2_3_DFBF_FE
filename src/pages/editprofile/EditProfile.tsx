import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TabMenu, ProfileEditForm, PasswordEditForm } from '@/pages/editprofile/components';

function EditProfile() {
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

  return (
    <div className="flex flex-col w-full h-full pt-5 pb-10">
      {/* 탭 메뉴 */}
      <TabMenu activeTab={activeTab} onChange={setActiveTab} />

      {/* 폼 */}
      <AnimatePresence mode="wait">
        <motion.div
          className="h-full w-full"
          key={activeTab} // 핵심! key를 다르게 주면 된다
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'profile' ? <ProfileEditForm /> : <PasswordEditForm />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default EditProfile;

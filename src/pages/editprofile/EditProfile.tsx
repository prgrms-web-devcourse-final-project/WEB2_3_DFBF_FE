import { useState } from 'react';
import ProfileEditForm from '@/pages/editprofile/components/ProfileEditForm';
import PasswordEditForm from '@/pages/editprofile/components/PasswordEditForm';
import { twMerge } from 'tailwind-merge';

function EditProfile() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="flex flex-col w-full pt-5 pb-10">
      {/* 탭 메뉴 */}
      <div className="relative flex">
        <button
          className={`p-3 flex-1 ${activeTab === 'profile' ? 'font-bold' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          프로필 수정
        </button>
        <button
          className={`p-3 flex-1 ${activeTab === 'password' ? 'font-bold' : ''}`}
          onClick={() => setActiveTab('password')}
        >
          비밀번호 변경
        </button>
        <div
          className={twMerge(
            'absolute bottom-0 h-[2px] w-1/2 bg-primary-active transition-all duration-300',
            activeTab === 'profile' ? 'left-0' : 'left-1/2',
          )}
        />
      </div>

      {/* 폼 */}
      {activeTab === 'profile' ? (
        // 프로필 수정 탭
        <ProfileEditForm />
      ) : (
        // 비밀번호 변경 탭
        <PasswordEditForm />
      )}
    </div>
  );
}

export default EditProfile;

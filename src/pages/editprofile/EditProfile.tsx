import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import MusicCard from '@/components/MusicCard';
import { getMyProfile } from '@/apis/user';
import PasswordInput from '../signup/components/PasswordInput';
import PasswordConfirmInput from '../signup/components/PasswordConfirmInput';
import NicknameInput from '../signup/components/NicknameInput';
import { useMusicCardStore } from '@/store/MusicCardStore';
import { useSheetStore } from '@/store/sheetStore';
import _ from 'lodash';

type ValidationMessage = {
  type: 'success' | 'error' | '';
  message: string;
};

interface ValidationMessages {
  currentPassword: ValidationMessage;
  newPassword: ValidationMessage;
  passwordConfirm: ValidationMessage;
  nickname: ValidationMessage;
}

function EditProfile() {
  const { selectedPostMusic, selectPostMusic, clearPostMusic } = useMusicCardStore();
  const [isMusicSelect, setIsMusicSelect] = useState(false);
  const { closeAllSheets } = useSheetStore();

  useEffect(() => {
    if (selectedPostMusic?.spotifyId) {
      setIsMusicSelect(true);
      closeAllSheets();
      console.log('음악 선택됨:', selectedPostMusic);
    } else {
      setIsMusicSelect(false);
    }
  }, [selectedPostMusic]);

  const [prevProfileMusic, setPrevProfileMusic] = useState<ProfileMusic | null>(null);
  const [prevNickname, setPrevNickname] = useState<string>('');
  // const [currentNickname, setCurrentNickname] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');

  const [formData1, setFormData1] = useState({
    nickname: '',
  });
  const [formData2, setFormData2] = useState({
    currentPassword: '',
    newPassword: '',
    passwordConfirm: '',
  });

  const [activeTab, setActiveTab] = useState('profile');

  const [validationMessages, setValidationMessages] = useState<ValidationMessages>({
    currentPassword: { type: '', message: '' },
    newPassword: { type: '', message: '' },
    passwordConfirm: { type: '', message: '' },
    nickname: { type: '', message: '' },
  });

  //노래 이전과 달라진게 없으면 disable
  const isProfileMusicSame = _.isEqual(prevProfileMusic, selectedPostMusic);
  //닉네임 바뀌지 않거나, 바뀌었는데 중복확인이 안되었으면 disable
  const isNicknameSame = _.isEqual(prevNickname, formData1.nickname);
  const isNicknameValid = validationMessages.nickname.type === 'success';
  //disable 조건
  const isDisable = isProfileMusicSame && (isNicknameSame || (!isNicknameSame && !isNicknameValid));

  const validateCurrentPassword = async () => {
    //현재 비밀번호 확인 api
  };

  const handleProfileSubmit = () => {};
  const handlePasswordSubmit = () => {
    // 현재 비밀번호 1자이상/비밀번호, 비밀번호 확인 맞으면 버튼 활성화
    //제출 시 우선 현재 비밀번호 확인.
  };

  useEffect(() => {
    const loadMyProfile = async () => {
      const data = await getMyProfile();
      console.log(data);
      setPrevNickname(data.data.nickname);
      setPrevProfileMusic(data.data.profileMusic);

      setFormData1((prev) => ({
        ...prev,
        nickname: data.data.nickname,
      }));
      selectPostMusic(data.data.profileMusic);
    };
    loadMyProfile();

    return () => {
      clearPostMusic();
    };
  }, []);

  return (
    <div className="flex flex-col w-full pt-5 pb-10">
      {/* 탭 메뉴 */}
      <div className="flex">
        <button
          className={`p-3 flex-1 ${activeTab === 'profile' ? 'border-b-2 border-primary-active font-bold' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          프로필 수정
        </button>
        <button
          className={`p-3 flex-1 ${activeTab === 'password' ? 'border-b-2 border-primary-active font-bold' : ''}`}
          onClick={() => setActiveTab('password')}
        >
          비밀번호 변경
        </button>
      </div>

      {/* 폼 */}
      <form
        className="flex flex-col justify-between h-full p-5"
        onSubmit={(e) => e.preventDefault()}
      >
        {activeTab === 'profile' ? (
          // 프로필 수정 탭
          <>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col items-center w-full">
                <div className="flex justify-between w-[296px] px-1 my-1 body-r text-gray-80">
                  <p>테마곡 설정</p>
                  <button
                    onClick={clearPostMusic}
                    className="border-b border-gray-80 cursor-pointer"
                  >
                    삭제
                  </button>
                </div>
                <MusicCard
                  image={selectedPostMusic?.albumImage}
                  title={selectedPostMusic?.songTitle}
                  artist={selectedPostMusic?.artistName}
                  isMusicSelect={isMusicSelect}
                  buttonContent={isMusicSelect ? '변경' : '등록'}
                  buttonType={isMusicSelect ? 'secondary' : 'primary'}
                  rightElement="button" // 오른쪽 요소 타입
                />
              </div>
              <NicknameInput
                value={formData1.nickname}
                setValue={(nickname) => setFormData1((prev) => ({ ...prev, nickname }))}
                validation={validationMessages.nickname}
                setValidation={(validation) =>
                  setValidationMessages((prev) => ({ ...prev, nickname: validation }))
                }
              />
            </div>
            <Button variant={isDisable ? 'disabled' : 'primary'} className="py-3 body-m mt-5">
              저장하기
            </Button>
          </>
        ) : (
          // 비밀번호 변경 탭
          <>
            <div className="flex flex-col gap-5">
              <InputField
                type="password"
                id="current-password"
                label="현재 비밀번호"
                placeholder="현재 비밀번호"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                validationMessages={validationMessages.currentPassword}
              />
              <PasswordInput
                id="new-password"
                label="새 비밀번호"
                placeholder="새 비밀번호"
                value={formData2.newPassword}
                setValue={(password) =>
                  setFormData2((prev) => ({ ...prev, newPassword: password }))
                }
                validation={validationMessages.newPassword}
                setValidation={(validation) =>
                  setValidationMessages((prev) => ({ ...prev, newPassword: validation }))
                }
              />
              <PasswordConfirmInput
                id="confirm-password"
                label="새 비밀번호 확인"
                placeholder="새 비밀번호 확인"
                value={formData2.passwordConfirm}
                password={formData2.newPassword}
                setValue={(passwordConfirm) =>
                  setFormData2((prev) => ({ ...prev, passwordConfirm }))
                }
                validation={validationMessages.passwordConfirm}
                setValidation={(validation) =>
                  setValidationMessages((prev) => ({ ...prev, passwordConfirm: validation }))
                }
              />
            </div>
            <Button variant="disabled" className="py-3 body-m mt-5">
              저장하기
            </Button>
          </>
        )}
      </form>
    </div>
  );
}

export default EditProfile;

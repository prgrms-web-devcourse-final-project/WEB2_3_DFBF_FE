import { useEffect, useRef, useState } from 'react';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import MusicCard from '@/components/MusicCard';
import { checkPassword, getMyProfile, patchEditProfile } from '@/apis/user';
import PasswordInput from '../signup/components/PasswordInput';
import PasswordConfirmInput from '../signup/components/PasswordConfirmInput';
import NicknameInput from '../signup/components/NicknameInput';
import { useMusicCardStore } from '@/store/MusicCardStore';
import { useSheetStore } from '@/store/sheetStore';
import _ from 'lodash';
import { useNavigate } from 'react-router';
import { useModalStore } from '@/store/modalStore';
import SpinLoading from '@/components/loading/SpinLoading';
import Complete from '@/components/loading/Complete';
import { twMerge } from 'tailwind-merge';
import ErrorShake from '@/components/loading/ErrorShake';

type ValidationMessage = {
  type: 'success' | 'error' | '';
  message: string;
};

type ProfileFormType = {
  // profileMusic: ProfileMusic | null;
  // nickname: string;
  password: string;
  nickName: string;
  spotifyId: string;
  title: string;
  artist: string;
  albumImage: string;
};

interface ValidationMessages {
  currentPassword: ValidationMessage;
  newPassword: ValidationMessage;
  passwordConfirm: ValidationMessage;
  nickname: ValidationMessage;
}

function EditProfile() {
  const navigate = useNavigate();

  const { openModal, closeModal } = useModalStore();

  const { selectedProfileMusic, selectProfileMusic, clearProfileMusic } = useMusicCardStore();
  const [isMusicSelect, setIsMusicSelect] = useState(false);
  const { closeAllSheets } = useSheetStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (selectedProfileMusic?.spotifyId) {
      setIsMusicSelect(true);
      closeAllSheets();
      console.log('음악 선택됨:', selectedProfileMusic);
    } else {
      setIsMusicSelect(false);
    }
  }, [selectedProfileMusic]);

  const prevProfileMusic = useRef<ProfileMusic | null>(null);
  const prevNickname = useRef<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');

  const [nickname, setNickname] = useState('');

  const [formData2, setFormData2] = useState({
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

  //탭 바꾸면 기존 정보로 초기화
  useEffect(() => {
    if (activeTab === 'profile') {
      setCurrentPassword('');
      setFormData2({
        newPassword: '',
        passwordConfirm: '',
      });
      setValidationMessages((prev) => ({
        ...prev,
        currentPassword: { type: '', message: '' },
        newPassword: { type: '', message: '' },
        passwordConfirm: { type: '', message: '' },
      }));
    } else {
      setNickname(prevNickname.current);
      selectProfileMusic(prevProfileMusic.current);
    }
  }, [activeTab]);

  //노래 이전과 달라진게 없으면 disable
  const isProfileMusicSame = _.isEqual(prevProfileMusic.current, selectedProfileMusic);
  //닉네임 바뀌지 않거나, 바뀌었는데 중복확인이 안되었으면 disable
  const isNicknameSame = _.isEqual(prevNickname.current, nickname);
  const isNicknameValid = validationMessages.nickname?.type === 'success';

  //disable 조건
  const isProfileDisable =
    isProfileMusicSame && (isNicknameSame || (!isNicknameSame && !isNicknameValid));
  const isPasswordDisable =
    !currentPassword.length ||
    validationMessages.newPassword.type !== 'success' ||
    validationMessages.passwordConfirm.type !== 'success';

  const validateCurrentPassword = async () => {
    //현재 비밀번호 확인 api
    const data = await checkPassword(currentPassword);
    console.log(data);
    if (data.code === 400) {
      setValidationMessages((prev) => ({
        ...prev,
        currentPassword: { type: 'error', message: data.message },
      }));
      return false;
    } else if (data.code === 200) {
      setValidationMessages((prev) => ({
        ...prev,
        currentPassword: { type: 'success', message: '비밀번호가 일치합니다' },
      }));
      return true;
    }
    return false;
  };

  const handleProfileSubmit = async () => {
    try {
      setIsLoading(true);
      // 업데이트 된 것만 전송
      const updatedData: Partial<ProfileFormType> = {};
      if (nickname !== prevNickname.current) {
        updatedData.nickName = nickname;
      }
      if (selectedProfileMusic !== prevProfileMusic.current) {
        updatedData.spotifyId = selectedProfileMusic?.spotifyId;
        updatedData.title = selectedProfileMusic?.title;
        updatedData.artist = selectedProfileMusic?.artist;
        updatedData.albumImage = selectedProfileMusic?.album;
      }

      console.log('전송 데이터:', updatedData);

      // API 호출
      const data = await patchEditProfile(updatedData);
      console.log('응답 데이터:', data);

      if (data.code === 200) {
        setIsComplete(true);
        openModal({
          title: '프로필 수정 완료',
          message: '프로필이 성공적으로 수정되었습니다!',
          onConfirm: () => {
            closeModal();
            navigate('/mypage');
          },
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      setIsError(true);
      console.error('프로필 수정 오류:', error);

      // 에러 메시지를 모달로 표시
      openModal({
        title: '프로필 수정 실패',
        message: '잠시 후 다시 시도해주세요.',
        onConfirm: () => {
          closeModal();
          navigate(-1);
        },
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handlePasswordSubmit = async () => {
    try {
      setIsLoading(true);

      // 현재 비밀번호 확인
      const isCurrentPasswordValid = await validateCurrentPassword();
      if (!isCurrentPasswordValid) {
        console.log('현재 비밀번호가 일치하지 않습니다.');
        return;
      }

      const updatedData: Partial<ProfileFormType> = {
        password: formData2.newPassword,
      };

      // API 호출
      const data = await patchEditProfile(updatedData);

      if (data.code === 200) {
        openModal({
          title: '비밀번호 변경이 완료되었습니다',
          onConfirm: () => {
            navigate('/mypage');
            closeModal();
          },
        });
      }
    } catch (error) {
      console.error('비밀번호 변경 오류:', error);
      openModal({
        title: '비밀번호 변경 실패',
        message: '잠시 후 다시 시도해주세요.',
        onConfirm: () => {
          closeModal();
          navigate(-1);
        },
      });
    } finally {
      setIsLoading(false);
    }
  };
  const renderButtonContent = () => {
    if (isLoading) {
      return <SpinLoading />;
    } else if (isComplete) {
      return <Complete />;
    } else if (isError) {
      return <ErrorShake />;
    } else return <span>저장하기</span>;
  };

  useEffect(() => {
    const loadMyProfile = async () => {
      const data = await getMyProfile();
      console.log(data);
      prevNickname.current = data.data.nickname;
      prevProfileMusic.current = data.data.profileMusic;

      setNickname(data.data.nickname);

      selectProfileMusic(data.data.profileMusic);
    };
    loadMyProfile();

    return () => {
      clearProfileMusic();
    };
  }, []);

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
          className="absolute bottom-0 h-[2px] bg-primary-active transition-all duration-300"
          style={{
            width: '50%',
            left: activeTab === 'profile' ? '0%' : '50%',
          }}
        />
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
                    onClick={clearProfileMusic}
                    className="border-b border-gray-80 cursor-pointer"
                  >
                    삭제
                  </button>
                </div>
                <MusicCard
                  image={selectedProfileMusic?.album}
                  title={selectedProfileMusic?.title}
                  artist={selectedProfileMusic?.artist}
                  spotifyId={selectedProfileMusic?.spotifyId}
                  isMusicSelect={isMusicSelect}
                  buttonContent={isMusicSelect ? '변경' : '등록'}
                  buttonType={isMusicSelect ? 'secondary' : 'primary'}
                  rightElement="button" // 오른쪽 요소 타입
                />
              </div>
              <NicknameInput
                value={nickname}
                setValue={(nickname) => setNickname(nickname)}
                validation={validationMessages.nickname}
                setValidation={(validation) =>
                  setValidationMessages((prev) => ({ ...prev, nickname: validation }))
                }
              />
            </div>
            <Button
              onClick={handleProfileSubmit}
              variant={isProfileDisable ? 'disabled' : 'primary'}
              className={twMerge('py-3 body-m mt-5', isError ? 'bg-functional-danger' : '')}
            >
              {renderButtonContent()}
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
            <Button
              onClick={handlePasswordSubmit}
              variant={isPasswordDisable ? 'disabled' : 'primary'}
              className={twMerge('py-3 body-m mt-5', isError ? 'bg-functional-danger' : '')}
            >
              {renderButtonContent()}
            </Button>
          </>
        )}
      </form>
    </div>
  );
}

export default EditProfile;

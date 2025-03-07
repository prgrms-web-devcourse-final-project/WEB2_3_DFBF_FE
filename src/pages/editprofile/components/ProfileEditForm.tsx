import { getMyProfile, patchEditProfile } from '@/apis/user';
import Button from '@/components/Button';
import Complete from '@/components/loading/Complete';
import ErrorShake from '@/components/loading/ErrorShake';
import SpinLoading from '@/components/loading/SpinLoading';
import MusicCard from '@/components/MusicCard';
import NicknameInput from '@/pages/signup/components/NicknameInput';
import { useModalStore } from '@/store/modalStore';
import { useMusicCardStore } from '@/store/MusicCardStore';
import { useSheetStore } from '@/store/sheetStore';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';

type ProfileFormType = {
  password: string;
  nickName: string;
  spotifyId: string;
  title: string;
  artist: string;
  albumImage: string;
};

// 노래, 닉네임 변경폼
function ProfileEditForm() {
  const navigate = useNavigate();

  const { selectedProfileMusic, selectProfileMusic, clearProfileMusic } = useMusicCardStore(); // 음악관리
  const { openModal, closeModal } = useModalStore(); // 모달 관리
  const { closeAllSheets } = useSheetStore(); // 시트관리

  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isMusicSelect, setIsMusicSelect] = useState(false);
  const [nickname, setNickname] = useState(''); // 닉네임
  const [isNicknameValid, setIsNicknameValid] = useState(false); // 닉네임 유효성

  const prevProfileMusic = useRef<ProfileMusic | null>(null);
  const prevNickname = useRef<string>('');

  //노래 이전과 달라진게 없으면 disable
  const isProfileMusicSame = _.isEqual(prevProfileMusic.current, selectedProfileMusic);

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  //submit 조건
  const isProfileEditable = !isProfileMusicSame || isNicknameValid;

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
    if (selectedProfileMusic?.spotifyId) {
      setIsMusicSelect(true);
      closeAllSheets();
      console.log('음악 선택됨:', selectedProfileMusic);
    } else {
      setIsMusicSelect(false);
    }
  }, [selectedProfileMusic]);

  useEffect(() => {
    const loadMyProfile = async () => {
      const data = await getMyProfile();
      prevNickname.current = data.data.nickname; // 이전 닉네임 저장하기
      prevProfileMusic.current = data.data.profileMusic; // 이전 음악 저장하기

      setNickname(data.data.nickname);
      selectProfileMusic(data.data.profileMusic);
    };
    loadMyProfile();

    return () => {
      clearProfileMusic();
    };
  }, []);

  return (
    <form className="flex flex-col justify-between h-full p-5" onSubmit={handleProfileSubmit}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-between w-[296px] px-1 my-1 body-r text-gray-80">
            <p>테마곡 설정</p>
            <button
              onClick={clearProfileMusic}
              className="border-b border-gray-80 cursor-pointer"
              type="button"
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
          initialValue={nickname}
          setValue={(nickname) => setNickname(nickname)}
          validity={isNicknameValid}
          setValidity={(val) => setIsNicknameValid(val)}
        />
      </div>
      <Button
        variant={isProfileEditable ? 'primary' : 'disabled'}
        className={twMerge('py-3 body-m mt-5', isError ? 'bg-functional-danger' : '')}
      >
        {renderButtonContent()}
      </Button>
    </form>
  );
}

export default ProfileEditForm;

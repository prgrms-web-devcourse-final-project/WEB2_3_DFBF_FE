import { getMyProfile, patchEditProfile } from '@/apis/user';
import Button from '@/components/button/Button';
import Complete from '@/components/loading/Complete';
import ErrorShake from '@/components/loading/ErrorShake';
import SpinLoading from '@/components/loading/SpinLoading';
import MusicCard from '@/components/MusicCard';
import NicknameInput from '@/pages/signup/components/NicknameInput';
import { useModalStore } from '@/store/modalStore';
import { useMusicCardStore } from '@/store/MusicCardStore';
import { useSheetStore } from '@/store/sheetStore';
import { fetchSpotifyVideoId } from '@/utils/fetchSpotifyVideoId';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { twMerge } from 'tailwind-merge';

type ProfileFormType = {
  password: string;
  nickName: string;
  spotifyId: string | -1;
  title: string;
  artist: string;
  albumImage: string;
  videoId: string;
};

// 노래, 닉네임 변경폼
function ProfileEditForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // ✅ queryClient 가져오기

  const { selectedProfileMusic, selectProfileMusic, clearProfileMusic } = useMusicCardStore(); // 음악관리
  const { openModal, closeModal } = useModalStore(); // 모달 관리
  const { closeAllSheets } = useSheetStore(); // 시트관리

  const [isMusicSelect, setIsMusicSelect] = useState(false);
  const [nickname, setNickname] = useState(''); // 닉네임
  const [isNicknameValid] = useState(false); // 닉네임 유효성

  const prevProfileMusic = useRef<ProfileMusic | null>(null);
  const prevNickname = useRef<string>('');

  //노래 이전과 달라진게 없으면 disable
  const isProfileMusicSame = _.isEqual(prevProfileMusic.current, selectedProfileMusic);

  // 유저 정보 불러오기
  const { data: userData } = useQuery({
    queryKey: ['myProfile'],
    queryFn: () => getMyProfile(),
    staleTime: 5 * 60 * 1000,
  });

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: patchEditProfile,
    onSuccess: (data) => {
      if (data.code === 200) {
        openModal({
          title: '프로필 수정 완료',
          message: '프로필이 성공적으로 수정되었습니다!',
          onConfirm: () => {
            closeModal();
            navigate('/mypage');
          },
        });
        queryClient.invalidateQueries({ queryKey: ['myProfile'] }); // 즉시 최신 데이터 가져오기
      } else {
        throw new Error();
      }
    },
    onError: () => {
      openModal({
        title: '프로필 수정 실패',
        message: '잠시 후 다시 시도해주세요.',
        onConfirm: () => {
          closeModal();
          navigate(-1);
        },
      });
    },
  });

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 업데이트 된 것만 전송
    const updatedData: Partial<ProfileFormType> = {};
    if (nickname !== prevNickname.current) {
      updatedData.nickName = nickname;
    }
    // 현재 프로필 뮤직이랑 이전 프로필 뮤직이 다를때만 업데이트
    if (selectedProfileMusic !== prevProfileMusic.current) {
      // 프로필 뮤직이 선택되어있을 경우
      if (selectedProfileMusic) {
        // videoId 조회
        const videoId = await fetchSpotifyVideoId(
          selectedProfileMusic?.spotifyId,
          selectedProfileMusic?.artist,
          selectedProfileMusic?.title,
        );
        // // console.log('videoId:', videoId);

        updatedData.spotifyId = selectedProfileMusic.spotifyId;
        updatedData.title = selectedProfileMusic.title;
        updatedData.artist = selectedProfileMusic.artist;
        updatedData.albumImage = selectedProfileMusic.album;
        updatedData.videoId = videoId;
      }
      // 프로필 뮤직이 선택되지않아서 삭제하는 로직
      else {
        updatedData.spotifyId = -1;
      }
    }

    // // console.log('전송 데이터:', updatedData);

    mutate(updatedData);
  };

  //submit 조건
  const isProfileEditable = !isProfileMusicSame || isNicknameValid;

  const renderButtonContent = () => {
    if (isPending) {
      return <SpinLoading />;
    } else if (isSuccess) {
      return <Complete />;
    } else if (isError) {
      return <ErrorShake />;
    } else return <span>저장하기</span>;
  };

  useEffect(() => {
    if (selectedProfileMusic?.spotifyId) {
      setIsMusicSelect(true);
      closeAllSheets();
      // // console.log('음악 선택됨:', selectedProfileMusic);
    } else {
      setIsMusicSelect(false);
    }
  }, [selectedProfileMusic]);

  useEffect(() => {
    if (userData) {
      const { nickname, profileMusic } = userData.data;
      prevNickname.current = nickname; // 이전 닉네임 저장
      prevProfileMusic.current = profileMusic?.spotifyId ? profileMusic : null; // 이전 음악저장

      setNickname(nickname);
      selectProfileMusic(prevProfileMusic.current);
    }

    return () => {
      clearProfileMusic();
    };
  }, [userData]);

  return (
    <form className="flex flex-col justify-between h-full p-5" onSubmit={handleProfileSubmit}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-between w-[296px] px-1 my-1 body-r text-gray-80">
            <p>테마곡 설정</p>
            <button
              onClick={clearProfileMusic}
              className="border-b cursor-pointer border-gray-80"
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
        <NicknameInput initialText={nickname} onChange={setNickname} />
      </div>
      <Button
        type="submit"
        variant={isProfileEditable ? 'primary' : 'disabled'}
        className={twMerge('py-3 body-m mt-5', isError ? 'bg-functional-danger' : '')}
      >
        {renderButtonContent()}
      </Button>
    </form>
  );
}

export default ProfileEditForm;

import { checkPassword, patchEditProfile } from '@/apis/user';
import Button from '@/components/Button';
import Complete from '@/components/loading/Complete';
import ErrorShake from '@/components/loading/ErrorShake';
import SpinLoading from '@/components/loading/SpinLoading';
import CurrentPasswordInput from '@/pages/editprofile/components/CurrentPasswordInput';
import PasswordConfirmInput from '@/pages/signup/components/PasswordConfirmInput';
import PasswordInput from '@/pages/signup/components/PasswordInput';
import { useModalStore } from '@/store/modalStore';
import { useState } from 'react';
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

function PasswordEditForm() {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalStore(); // 모달 관리

  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState('');
  const [validity, setValidity] = useState({
    password: false,
    passwordConfirm: false,
  });

  const validateCurrentPassword = async () => {
    //현재 비밀번호 확인 api
    try {
      const data = await checkPassword(currentPassword);
      if (data.code === 200) {
        return true;
      } else if (data.code === 400) {
        return false;
      }
    } catch {
      console.error('비밀번호 확인도중 에러가 발생했습니다.');
      return false;
    }
  };

  const handlePasswordSubmit = async () => {
    try {
      setIsLoading(true);

      // 현재 비밀번호 확인
      const isCurrentPasswordValid = await validateCurrentPassword();
      if (!isCurrentPasswordValid) {
        openModal({
          title: '현재 비밀번호를 다시 확인해주세요',
          onConfirm: () => {
            closeModal();
          },
        });
        return;
      }

      const updatedData: Partial<ProfileFormType> = {
        password: newPassword,
      };

      // API 호출
      const data = await patchEditProfile(updatedData);

      if (data.code === 200) {
        setIsComplete(true);
        openModal({
          title: '비밀번호 변경이 완료되었습니다',
          onConfirm: () => {
            navigate('/mypage');
            closeModal();
          },
        });
      }
    } catch (error) {
      setIsError(true);
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

  const isPasswordEditable = currentPassword && validity.password && validity.password;
  const renderButtonContent = () => {
    if (isLoading) {
      return <SpinLoading />;
    } else if (isComplete) {
      return <Complete />;
    } else if (isError) {
      return <ErrorShake />;
    } else return <span>저장하기</span>;
  };

  return (
    <form className="flex flex-col justify-between h-full p-5" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-5">
        <CurrentPasswordInput setCurrentPassword={setCurrentPassword} />
        <PasswordInput
          label="새 비밀번호"
          placeholder="새 비밀번호를 입력해 주세요"
          setValue={(password) => setNewPassword(password)}
          setValidity={(password) => setValidity((prev) => ({ ...prev, password }))}
        />
        <PasswordConfirmInput
          label="새 비밀번호"
          placeholder="새 비밀번호를 다시 입력해 주세요"
          setValidity={(passwordConfirm) => setValidity((prev) => ({ ...prev, passwordConfirm }))}
          password={newPassword}
        />
      </div>
      <Button
        onClick={handlePasswordSubmit}
        variant={isPasswordEditable ? 'primary' : 'disabled'}
        className={twMerge('py-3 body-m mt-5', isError ? 'bg-functional-danger' : '')}
      >
        {renderButtonContent()}
      </Button>
    </form>
  );
}

export default PasswordEditForm;

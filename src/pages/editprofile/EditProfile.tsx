import Button from '@/components/Button';
import InputField from '@/components/InputField';
import MusicCard from '@/components/MusicCard';

function EditProfile() {
  return (
    <div className="flex flex-col w-full pt-5 pb-10 border-2 border-red-500">
      <form className="flex flex-col justify-between h-full " onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-5">
          <div className="flex justify-center w-full">
            <MusicCard />
          </div>
          <div>
            <InputField
              type="text"
              id="nickname"
              label="닉네임"
              placeholder="닉네임을 입력해 주세요"
              isValid={false}
              errorMessage="닉네임 중복"
              variant="primary"
              buttonText="중복확인"
            />
            <InputField
              type="password"
              id="current-password"
              label="현재 비밀번호"
              placeholder="현재 비밀번호"
              isValid={false}
              errorMessage="닉네임 중복"
            />
            <InputField
              type="password"
              id="new-password"
              label="새 비밀번호"
              placeholder="새 비밀번호"
              isValid={false}
              errorMessage="닉네임 중복"
            />
            <InputField
              type="password"
              id="confirm-password"
              label="새 비밀번호 확인"
              placeholder="새 비밀번호 확인"
              isValid={false}
              errorMessage="닉네임 중복"
            />
          </div>
        </div>

        <Button variant="disabled" className="py-3 body-m">
          저장하기
        </Button>
      </form>
    </div>
  );
}

export default EditProfile;

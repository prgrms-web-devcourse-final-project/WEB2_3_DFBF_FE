import Button from '@/components/Button';
import InputField from '@/components/InputField';

function SignUp() {
  return (
    <div className=" flex w-full pt-5 pb-[40px] flex-col justify-between">
      <form className="w-full ">
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
          id="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          isValid={false}
          errorMessage="닉네임 중복"
        />
        <InputField
          type="password"
          id="passwordConfirm"
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력하세요"
          isValid={false}
          errorMessage="닉네임 중복"
        />
        <InputField
          type="text"
          id="emailVerification"
          label="이메일 인증"
          placeholder="이메일을 입력해 주세요"
          isValid={false}
          errorMessage="닉네임 중복"
          variant="primary"
          buttonText="인증요청"
        />
        {/* 인증번호용 따로 제작해야함 */}
        <InputField
          type="text"
          id="emailVerificationConfrim"
          label="인증번호 확인"
          placeholder="이메일을 입력해 주세요"
          isValid={false}
          errorMessage="닉네임 중복"
          variant="primary"
          buttonText="인증확인"
        />
      </form>

      <Button variant="disabled" className="py-[7px] body-m">
        지금 시작하기
      </Button>
    </div>
  );
}

export default SignUp;

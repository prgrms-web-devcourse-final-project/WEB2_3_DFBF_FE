import Button from '@/components/Button';
import logo from '@assets/icons/logo.svg';
import kakao from '@assets/icons/kakao-icon.svg';
import { Link } from 'react-router';
import Input from '@/components/Input';
export default function Login() {
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('로그인 클릭!');
  };

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[380px]">
      {/* 로고 */}
      <img className="w-[186px] h-[39px] mb-8" src={logo} alt="사운드링크 로고" />
      {/* 로그인 폼 */}
      <form
        onSubmit={(e) => handleLogin(e)}
        autoComplete="off"
        className="w-full pb-2.5 border-b border-gray-15"
      >
        <div className="flex flex-col gap-2 w-full">
          <div>
            <label htmlFor="userId" className="body-r text-gray-80 ml-[5px] mb-0.5">
              아이디
            </label>
            <Input id="userId" placeholder="아이디를 입력해 주세요" />
          </div>
          <div>
            <label htmlFor="password" className="body-r text-gray-80 ml-[5px] mb-0.5">
              비밀번호
            </label>
            <Input id="password" placeholder="비밀번호를 입력해 주세요" />
          </div>
        </div>
        <Button className="focus:outline-primary-active mt-[14px]">로그인</Button>
      </form>

      <div className="flex flex-col gap-3 items-center w-full mt-2.5 ">
        {/* 소셜 로그인 */}
        <Button className="bg-[#FFEB3B] text-gray-80">
          <img src={kakao} alt="카카오 아이콘" />
          카카오 로그인
        </Button>

        {/* 회원가입 */}
        <div className="caption-r">
          계정이 없으신가요?
          <Link to="/signup" className="text-primary-active">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}

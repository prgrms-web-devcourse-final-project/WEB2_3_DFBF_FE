import Button from '@/components/Button';
import sad from '@/assets/icons/sad-icon.svg';

export default function NotFound() {
  return (
    <div className="relative w-full max-w-[600px] px-3 bg-background flex flex-col justify-center items-center">
      <div className="flex flex-col gap-5 justify-center items-center">
        <p className="text-[28px] font-bold text-primary-normal">404 Not Found</p>
        <div className="flex flex-col justify-center items-center text-gray-60">
          <p>페이지를 찾을 수 없어요</p>
          <p>새로운 감정을 발견하러 가볼까요?</p>
        </div>

        <img src={sad} className="w-[80px] h-[80px]" alt="sad" />
      </div>

      <div className="absolute bottom-10 flex px-3 w-full">
        <Button type="primary">홈으로 가기</Button>
      </div>
    </div>
  );
}

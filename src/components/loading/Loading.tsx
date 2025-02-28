import LoadingMini from '@/components/loading/LoadingMini';
import Overlay from '@/components/Overlay';

function Loading({ text }: { text?: string }) {
  return (
    <Overlay>
      <div className="flex flex-col items-center gap-[22px]">
        <LoadingMini />
        {text && (
          <div className="flex flex-col items-center body-r">
            <span>{text}을 불러오고 있어요</span>
            <span>잠시만 기다려 주세요!</span>
          </div>
        )}
      </div>
    </Overlay>
  );
}

export default Loading;

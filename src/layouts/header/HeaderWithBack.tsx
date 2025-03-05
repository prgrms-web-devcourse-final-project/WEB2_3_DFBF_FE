import MoreOptionsSelect from '@/components/MoreOptionsSelect';
import { useMoreOptions } from '@/hooks/useMoreOptions';
import HedaerLayout from '@/layouts/header/HedaerLayout';
import backIcon from '@assets/icons/back-icon.svg';
import { useNavigate } from 'react-router';

interface HeaderWithBackProps {
  showMoreOptions?: boolean; // 더보기 메뉴를 표시할지 여부
  text?: string; // 헤더 텍스트
}

// 뒤로 가기 있는 헤더
function HeaderWithBack({ showMoreOptions = false, text }: HeaderWithBackProps) {
  const navigate = useNavigate();
  const moreOptionsItems = useMoreOptions();
  return (
    <HedaerLayout>
      <div className="flex items-center justify-between w-full">
        {/* 뒤로가기 / 회원가입 */}
        <div className="gap-[10px] flex items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
            className="px-2 py-3 cursor-pointer"
          >
            <img src={backIcon} alt="뒤로가기 아이콘" />
          </button>
          {text && <span className="h4-b text-primary-normal">{text}</span>}
        </div>

        {/* 더보기 메뉴 */}
        {showMoreOptions && <MoreOptionsSelect items={moreOptionsItems} />}
      </div>
    </HedaerLayout>
  );
}

export default HeaderWithBack;

// 사용방법
// <HeaderWithBack text='회원가입' />
// <HeaderWithBack showMoreOptions />

import { Link, useLocation } from 'react-router';
import closeIcon from '@assets/icons/close-icon.svg';
const BackLink = () => {
  const location = useLocation();

  const pathSegments = location.pathname.split('/').filter(Boolean); // ['', 'post', '123'] → ['post', '123']
  pathSegments.pop(); // 마지막 세그먼트 제거
  const newPath = '/' + pathSegments.join('/');
  return (
    <Link to={newPath} className="flex items-center justify-center w-6 h-6 cursor-pointer">
      <img src={closeIcon} alt="닫기" />
    </Link>
  );
};

export default BackLink;

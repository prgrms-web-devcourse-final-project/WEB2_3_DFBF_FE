import { useEffect } from 'react';
import { useLocation } from 'react-router';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 부드럽게 스크롤 (즉시 이동은 'auto')
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;

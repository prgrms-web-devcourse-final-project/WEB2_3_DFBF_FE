import { useEffect } from 'react';
import { useLocation } from 'react-router';

function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (state?.scrollLock) return; // scrollLock이 true면 스크롤 안 함

    window.scrollTo({
      top: 0,
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;

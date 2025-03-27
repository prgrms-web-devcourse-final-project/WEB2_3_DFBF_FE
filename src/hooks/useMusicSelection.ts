import { useMusicCardStore } from '@/store/MusicCardStore';
import { useSheetStore } from '@/store/sheetStore';
import { useEffect, useState } from 'react';

export const useMusicSelection = () => {
  const { selectedPostMusic, selectPostMusic, clearPostMusic } = useMusicCardStore();
  const { closeAllSheets } = useSheetStore();
  const [isMusicSelect, setIsMusicSelect] = useState(false); //음악 선택 상태 확인

  // 음악 선택 됨 -> 아티스트 폰트 스타일 변경, 모달 닫기
  useEffect(() => {
    if (selectedPostMusic) {
      setIsMusicSelect(true);
      closeAllSheets();
      console.log('음악 선택됨:', selectedPostMusic);
    } else {
      setIsMusicSelect(false);
    }
  }, [selectedPostMusic]);

  return { selectedPostMusic, isMusicSelect, clearPostMusic, selectPostMusic };
};

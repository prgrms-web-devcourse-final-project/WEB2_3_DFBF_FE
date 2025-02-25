import Button from '@/components/Button';
import EmotionFilter from '@/components/EmotionFilter';
import MusicCard from '@/components/MusicCard';
import Comment from '@/pages/post/components/Comment';
import { useContext, useEffect, useState } from 'react';
import { PostMusicContext } from '@/pages/post/context/PostMusicContext';
import { useSheetStore } from '@/store/sheetStore';

export default function PostPage() {
  const { selectedPostMusic } = useContext(PostMusicContext)!;
  const { closeSheet } = useSheetStore();

  //음악 선택 상태 확인
  const [isMusicSelect, setIsMusicSelect] = useState(false);

  // 음악 선택 됨
  useEffect(() => {
    if (selectedPostMusic) {
      setIsMusicSelect(true);
      closeSheet();
    } else {
      setIsMusicSelect(false);
    }
    console.log(selectedPostMusic);
  }, [selectedPostMusic]);

  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null); // 선택된 감정
  const [comment, setComment] = useState<string>(''); // 코멘트

  // 감정 선택 시
  const onEmotionClick = (emotion: string) => {
    setSelectedEmotion((prev) => (prev === emotion ? null : emotion));
  };

  // 코멘트 입력 시
  const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className="flex flex-col w-full items-center justify-between pb-10">
      <div className="flex flex-col items-center mt-5 gap-6 w-fit">
        {/* 감정 선택 */}
        <div className="flex flex-col items-center gap-5">
          <h2 className="font-saeeum text-2xl text-gray-60">이 순간, 어떤 감정이 떠오르나요?</h2>
          <EmotionFilter onEmotionClick={onEmotionClick} selectedEmotion={selectedEmotion} />
        </div>

        {/* 음악 검색 */}
        <MusicCard
          image={selectedPostMusic?.albumImage}
          title={selectedPostMusic?.songTitle}
          artist={selectedPostMusic?.artistName}
          isMusicSelect={isMusicSelect}
          buttonContent={isMusicSelect ? '변경' : '등록'}
          buttonType="primary"
          rightElement="button"
        />

        {/* 사용자 코멘트 */}
        <Comment
          selectedEmotion={selectedEmotion}
          comment={comment}
          onChangeComment={onChangeComment}
        />
      </div>
      {/* 버튼 */}
      <Button>기록 완료</Button>
    </div>
  );
}

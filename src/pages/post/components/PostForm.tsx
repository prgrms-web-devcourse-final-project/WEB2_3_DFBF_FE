import EmotionFilter from '@/components/EmotionFilter';
import MusicCard from '@/components/MusicCard';
import Comment from '@/pages/post/components/Comment';

interface PostFormProps {
  onEmotionClick: (emotion: string) => void;
  selectedEmotion: string | null;
  selectedPostMusic: MusicCardItem | null;
  isMusicSelect: boolean;
  comment: string;
  onChangeComment: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function PostForm({
  onEmotionClick,
  selectedEmotion,
  selectedPostMusic,
  isMusicSelect,
  comment,
  onChangeComment,
}: PostFormProps) {
  return (
    <>
      <div className="flex flex-col items-center gap-6 mt-5 w-fit">
        {/* 감정 선택 */}
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-2xl font-saeeum text-gray-60">이 순간, 어떤 감정이 떠오르나요?</h2>
          <EmotionFilter onEmotionClick={onEmotionClick} selectedEmotion={selectedEmotion} />
        </div>

        {/* 음악 검색 */}
        <MusicCard
          image={selectedPostMusic?.albumImage}
          title={selectedPostMusic?.title}
          artist={selectedPostMusic?.artist}
          isMusicSelect={isMusicSelect}
          buttonContent={isMusicSelect ? '변경' : '등록'}
          buttonType={isMusicSelect ? 'secondary' : 'primary'}
          rightElement="button"
        />

        {/* 사용자 코멘트 */}
        <Comment
          selectedEmotion={selectedEmotion}
          comment={comment}
          onChangeComment={onChangeComment}
        />
      </div>
    </>
  );
}

import EmotionBadge from '@/components/EmotionBadge';
import { MAX_EMOTION_COMMENT_LENGTH } from '@/constants';

interface CommentProps {
  selectedEmotion: string | null; // 선택된 감정
  onChangeComment: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // 코멘트 입력시
  comment: string | null; // 코멘트
}

export default function Comment({ selectedEmotion, onChangeComment, comment }: CommentProps) {
  return (
    <div className="flex flex-col w-full gap-1">
      {/* 상태 */}
      <label htmlFor="userComment" className="flex items-center gap-2 ml-1 body-m">
        <span className="font-saeeum text-xl text-gray-60"> 나는 지금</span>
        {selectedEmotion ? (
          <EmotionBadge size="small" emotion={selectedEmotion} />
        ) : (
          <span className="font-saeeum text-xl text-gray-60">💭</span>
        )}
      </label>
      {/* 코멘트 입력 */}
      <div className="flex flex-col w-full gap-1">
        {/* 입력창 */}
        <div className="h-24 bg-white drop-shadow rounded-lg body-r overflow-hidden px-2 py-3">
          <textarea
            name="comment"
            id="userComment"
            placeholder="지금 떠오르는 생각을 자유롭게 적어보세요"
            className="scroll resize-none w-full h-full m-1 break-words"
            onChange={(e) => onChangeComment(e)}
            maxLength={MAX_EMOTION_COMMENT_LENGTH}
          ></textarea>
        </div>
        {/* 글자수 최대 200 */}
        <span className="self-end caption-r text-gray-50 mr-1">
          {comment?.length}/{MAX_EMOTION_COMMENT_LENGTH}
        </span>
      </div>
    </div>
  );
}

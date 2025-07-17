import EmotionBadge from '@/components/EmotionBadge';
import ChatActionButtons from '@/components/modalSheet/ChatActionButtons';
import defaultImage from '@assets/images/default.png';
import { useQuery } from '@tanstack/react-query';
import { getEmotionRecordById } from '@/apis/emotionRecord';
import { formatDate } from '@/utils/formatDate';
import ModalSheetLayoutTemp from '@/layouts/ModalSheetLayoutTemp';
import { useParams } from 'react-router';
import { Loading } from '@/components/loading';

interface CardDetailModalProps {}

function CardDetailModalTemp({}: CardDetailModalProps) {
  const id = useParams().id!;

  const { data: record, isLoading } = useQuery({
    queryKey: ['emotionRecord', Number(id)],
    queryFn: () => getEmotionRecordById(Number(id)),
    select: (data) => data.data,
  });

  return (
    <>
      <ModalSheetLayoutTemp isOwnPost={!record?.disable}>
        <div className="px-[36.5px] flex flex-col items-center gap-4">
          {/* 게시물 정보 */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 caption-r text-gray-60">
              <span>{record?.nickName}</span>
              {/* <img src={headsetIcon} alt="헤드셋 아이콘" /> */}
            </div>
            <div className="flex items-center gap-2">
              <span className=" font-light text-gray-60 text-[10px]">
                {formatDate(record?.createdAt)}
              </span>
              <EmotionBadge size="small" emotion={record?.emotion} />
            </div>
          </div>

          <div className="flex flex-col gap-2 max-w-[250px]">
            <div className="flex flex-col items-center gap-2">
              <img
                src={record?.spotifyMusic.albumImage}
                alt="앨범 이미지"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; // 무한 루프 방지
                  target.src = defaultImage; // 기본 이미지로 변경
                }}
                className="w-[80px] h-[80px] rounded-[8px]"
              />
              <div className="flex flex-col items-center min-w-0">
                <span className="overflow-hidden body-large-b text-ellipsis whitespace-nowrap">
                  {record?.spotifyMusic.title}
                </span>
                <span className="overflow-hidden body-m text-ellipsis whitespace-nowrap">
                  {record?.spotifyMusic.artist}
                </span>
              </div>

              <ChatActionButtons
                recordId={record?.recordId}
                isOwnPost={!record?.disable}
                authorId={record?.loginId}
                videoId={record?.spotifyMusic.videoId}
              />
            </div>
          </div>

          <div className="body-r">{record?.comment}</div>
        </div>
      </ModalSheetLayoutTemp>
      {isLoading && <Loading />}
    </>
  );
}

export default CardDetailModalTemp;

// 사용예시

// <CardDetailModal recordId={selectedRecordId} isChatting={true} />;

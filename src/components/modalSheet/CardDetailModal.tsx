import EmotionBadge from '@/components/EmotionBadge';
import ChatActionButtons from '@/components/modalSheet/ChatActionButtons';
import { useQuery } from '@tanstack/react-query';
import { getEmotionRecordById } from '@/apis/emotionRecord';
import { formatDate } from '@/utils/formatDate';
import ModalSheetLayoutTemp from '@/layouts/ModalSheetLayoutTemp';
import { useParams } from 'react-router';
import { Loading } from '@/components/loading';
import ImageKitImg from '@/components/ImageKitImg';

interface CardDetailModalProps {}

function CardDetailModal({}: CardDetailModalProps) {
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
              <ImageKitImg
                src={record?.spotifyMusic.albumImage}
                height={80}
                width={80}
                className="rounded-lg"
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

export default CardDetailModal;

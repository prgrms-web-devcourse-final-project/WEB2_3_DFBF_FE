import EmotionRecordCard from '@/components/EmotionRecordCard';
import InfoMessage from '@/components/InfoMessage';
import CardDetailModal from '@/components/modalSheet/CardDetailModal';
import MusicCard from '@/components/MusicCard';
import { useSheetStore } from '@/store/sheetStore';
import { useState } from 'react';

// 마이페이지 / 유저페이지 동시에 사용
function UserProfile() {
  const { openSheet } = useSheetStore();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null); // 선택된 항목 관리

  const [posts, setPosts] = useState([]); // 게시물
  const musicInfo = {
    spotifyId: 33,
    title: '라일락',
    artist: '아이유',
    album_image:
      'https://i.namu.wiki/i/L4gbrOjwTsNcvpsCq8b4P-3eX9Cs0lrIvwHxtFE7S5jaeMsbdelvBqCLMwe6AJJw2zBQqSI4wE0_Qn-EwaeZdnLvseFvt1w9dg-xo9KrFF_GacO_R7BnHI6XRyDDXvr-PHMmSEnqgcrzLjdbQF9obA.webp',
  };

  const mockPostData: EmotionRecordResponse = {
    records: [
      {
        recordId: 101,
        emotion: 'Happy',
        spotifyMusic: {
          spotifyId: 45,
          title: '꽃길',
          artist: 'BIGBANG',
          albumImage:
            'https://i.namu.wiki/i/rlhdUuGd2ZzlWsIYp8KCe_6gHn8-RF4IhH-MKFKHR-JFKfClv5UjqD-e0TfNOr4zUB58TgIElo10PigiEhX7F-D44geazf2BSIRfPSF7p6RzPQS9qGHPvZ-NSpJJAXbgzrPsqWadZ5HHV6xMBqVwiQ.webp',
        },
        comment: '행복하당!',
        createdAt: '2025-01-24 13:40',
      },
      {
        recordId: 102,
        emotion: 'Sad',
        spotifyMusic: {
          spotifyId: 32,
          title: '노래제목',
          artist: '아티스트 이름',
          albumImage:
            'https://i.namu.wiki/i/thsxJUTSzTRzRqoPxl3GHnHL8hNxO-xwHp245PXBhCc7hDtclKkcIS5xB9PDciwNWow94Dy5izwZ-3eeS1rwfkHtADVCUm6IWljhGJivb8wRwcnP4_Go6YNw6_gm-pMsf76XZh6aIAt2PMq3c2qvvw.webp',
        },
        comment: '슬프다ㅠㅠ',
        createdAt: '2025-01-23 13:40',
      },
    ],
    currentPage: 0, // 현재 페이지
    totalPages: 1, // 총 페이지 수
    totalElements: 1, // 총 게시물 수
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  };

  const handleOpenSheet = (recordId: number) => {
    setSelectedRecordId(recordId);
    openSheet(); // 모달 열기
  };

  return (
    <>
      <div className="flex flex-col items-center w-full gap-4 py-4">
        <div className="flex flex-col items-center">
          <span className="h3-b">강수영</span>
          <span className="caption-m text-gray-60">@swimming</span>
        </div>

        <MusicCard
          title={musicInfo.title}
          artist={musicInfo.artist}
          image={musicInfo.album_image}
          rightElement="play"
        />
        {mockPostData.records.length > 0 ? (
          //   기본으로 2열이다가 크기가 500px가 넘어가면 3열로 변경
          <div className="grid grid-cols-2 min-[500px]:grid-cols-3 gap-x-3 gap-y-6 ">
            {mockPostData.records.map((record) => (
              <div key={record.recordId}>
                <div onClick={() => handleOpenSheet(record.recordId)}>
                  <EmotionRecordCard
                    emotion={record.emotion}
                    albumImage={record.spotifyMusic.albumImage}
                    songTitle={record.spotifyMusic.title}
                    artistName={record.spotifyMusic.artist}
                    date={formatDate(record.createdAt)}
                  />
                </div>
                {selectedRecordId === record.recordId && (
                  <CardDetailModal
                    emotion={record.emotion}
                    albumImage={record.spotifyMusic.albumImage}
                    songTitle={record.spotifyMusic.title}
                    artistName={record.spotifyMusic.artist}
                    date={formatDate(record.createdAt)}
                    authorName="작성자닉네임"
                    isChatting={true}
                    isOwnPost={true}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <InfoMessage text="포스트가 비어있어요" />
          </div>
        )}
      </div>
    </>
  );
}

export default UserProfile;

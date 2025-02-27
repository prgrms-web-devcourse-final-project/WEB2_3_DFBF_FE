import SearchBar from '@/components/SearchBar';
import MainCard from '@/components/MainCard';
import { useState } from 'react';
import EmotionFilter from '@/components/EmotionFilter';
import { useSheetStore } from '@/store/sheetStore';
import CardDetailModal from '@/components/modalSheet/CardDetailModal';

function Home() {
  const [searchText, setSearchText] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null); // 선택된 감정
  const onEmotionClick = (emotion: string) => {
    setSelectedEmotion((prev) => (prev === emotion ? null : emotion));
    console.log(emotion);
  };

  // const { openSheet } = useSheetStore();
  const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null); // 선택된 항목 관리

  const mockPostData: EmotionRecordResponse = {
    records: [
      {
        recordId: 101,
        nickName: '닉네임1',
        emotion: 'Happy',
        spotifyMusic: {
          spotifyId: 45,
          title: '노래제목',
          artist: '아티스트 이름',
          albumImage: '앨범 이미지1 링크',
        },
        comment: '행복하당!',
        createdAt: '2025-01-23 13:40',
      },
      {
        recordId: 102,
        nickName: '닉네임2',
        emotion: 'Sad',
        spotifyMusic: {
          spotifyId: 32,
          title: '노래제목',
          artist: '아티스트 이름',
          albumImage: '앨범 이미지2 링크',
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
    // openSheet(); // 모달 열기
  };

  return (
    <div className="flex flex-col w-full gap-5 mt-5 h-fit">
      <SearchBar searchText={searchText} setSearchText={setSearchText} />

      {/* 감정 필터링 */}
      <div className="flex flex-col items-center gap-5">
        <h2 className="text-2xl font-saeeum text-gray-60">
          나와 같은 감정을 느끼는 사람을 찾아보세요
        </h2>
        <EmotionFilter onEmotionClick={onEmotionClick} selectedEmotion={selectedEmotion} />
      </div>
      {/* 메인카드 리스트 */}
      <div className="flex flex-col items-center gap-2.5 pb-5">
        {mockPostData.records.map((record) => (
          <div className="w-full" key={record.recordId}>
            <div onClick={() => handleOpenSheet(record.recordId)}>
              <MainCard
                nickname="작성자닉네임" // 닉네임
                emotion={record.emotion} // 감정
                title={record.spotifyMusic.title} // 노래 제목
                artist={record.spotifyMusic.artist} // 가수
                content={record.comment} // 글 내용
                date={formatDate(record.createdAt)} // 날짜
                isChatting={true} // 현재 채팅중인지
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
    </div>
  );
}

export default Home;

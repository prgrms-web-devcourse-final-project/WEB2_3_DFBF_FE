import ChatHistoryCard from '@/components/ChatHistoryCard';

export default function Chat({}) {
  const mockItems = [
    {
      record_id: 101,
      user_id: 1,
      emotion: {
        emotion_id: 1,
        name: 'Happy',
      },
      spotify_music: {
        spotify_id: 45,
        title: '노래제목',
        artist: '아티스트 이름',
        album_image:
          'https://i.namu.wiki/i/0FA-5SmcHSSGo7YD0RQvIBZKoU5d7BOKRVwoA4_RAeOx3HaNJT10ooyh55o4pC99vl2t5O5zzhILwwUougwJA9k8d6LHKGKAn3FylKTC4CIc378HalGwUBQG-phZjWU7lvjJ9LzkY3HEC0Bp72_I2Q.webp',
      },
      comment: '행복하당!',
      created_at: '2025-02-19T11:00:00Z',
    },
    {
      record_id: 102,
      user_id: 2,
      emotion: {
        emotion_id: 3,
        name: 'Sad',
      },
      spotify_music: {
        spotify_id: 32,
        title: '노래제목',
        artist: '아티스트 이름',
        album_image: null,
      },
      comment: '슬프다ㅠㅠ',
      created_at: '2025-01-31T14:00:00Z',
    },
  ];
  return (
    <div className="w-full mt-[12px] mb-[58px] flex flex-col gap-4">
      {mockItems.map((item) => (
        <ChatHistoryCard item={item} key={item.record_id} />
      ))}
    </div>
  );
}

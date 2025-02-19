import ChatHistoryCard from '@/components/ChatHistoryCard';

export default function Chat({}) {
  const mockData = [
    {
      chatroom_id: 3,
      nickname: '길동이',
      emotion: '행복한',
      spotify_id: 33,
      title: '라일락',
      artist: '아이유',
      album_image:
        'https://i.namu.wiki/i/L4gbrOjwTsNcvpsCq8b4P-3eX9Cs0lrIvwHxtFE7S5jaeMsbdelvBqCLMwe6AJJw2zBQqSI4wE0_Qn-EwaeZdnLvseFvt1w9dg-xo9KrFF_GacO_R7BnHI6XRyDDXvr-PHMmSEnqgcrzLjdbQF9obA.webp',
      created_at: '2025-02-19',
    },
    {
      chatroom_id: 1,
      nickname: '철수',
      emotion: '우울한',
      spotify_id: 88,
      title: 'Blue Sky',
      artist: 'Cool Band',
      album_image: null,
      created_at: '2025-02-10',
    },
  ];
  return (
    <div className="w-full mt-[12px] mb-[58px] flex flex-col gap-4">
      {mockData.map((item) => (
        <ChatHistoryCard item={item} key={item.chatroom_id} />
      ))}
    </div>
  );
}
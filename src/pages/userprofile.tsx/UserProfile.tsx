import EmotionRecordCard from '@/components/EmotionRecordCard';
import InfoMessage from '@/components/InfoMessage';
import MusicCard from '@/components/MusicCard';
import { useState } from 'react';

// 마이페이지 / 유저페이지 동시에 사용
function UserProfile() {
  const [posts, setPosts] = useState([]); // 게시물
  const musicInfo = {
    spotifyId: 33,
    title: '라일락',
    artist: '아이유',
    album_image:
      'https://i.namu.wiki/i/L4gbrOjwTsNcvpsCq8b4P-3eX9Cs0lrIvwHxtFE7S5jaeMsbdelvBqCLMwe6AJJw2zBQqSI4wE0_Qn-EwaeZdnLvseFvt1w9dg-xo9KrFF_GacO_R7BnHI6XRyDDXvr-PHMmSEnqgcrzLjdbQF9obA.webp',
  };
  return (
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
      {posts.length > 0 ? (
        //   기본으로 2열이다가 크기가 500px가 넘어가면 3열로 변경
        <div className="grid grid-cols-2 min-[500px]:grid-cols-3 gap-x-3 gap-y-6 ">
          <EmotionRecordCard
            emotion="HAPPY"
            albumImage="https://pbs.twimg.com/media/E68WkI4VIAIW8eT.jpg"
            songTitle="Hype Boy"
            artistName="NewJeans"
            date="2025.02.20"
          />
          <EmotionRecordCard
            emotion="HAPPY"
            albumImage="https://pbs.twimg.com/media/E68WkI4VIAIW8eT.jpg"
            songTitle="Hype Boy"
            artistName="NewJeans"
            date="2025.02.20"
          />
          <EmotionRecordCard
            emotion="HAPPY"
            albumImage="https://pbs.twimg.com/media/E68WkI4VIAIW8eT.jpg"
            songTitle="Hype Boy"
            artistName="NewJeans"
            date="2025.02.20"
          />
          <EmotionRecordCard
            emotion="HAPPY"
            albumImage="https://pbs.twimg.com/media/E68WkI4VIAIW8eT.jpg"
            songTitle="Hype Boy"
            artistName="NewJeans"
            date="2025.02.20"
          />
          <EmotionRecordCard
            emotion="HAPPY"
            albumImage="https://pbs.twimg.com/media/E68WkI4VIAIW8eT.jpg"
            songTitle="Hype Boy"
            artistName="NewJeans"
            date="2025.02.20"
          />
          <EmotionRecordCard
            emotion="HAPPY"
            albumImage="https://pbs.twimg.com/media/E68WkI4VIAIW8eT.jpg"
            songTitle="Hype Boy"
            artistName="NewJeans"
            date="2025.02.20"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <InfoMessage text="포스트가 비어있어요" />
        </div>
      )}
    </div>
  );
}

export default UserProfile;

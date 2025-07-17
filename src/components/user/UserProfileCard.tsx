import { MusicCard } from '@/components';

interface UserProfileCardProps {
  userData: UserInfo;
}

// 유저 프로필 UI
const UserProfileCard = ({ userData }: UserProfileCardProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center">
        <span className="h3-b">{userData?.nickname}</span>
        <span className="caption-m text-gray-60">@{userData?.loginId}</span>
      </div>

      <MusicCard
        title={userData?.profileMusic.title}
        artist={userData?.profileMusic.artist}
        image={userData?.profileMusic.album}
        spotifyId={userData?.profileMusic.spotifyId}
        rightElement="play"
      />
    </div>
  );
};

export default UserProfileCard;

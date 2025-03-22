import MusicCard from '@/components/MusicCard';

// 유저 프로필 UI
const ProfileInfoView = ({ userData }: { userData: UserInfo }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center">
        <span className="h3-b">{userData?.nickname}</span>
        <span className="caption-m text-gray-60">@{userData?.loginId}</span>
      </div>

      <MusicCard
        title={userData?.profileMusic?.title}
        artist={userData?.profileMusic?.artist}
        image={userData?.profileMusic?.album}
        spotifyId={userData?.profileMusic?.spotifyId}
        rightElement="play"
      />
    </div>
  );
};

export default ProfileInfoView;

interface ProfileMusic {
  album: string;
  artist: string;
  spotifyId: number;
  title: string;
}

interface UserInfo {
  loginId: string;
  nickname: string;
  profileMusic: ProfileMusic;
}

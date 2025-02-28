interface ProfileMusic {
  album: string;
  artist: string;
  spotifyId: string;
  title: string;
}

interface UserInfo {
  loginId: string;
  nickname: string;
  profileMusic: ProfileMusic;
}

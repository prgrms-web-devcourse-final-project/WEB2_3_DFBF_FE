interface SpotifyMusic {
    album: {
      album_type: string;
      artists: SpotifyArtist[];
      available_markets: string[];
      external_urls: { spotify: string };
      href: string;
      id: string;
      images?: { url: string; height: number; width: number }[];
      name: string;
      release_date?: string;
      release_date_precision?: string;
      total_tracks?: number;
      type: string;
      uri: string;
    };
    artists: SpotifyArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: { isrc: string };
    external_urls: { spotify: string };
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: string;
    uri: string;
  }
  
  interface SpotifyArtist {
    external_urls: { spotify: string };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }
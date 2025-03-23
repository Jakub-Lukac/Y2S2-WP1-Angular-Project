export interface ArtistResponse {
    artists: {
      items: Artist[];
    };
}

export interface Artist {
  id: string;
  name: string;
  followers: {
    total: number;
  };
  images: { url: string; height: number; width: number }[];
  popularity: number;
}
  

  
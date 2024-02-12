export type MovieProps = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  original_name: string;
};

export type TvShowProps = {
  id: number;
  original_name: string;
  name: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  first_air_date: string;
};

export type CardSearchProps = {
  id: number;
  title: string;
  original_name: string;
  original_title: string;
  name: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  first_air_date: string;
  release_date: string;
  media_type: string;
};

export type CardAnimeProps = {
  mal_id: number;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    }
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string;
  type: string;
  episode: number;
  status: string;
  aired: {
    from: string;
    to: string;
    prop: {
      from: {
        day: number;
        month: number;
        year: number;
      };
      to: {
        day: number;
        month: number;
        year: number;
      };
    };
    string: string;
  };
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  synopsis: string;
  season: string;
  fall:string;
  broadcast: string;
  producers: string;
  studios: string;
  genres: string;
}
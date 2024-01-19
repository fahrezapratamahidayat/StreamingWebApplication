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
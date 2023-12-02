import axios from "axios";

export const SearchMovie = async (q: any) => {
  const getSearchMovieList = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_MOVIE_BASE_URL}/search/movie?query=${q}`,
    params: { language: "en-US", page: "1" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_TOKEN}`,
    },
  };
  const search = await axios.request(q);
  return search.data
}
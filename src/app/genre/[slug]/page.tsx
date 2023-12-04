"use client";
import CardPoster from "@/components/card/CardPosterMovies";
import Sidebar from "@/components/sidebar/Sidebar";
import { MovieContext } from "@/context/DataMovies";
import { movieSidebaritem } from "@/utils/ItemSidebar";
import axios from "axios";
import { useEffect, useState, useContext } from "react";

type genrePageProps = {
  params: {
    slug: string;
  };
};

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  original_title: string;
};

const movieList = {
  method: "GET",
  url: `${process.env.NEXT_PUBLIC_MOVIE_BASE_URL}/movie/now_playing`,
  params: { language: "en-US", page: "1" },
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_TOKEN}`,
  },
};

const getPopularMoviesList = {
  method: "GET",
  url: `${process.env.NEXT_PUBLIC_MOVIE_BASE_URL}/movie/popular`,
  params: { language: "en-US", page: "1" },
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_TOKEN}`,
  },
};

export default function GenrePage(props: genrePageProps) {
  const { params } = props;
  const [genre, setGenre] = useState([]);
  const [movies, setMovies] = useState<any>([]);

  const fetchData = async () => {
    const snapshot = await axios.request(movieList);
    const filteredMovie = snapshot.data.results.filter((movie : Movie) => !movies.some(
      (m: Movie) => m.id === movie.id
    ));
    setMovies(filteredMovie);
  };

  const getPopularMovies = async () => {
    const snapshot = await axios.request(getPopularMoviesList);
    const filteredMovie = snapshot.data.results.filter((movie : Movie) => !movies.some(
      (m: Movie) => m.original_title === movie.original_title
    ));
    setMovies(filteredMovie);
  };

  useEffect(() => {
    const fetchDataApi = async () => {
      await fetchData();
      await getPopularMovies();
    };
    fetchDataApi();
  }, []);

  let title;
  if (params.slug === "28") {
    title = "Action";
  } else if (params.slug === "16") {
    title = "Animation";
  } else if (params.slug === "16") {
    title = "Animation";
  } else if (params.slug === "35") {
    title = "Comedy";
  } else if (params.slug === "80") {
    title = "Crime";
  } else if (params.slug === "99") {
    title = "Documentary";
  } else if (params.slug === "18") {
    title = "Drama";
  } else if (params.slug === "10751") {
    title = "Family";
  } else if (params.slug === "14") {
    title = "Fantasy";
  } else if (params.slug === "36") {
    title = "History";
  } else if (params.slug === "27") {
    title = "Horror";
  } else if (params.slug === "10402") {
    title = "Music";
  } else if (params.slug === "9648") {
    title = "Mystery";
  } else if (params.slug === "1079") {
    title = "Romance";
  } else if (params.slug === "878") {
    title = "Science Fiction";
  } else if (params.slug === "53") {
    title = "Thriller";
  } else if (params.slug === "10752") {
    title = "War";
  } else if (params.slug === "37") {
    title = "Western";
  } else if (params.slug === "12") {
    title = "Adventure";
  } else title = "";
  

  
  return (
    <>
      <Sidebar items={movieSidebaritem}/>
      <div className="flex flex-col ml-[21rem] w-auto h-auto">
        <div className="mt-[5rem]">
          <CardPoster data={movies} title={`Genre : ${title}`} />
        </div>
      </div>
    </>
  );
}

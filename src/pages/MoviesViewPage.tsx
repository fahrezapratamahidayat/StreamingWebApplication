'use client'
import CardPosterMovies from "@/components/card/CardPosterMovies";
import { ApiOptions } from "@/services/DataApi";
import axios from "axios";
import { useEffect, useState,  } from "react";

const getPlayingMoviesList = {
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

const getTopRatedMoviesList = {
  method: "GET",
  url: `${process.env.NEXT_PUBLIC_MOVIE_BASE_URL}/movie/top_rated`,
  params: { language: "en-US", page: "1" },
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_TOKEN}`,
  },
};

const getUpComingMovieList = {
  method: "GET",
  url: `${process.env.NEXT_PUBLIC_MOVIE_BASE_URL}/movie/upcoming`,
  params: { language: "en-US", page: "1" },
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_TOKEN}`,
  },
};

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  original_title: string;
};

export default function Home() {
  const [playing, setPlaying] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upComingMovies, setUpComingMovies] = useState([]);

  const fetchData = async () => {
    const snapshot = await axios
      .request(getPlayingMoviesList)
      .then(function (response) {
        setPlaying(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const fetchDataPopularMovies = async () => {
    const snapshot = await axios
      .request(getPopularMoviesList)
      .then(function (response) {
        setPopularMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const fetchDataTopRatedMovies = async () => {
    const snapshot = await axios
      .request(getTopRatedMoviesList)
      .then(function (response) {
        setTopRatedMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const fetchDataUpComingMovies = async () => {
    const snapshot = await axios
      .request(getUpComingMovieList)
      .then(function (response) {
        setUpComingMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
    fetchDataPopularMovies();
    fetchDataTopRatedMovies();
    fetchDataUpComingMovies();
  }, []);

  return (
    <>
      <div className="flex flex-col lg:ml-[19.8rem] pt-[4rem] lg:pt-0">
        <div className="mt-[5rem]">
        </div>
        {playing && upComingMovies && topRatedMovies && popularMovies && (
          <>
            <CardPosterMovies title={`Now Playing`} data={playing} />
            <CardPosterMovies title={`Popular`} data={popularMovies} className="mt-[3.5rem]"/>
            {CardPosterMovies({
              title: `Top Rated`,
              className: "mt-[3.5rem]",
              data: topRatedMovies.filter(
                (movie: Movie) => movie.vote_average > 8.5
              ),
            })}
            <CardPosterMovies title={`Upcoming`} data={upComingMovies} className="mt-[3.5rem]"/>
          </>
        )}
      </div>
    </>
  );
}

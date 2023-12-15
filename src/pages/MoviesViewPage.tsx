'use client'
import CardPosterMovies from "@/components/card/CardPosterMovies";
import {FetchingData } from "@/services/DataApi";
import { useEffect, useState} from "react";

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
    try {
      const res = await FetchingData('movie/now_playing');
      setPlaying(res.results)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchDataPopularMovies = async () => {
    try {
      const res = await FetchingData('movie/popular');
      setPopularMovies(res.results)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchDataTopRatedMovies = async () => {
    try {
      const res = await FetchingData('movie/top_rated');
      setTopRatedMovies(res.results)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchDataUpComingMovies = async () => {
    try {
      const res = await FetchingData('/movie/upcoming');
      setUpComingMovies(res.results)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataPopularMovies();
    fetchDataTopRatedMovies();
    fetchDataUpComingMovies();
  }, []);

  return (
    <>
      <div className="flex flex-col lg:ml-[19rem] pt-[4rem] lg:pt-0 lg:mr-5">
        <div className="mt-[5rem]">
        </div>
        {playing && upComingMovies && topRatedMovies && popularMovies && (
          <>
            <CardPosterMovies title={`Now Playing`} data={playing} />
            <CardPosterMovies title={`Popular`} data={popularMovies} className="ml"/>
            {CardPosterMovies({
              title: `Top Rated`,
              className: "]",
              data: topRatedMovies.filter(
                (movie: Movie) => movie.vote_average > 8.5
              ),
            })}
            <CardPosterMovies title={`Upcoming`} data={upComingMovies} className=""/>
          </>
        )}
      </div>
    </>
  );
}

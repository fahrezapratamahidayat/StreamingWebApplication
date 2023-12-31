"use client";
import CardPosterMovies from "@/components/card/CardPosterMovies";
import { NavbarContext } from "@/context/NavbarContext";
import { FetchingData, fetchData } from "@/services/DataApi";
import { Children, useContext, useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  original_title: string;
};

export default function Home({ children }: { children: React.ReactNode }) {
  // const [playing, setPlaying] = useState([]);
  // const [popularMovies, setPopularMovies] = useState([]);
  // const [topRatedMovies, setTopRatedMovies] = useState([]);
  // const [upComingMovies, setUpComingMovies] = useState([]);
  const navbarContext = useContext(NavbarContext);
  const { showNavbar, setShowNavbar } = navbarContext;

  // const fetchDataPlaying = async () => {
  //   const res = await fetchData("movie/now_playing");
  //   setPlaying(res.results);
  // };

  // const fetchDataPopularMovies = async () => {
  //   const res = await fetchData("movie/popular");
  //   setPopularMovies(res.results);
  // };

  // const fetchDataTopRatedMovies = async () => {
  //   const res = await fetchData("movie/top_rated");
  //   setTopRatedMovies(res.results);
  // };

  // const fetchDataUpComingMovies = async () => {
  //   const res = await fetchData("/movie/upcoming");
  //   setUpComingMovies(res.results);
  // };

  // useEffect(() => {
  //   fetchDataPlaying();
  //   fetchDataPopularMovies();
  //   fetchDataTopRatedMovies();
  //   fetchDataUpComingMovies();
  // }, []);

  return (
    <>
      <div
        className={`flex flex-col ${
          showNavbar
            ? "lg:ml-[19rem] transition-all ease-in"
            : "lg:ml-[4rem] transition-all ease-out"
        } pt-[4rem] lg:pt-0 lg:mr-5`}
      >
        <div className="mt-[5rem]">{children}</div>
        {/* {playing && upComingMovies && topRatedMovies && popularMovies && (
          <>
            <CardPosterMovies title={`Now Playing`} data={playing} />
            <CardPosterMovies
              title={`Popular`}
              data={popularMovies}
              className="ml"
            />
            {CardPosterMovies({
              title: `Top Rated`,
              className: "]",
              data: topRatedMovies.filter(
                (movie: Movie) => movie.vote_average > 8.5
              ),
            })}
            <CardPosterMovies
              title={`Upcoming`}
              data={upComingMovies}
              className=""
            />
          </>
        )} */}
      </div>
    </>
  );
}

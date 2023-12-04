import CardPosterMovies from "@/components/card/CardPosterMovies";
import { ApiOptions } from "@/services/DataApi";
import axios from "axios";
import { Inter, Montserrat, Moul, Poppins } from "next/font/google";
import { useEffect, useState, useContext } from "react";

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
      <div className="flex flex-col ml-[21rem] w-auto h-auto">
        <div className="mt-[5rem]">
          {/* <div className="relative ">
            <Image
              width={1072}
              height={440}
              priority={true}
              className="h-[27.5rem] w-[67rem] object-cover rounded-[0.65rem]"
              src="https://www.koimoi.com/wp-content/new-galleries/2023/07/oppenheimer-full-movie-in-hd-leaked-online-christopher-nolans-biographical-thriller-faces-wrath-of-piracy-is-available-to-download-illegally.jpg"
              alt=""
            />
            <div className="overlay absolute top-0 left-0 h-full w-full rounded-[0.65rem]"></div>
            <div className="absolute top-0 left-0 h-full w-full ">
              <div className="mt-[2.94rem] ml-[3.5rem]">
                <h1
                  className={` font-poppins flex-shirnk-0 w-[20.1875rem] h-[5.5626rem] text-white font-bold text-[2.125rem]`}
                >
                  OPPENHEIMER
                </h1>
                <div className="flex mt-[1.44rem] items-center gap-[0.69rem]">
                  <h4 className="text-[#828486] text-[1.25rem] font-semibold">
                    2023
                  </h4>
                  <div className="flex items-center justify-center bg-[#0F172A] w-[2.5rem]  h-[1.5625rem] rounded-[0.1875rem]">
                    <h4 className="text-white text-[1.25rem] font-semibold">
                      8.5
                    </h4>
                  </div>
                </div>
                <h4 className="text-[#828486] text-[1rem] mt-[1.65rem] font-semibold">
                  Biograpy, Drama, History
                </h4>
                <p className="w-[25.5rem] mt-[1.25rem] text-[#828486] text-[1rem] font-semibold">
                  The Story Of American Scientist, J, Robert Oppenheimer, And
                  his role in the development of the atomic bomb.
                </p>
                <button
                  className={`font-poppins flex items-center text-white w-[10.625rem] h-[3.125rem] mt-[1.81rem] bg-[#FC0000] rounded-[0.625rem] text-[1.125rem] font-bold`}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-[0.75rem] mr-[0.5rem]"
                  >
                    <g id="play-circle">
                      <path
                        id="Vector"
                        d="M14 25.6667C20.4433 25.6667 25.6667 20.4434 25.6667 14C25.6667 7.55672 20.4433 2.33337 14 2.33337C7.55669 2.33337 2.33334 7.55672 2.33334 14C2.33334 20.4434 7.55669 25.6667 14 25.6667Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        id="Vector_2"
                        d="M11.6667 9.33337L18.6667 14L11.6667 18.6667V9.33337Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                  Watch Now
                </button>
              </div>
            </div>
          </div> */}
        </div>
        {playing && upComingMovies && topRatedMovies && popularMovies && (
          <>
            <CardPosterMovies title={`Now Playing`} data={playing} />
            <CardPosterMovies title={`Popular`} data={popularMovies} />
            {CardPosterMovies({
              title: `Top Rated`,
              data: topRatedMovies.filter(
                (movie: Movie) => movie.vote_average > 8.5
              ),
            })}
            <CardPosterMovies title={`Upcoming`} data={upComingMovies} />
          </>
        )}
      </div>
    </>
  );
}

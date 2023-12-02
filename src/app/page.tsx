"use client";
import { useContext, useEffect, useState } from "react";
import CardPoster from "@/components/card/CardPosterMovies";
import Link from "next/link";
import { Inter, Montserrat, Moul, Poppins } from "next/font/google";
import Sidebar from "@/components/sidebar/Sidebar";
import Homeviews from "@/pages/MoviesViewPage";
import { trendingAllDay } from "@/services/DataApi";
import axios from "axios";
import Image from "next/image";

const monstserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-monstserrat",
});

type Movie = {
  id: number;
  name: string;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  original_name: string;
  original_title: string;
};

interface CardProps {
  title: string;
  data: Movie[];
}

export default function Home() {
  const [trending, setTrending] = useState([]);
  const getTrendingAll = async () => {
    const snapshot = await axios.request(trendingAllDay);
    setTrending(snapshot.data.results);
  };

  useEffect(() => {
    getTrendingAll();
  }, []);
  
  return (
    <>
      <div className="min-h-screen bg-black ">
        <div className="flex">
          <div className="mt-[16px] mr-[5.6rem]">
            <h2 className="text-white font-semibold text-[1.5rem]">trending</h2>
            <div className="grid grid-cols-6 gap-[26px] mt-[18px]">
              {trending.map((movie: Movie) => (
                <div
                  className="flex flex-col  justify-center items-start gap-[5px]"
                  key={movie.id}
                >
                  <Link
                    href={`/movies/${movie.id}`}
                    scroll={false}
                    className="cursor-pointer w-auto h-auto"
                  >
                    <Image
                      width={157}
                      height={308}
                      priority
                      className="rounded-xl "
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </Link>
                  {/* <p className="text-white">
                  {movie.title || movie.original_name || movie.original_title || movie.name}
                  </p>
                  <div className="flex items-center justify-between w-full ">
                    <p
                      className={`${monstserrat.variable} px-[1px] py-[1px] bg-[#0b111f] rounded-[0.1875rem] font-monstserrat text-[16px] text-slate-400`}
                    >
                      {movie.release_date || ""}
                    </p>
                    <div className="flex items-center rounded-[0.1875rem]">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 7.4H12.3667L10 0L7.63333 7.4H0L6.16667 11.9667L3.83333 19.3333L10 14.7667L16.1667 19.3333L13.8 11.9333L20 7.4Z"
                          fill="#FFCE31"
                        />
                      </svg>
                      <p
                        className={`${monstserrat.variable} font-monstserrat text-[16px] text-slate-400`}
                      >
                        {movie.vote_average.toFixed(1)}
                      </p>
                    </div>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

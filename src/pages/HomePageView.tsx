"use client";
import { useContext, useEffect, useState } from "react";
import CardPoster from "@/components/card/CardPosterMovies";
import Link from "next/link";
import { Inter, Montserrat, Moul, Poppins } from "next/font/google";
import Sidebar from "@/components/sidebar/Sidebar";
import Homeviews from "@/pages/MoviesViewPage";
import { FetchingData, fetchData } from "@/services/DataApi";
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

export default function HomePageView() {
  const [trending, setTrending] = useState([])

  const data = async () => {
    const res = await fetchData('trending/all/day');
    setTrending(res.results)
  };
  

  useEffect(() => {
    data();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-black mx-5 pt-[2rem] lg:pt-0">
        <div className="flex">
          <div className="mt-[16px] ">
            <h2 className="text-white font-semibold text-[1.5rem]">trending</h2>
            <div className="flex flex-wrap gap-[20px] mt-[18px]">
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
                      width={124} // default 157
                      height={170} // default 308
                      priority
                      className="rounded-xl "
                      src={`${process.env.NEXT_PUBLIC_MOVIE_API_BASEIMG}/${movie.poster_path}`}
                      alt={movie.title || movie.original_name}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

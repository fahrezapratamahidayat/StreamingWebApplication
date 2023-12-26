"use client";
import { NavbarContext } from "@/context/NavbarContext";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

const options = {
  method: "GET",
  url: `${process.env.NEXT_PUBLIC_MOVIE_BASE_URL}/movie/now_playing`,
  params: { language: "en-US", page: "1" },
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_TOKEN}`,
  },
};

const monstserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-monstserrat",
});

type TvShows = {
    id:number;
    original_name:string;
    name:string
    overview:string;
    poster_path:string
    vote_average:number
    first_air_date:string
};

interface CardProps {
  title: string;
  data: TvShows[];
  className?: string;
}
export default function CardPosterTvShows({ title, data,className }: CardProps) {
  const navbarContext = useContext(NavbarContext);
  const { showNavbar, setShowNavbar } = navbarContext;
  return (
    <>
      <div className={`${className} lg:mr-[1.2rem] transition-all ${showNavbar ? "ease-in" : "ease-out"}`}>
        <h2 className="text-white font-semibold text-2xl lg:mx-0 mx-2 ">{title}</h2>
        <div className={`grid ${showNavbar ? "lg:grid-cols-7" : "lg:grid-cols-9"} grid-cols-3 lg:mx-0 mx-2 gap-2 lg:gap-[26px] mt-[18px]`}>
          {data.map((movie: TvShows) => (
            <div
              className="flex flex-col justify-center items-start gap-[5px]"
              key={movie.id}
            >
              <Link
                href={`/tv/${movie.id}`}
                scroll={false}
                className="cursor-pointer transition hover:scale-105 w-auto h-auto"
              >
                <Image
                  width={124} // default 157
                  height={170} // default 308
                  className="rounded-xl "
                  priority
                  src={`${process.env.NEXT_PUBLIC_MOVIE_API_BASEIMG}/${movie.poster_path}`}
                  alt={movie.name}
                />
              </Link>
              <p className="text-white text-sm">
                {movie.name.length > 14
                  ? movie.name.substr(0, 14) + "..."
                  : movie.name}
              </p>
              <div className="flex items-center justify-between w-full">
                <p
                  className={`${monstserrat.variable} px-[2px] py-[1px] rounded-[0.1875rem] font-monstserrat text-sm text-slate-400 `}
                >
                  {movie.first_air_date.substr(0, 4)}
                </p>
                <div className="flex items-center rounded-[0.1875rem]">
                  <svg
                    width="12"
                    height="12"
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
                    className={`${monstserrat.variable} font-monstserrat text-sm text-slate-400 `}
                  >
                    {movie.vote_average.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

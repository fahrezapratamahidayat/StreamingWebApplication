"use client";
import axios from "axios";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

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

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  original_name: string;
};

interface CardProps {
  title: string;
  data: Movie[];
}
export default function CardPosterMovies({ title, data }: CardProps) {
  return (
    <>
      <div className="mt-[16px] mr-[5.6rem]">
        <h2 className="text-white font-semibold text-[1.5rem]">{title}</h2>
        <div className="flex flex-wrap gap-[26px] mt-[18px]">
          {data.map((movie: Movie) => (
            <div
              className="flex flex-col justify-center items-start gap-[5px]"
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
              <p className="text-white">
                {movie.title.length > 14
                  ? movie.title.substr(0, 14) + "..."
                  : movie.title}
              </p>
              <div className="flex items-center justify-between w-full ">
                <p
                  className={`${monstserrat.variable} px-[1px] py-[1px] bg-[#0b111f] rounded-[0.1875rem] font-monstserrat text-[16px] text-slate-400`}
                >
                  {movie.release_date.substr(0, 4)}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

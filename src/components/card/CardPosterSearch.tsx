"use client";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

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

type CardSearchProps = {
    id:number;
    title: string
    original_name:string;
    original_title:string
    name:string
    overview:string;
    poster_path:string
    vote_average:number
    first_air_date:string
    release_date:string
    media_type:string
};

interface CardProps {
  title: string;
  data: CardSearchProps[];
}
export default function CardPosterSearch({ title, data }: CardProps) {
  return (
    <>
      <div className="">
        <h2 className="text-white font-semibold text-base">{title}</h2>
        <div className="grid grid-cols-8 gap-[26px] mt-[18px]">
          {data.map((movie: CardSearchProps) => (
            <div
              className="flex flex-col justify-center items-start  gap-[5px] "
              key={movie.id}
            >
              <Link
                href={movie.media_type === "tv" ? `/tv/${movie.id}` : `/movies/${movie.id}`}
                scroll={false}
                className="cursor-pointer transition hover:scale-105 w-auto h-auto"
              >
                <Image
                  width={157}
                  height={308}
                  className="rounded-xl "
                  priority
                  src={`${process.env.NEXT_PUBLIC_MOVIE_API_BASEIMG}/${movie.poster_path}`}
                  alt={movie.original_title && movie.original_title || movie.original_name && movie.original_name}
                />
              </Link>
              <p className="text-sm text-white">
                {movie.title && movie.title.length > 14
                  ? movie.title.substr(0, 14) + "..."
                  : movie.title}
              </p>
              <p text-sm text-white>
                {movie.name && movie.name.length > 14
                  ? movie.name.substr(0, 14) + "..."
                  : movie.name}
              </p>
              <div className="flex items-center justify-between w-full">
                <p
                  className={`${monstserrat.variable} px-[2px] py-[1px] bg-[#0b111f] rounded-[0.1875rem] font-monstserrat text-sm text-slate-400`}
                >
                  {movie.first_air_date && movie.first_air_date.substr(0, 4) || movie.release_date && movie.release_date.substr(0, 4)}
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
                    className={`${monstserrat.variable} font-monstserrat text-sm text-slate-400`}
                  >
                    {movie.vote_average && movie.vote_average !== 0 ? movie.vote_average.toFixed(1) : "NR"}
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

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

type WatchListDataProps = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  media_type: string;
};

interface CardProps {
  title: string;
  data: WatchListDataProps[];
}
export default function CardPosterWatchList({ title, data }: CardProps) {
  return (
    <>
      <div className="">
        <h2 className="text-white font-semibold text-base">{title}</h2>
        <div className="grid lg:grid-cols-10 grid-cols-3 lg:mx-0 mx-2 gap-2 lg:gap-[26px] mt-[18px]">
          {data.map((item: WatchListDataProps) => (
            <div
              className="flex flex-col justify-center items-start  gap-[5px] "
              key={item.id}
            >
              <Link
                href={
                  item.media_type === "tv"
                    ? `/tv/${item.id}`
                    : `/movies/${item.id}`
                }
                scroll={false}
                className="cursor-pointer transition hover:scale-105 w-auto h-auto"
              >
                <Image
                  width={157}
                  height={308}
                  className="rounded-xl "
                  priority
                  src={`${process.env.NEXT_PUBLIC_MOVIE_API_BASEIMG}${item.poster_path}`}
                  alt={item.title}
                />
              </Link>
              <p className="text-sm text-white">
                {item.title && item.title.length > 11
                  ? item.title.substr(0, 11) + "..."
                  : item.title}
              </p>
              <div className="flex items-center justify-between w-full">
                <p
                  className={`${monstserrat.variable} px-[2px] py-[1px] bg-[#0b111f] rounded-[0.1875rem] font-monstserrat text-sm text-slate-400`}
                >
                  {(item.release_date && item.release_date.substr(0, 4)) ||
                    (item.release_date && item.release_date.substr(0, 4))}
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
                    {item.vote_average && item.vote_average !== 0
                      ? item.vote_average.toFixed(1)
                      : "NR"}
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

"use client";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { MotionDiv } from "../motion/FramerMotion";

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
  index: number;
  data: WatchListDataProps;
}
export default function CardPosterWatchList({ data, index }: CardProps) {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <>
      <MotionDiv
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: index * 0.25, ease: "easeInOut" }}
        viewport={{ amount: 0 }}
        className="flex flex-col justify-center items-start gap-[5px] mt-2 lg:mt-0 w-fit"
        key={data.id}
      >
        <Link
          href={
            data.media_type === "tv" ? `/tv/${data.id}` : `/movies/${data.id}`
          }
          scroll={false}
          className="cursor-pointer transition hover:scale-105 w-auto h-auto"
        >
          <Image
            width={123.5}
            height={170}
            className="rounded-md"
            priority
            src={`${process.env.NEXT_PUBLIC_MOVIE_API_BASEIMG}${data.poster_path}`}
            alt={data.title}
          />
        </Link>
        <p className="text-sm text-white">
          {data.title && data.title.length > 11
            ? data.title.substr(0, 11) + "..."
            : data.title}
        </p>
        <div className="flex items-center justify-between w-full">
          <p
            className={`${monstserrat.variable} px-[2px] py-[1px] rounded-[0.1875rem] font-monstserrat text-sm text-slate-400`}
          >
            {(data.release_date && data.release_date.substr(0, 4)) ||
              (data.release_date && data.release_date.substr(0, 4))}
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
              {data.vote_average && data.vote_average !== 0
                ? data.vote_average.toFixed(1)
                : "NR"}
            </p>
          </div>
        </div>
      </MotionDiv>
    </>
  );
}

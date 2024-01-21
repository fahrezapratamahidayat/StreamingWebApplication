"use client";
import { TvShowProps } from "@/types/CardProps";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { MotionDiv } from "../motion/FramerMotion";
import { useContext } from "react";
import { NavbarContext } from "@/context/NavbarContext";

const monstserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-monstserrat",
});

interface CardProps {
  tv: TvShowProps;
  index: number;
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function CardPosterTvShows({ tv, index }: CardProps) {
  const navbarContext = useContext(NavbarContext);
  const { showNavbar } = navbarContext;
  return (
    <>
      <MotionDiv
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: index * 0.25, ease: "easeInOut" }}
        viewport={{ amount: 0 }}
        className="flex flex-col justify-center items-start gap-[5px] mt-2 lg:mt-0 w-fit"
        key={tv.id}
      >
        <Link
          href={`/tv/${tv.id}`}
          scroll={false}
          // className="cursor-pointer  transition-transform ease-in-out duration-100 hover:scale-105 w-auto h-auto"
        >
          <MotionDiv
            variants={variants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Image
              width={showNavbar ? 122 : 123} // default 157
              height={170} // default 308
              className="rounded-md"
              priority
              src={`${process.env.NEXT_PUBLIC_MOVIE_API_BASEIMG}/${tv.poster_path}`}
              alt={tv.name}
            />
          </MotionDiv>
        </Link>
        <p className="text-white text-sm">
          {tv.name.length > 13 ? tv.name.substr(0, 13) + "..." : tv.name}
        </p>
        <div className="flex items-center justify-between w-full">
          <p
            className={`${monstserrat.variable} px-[2px] py-[1px] rounded-[0.1875rem] font-monstserrat text-sm text-slate-400 `}
          >
            {tv.first_air_date.substr(0, 4)}
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
              {tv.vote_average.toFixed(1)}
            </p>
          </div>
        </div>
      </MotionDiv>
    </>
  );
}

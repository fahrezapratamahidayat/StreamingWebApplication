"use client";
import { MotionDiv } from "@/components/motion/FramerMotion";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { MovieProps } from "@/types/CardProps";
import { useContext, useEffect, useState } from "react";
import { NavbarContext } from "@/context/NavbarContext";

const monstserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-monstserrat",
});

interface CardProps {
  movie: MovieProps;
  index: number;
}
export default function CardPosterMovies({ movie, index }: CardProps) {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const navbarContext = useContext(NavbarContext);
  const { showNavbar } = navbarContext;

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Mengatur event listener untuk mendeteksi perubahan ukuran layar
    window.addEventListener("resize", handleResize);

    // Membersihkan event listener saat komponen tidak lagi digunakan
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <MotionDiv
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: index * 0.25, ease: "easeInOut" }}
        viewport={{ amount: 0 }}
        className="flex flex-col justify-center items-start gap-[5px] mt-2 lg:mt-0 w-fit"
        key={movie.id}
      >
        <Link
          href={`/movies/${movie.id}`}
          scroll={false}
          className="cursor-pointer transition hover:scale-105 w-auto h-auto"
        >
            <Image
              width={showNavbar ? 122 : 123}
              height={170}
              priority
              className={`rounded-md`}
              src={`${process.env.NEXT_PUBLIC_MOVIE_API_BASEIMG}/${movie.poster_path}`}
              alt={movie.title}
            />
        </Link>
        <p className="text-white text-sm ">
          {movie.title && movie.title.length > 13
            ? movie.title.substr(0, 13) + "..."
            : movie.title}
        </p>
        <div className="flex items-center justify-between w-full">
          <p
            className={`${monstserrat.variable} px-[2px] py-[1px]  rounded-[0.1875rem] font-monstserrat text-sm text-slate-400 `}
          >
            {movie.release_date && movie.release_date.substr(0, 4)}
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
              {movie.vote_average && movie.vote_average.toFixed(1)}
            </p>
          </div>
        </div>
      </MotionDiv>
    </>
  );
}

"use client";
import { MotionDiv } from "@/components/motion/FramerMotion";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { CardAnimeProps } from "@/types/CardProps";
import { useContext, useState } from "react";
import { NavbarContext } from "@/context/NavbarContext";

const monstserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-monstserrat",
});

interface CardProps {
  anime: CardAnimeProps;
  index: number;
}
export default function CardPosteranimes({ anime, index }: CardProps) {
  const variants = {
    hmal_idden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const navbarContext = useContext(NavbarContext);
  const { showNavbar } = navbarContext;

  return (
    <>
      <MotionDiv
        variants={variants}
        initial="hmal_idden"
        animate="visible"
        transition={{ duration: 0.5, delay: index * 0.25, ease: "easeInOut" }}
        viewport={{ amount: 0 }}
        className="flex flex-col justify-center items-start gap-[5px] mt-2 lg:mt-0 w-fit"
        key={anime.mal_id}
      >
        <Link
          href={`/animes/${anime.mal_id}`}
          scroll={false}
          className="cursor-pointer transition hover:scale-105 w-auto h-auto"
        >
            <Image
              width={showNavbar ? 122 : 125.5}
              height={170}
              priority
              className={`rounded-md`}
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
            />
        </Link>
        <p className="text-white text-sm ">
          {anime.title && anime.title.length > 13
            ? anime.title.substr(0, 13) + "..."
            : anime.title}
        </p>
        <div className="flex items-center justify-between w-full">
          <p
            className={`${monstserrat.variable} px-[2px] py-[1px]  rounded-[0.1875rem] font-monstserrat text-sm text-slate-400 `}
          >
            {anime.aired.prop.from.year}
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
              {anime.score}
            </p>
          </div>
        </div>
      </MotionDiv>
    </>
  );
}

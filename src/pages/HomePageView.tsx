"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { fetchData } from "@/services/DataApi";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import { useSession } from "next-auth/react";

interface CustomSwiperOptions extends SwiperOptions {
  slidesPerColumn?: number;
  slidesPerColumnFill?: "column" | "row";
}

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

  return (
    <>
      <div className="min-w-full min-h-screen ">
        <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
          <h1
            className={`font-bold lg:text-7xl text-5xl text-white tracking-widest relative z-10`}
          >
            Santai{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500">
              Movies
            </span>
          </h1>
        </div>
      </div>
    </>
  );
}

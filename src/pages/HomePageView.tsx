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
  const [trending, setTrending] = useState([]);
  const [mingguan,setMingguan] = useState([])

  const day = async () => {
    const day = await fetchData("trending/all/day");
    const week = await fetchData("trending/all/week");
    const filter = day.results.filter(
      (day: any) => !week.results.some((week: any) => week.id === day.id)
    );
    setTrending(day.results);
  };

  // const week = async () => {
  //   const week = await fetchData("trending/all/week");
  //   const filter = week.results.filter(
  //     (item: any) => !trending.some((tren: any) => tren.id === item.id)
  //   );
  //   setMingguan(filter)
  // };

  useEffect(() => {
    day();
  }, []);

  return (
    <>
      <div className="min-w-full min-h-screen ">
        <div className="relative bg-black opacity-50 h-full w-full px-5 mt-">
          {/* <div className="grid grid-cols-10 grid-rows-10 gap-1 pt-[4rem] ">
            {trending.map((item: any) => (
              <Image
                width={500}
                height={500}
                alt={item.name}
                src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                key={item.id}
                className="object-cover rounded"
              />
            ))}
          </div> */}
        </div>
        <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
          <h1
            className={`font-bold text-7xl text-white tracking-widest relative z-10`}
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
const test = () => {
  {
    /* <Swiper
            {...swiperParams}
            className="text-white w-auto"
          >
            {trending &&
              trending.map((item: any) => (
                <SwiperSlide key={item.id} className="pt-[4rem]">
                  <Image
                    width={500}
                    height={500}
                    src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                    alt={item.id}
                    className="object-cover rounded-md"
                  />
                </SwiperSlide>
              ))}
          </Swiper> */
  }
};

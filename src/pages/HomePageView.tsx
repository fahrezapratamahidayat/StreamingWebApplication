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
  const [popular, setPopular] = useState([]);

  const data = async () => {
    const res = await fetchData("trending/all/day");
    setTrending(res.results);
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <>
      <div className="relative w-full min-h-screen ">
        <div className="bg-black opacity-50 h-full w-full px-5">
          <Swiper
            spaceBetween={10}
            slidesPerView={10}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="text-white w-auto"
          >
            {trending &&
              trending.map((item: any) => (
                <SwiperSlide key={item.id} className="pt-[4rem]">
                  <Image
                    width={200}
                    height={200}
                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                    alt={item.id}
                    className="object-cover rounded-md"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
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

"use client";
import { NavbarContext } from "@/context/NavbarContext";
import { FetchingData, fetchData } from "@/services/DataApi";
import axios from "axios";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type CardProps = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  name: string;
  overview: string;
  first_air_date: string;
  backdrop_path: string;
  original_name: string;
};

interface SimiliarProps {
  data: CardProps[];
}

export default function CardPosterSlider({ data }: SimiliarProps) {
  const navbarContext = useContext(NavbarContext);
  const { showNavbar, setShowNavbar } = navbarContext;

  const [swiperOptions, setSwiperOptions] = useState({
    slidesPerView: 4 || showNavbar ? 4 : 5,
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    modules: [Autoplay],
  })
  useEffect(() => {
    setSwiperOptions({
      ...swiperOptions,
      slidesPerView: showNavbar ? 4 : 5,
    })
  })
  return (
    <>
      <div className="pb-[2.rem] mr-[1rem]">
        <h1 className="text-white font-semibold text-base lg:mx-0 mx-2">
          You May Also Like
        </h1>
        <Swiper {...swiperOptions} className="mt-[1rem] h-[12rem]">
          {data.map((item: CardProps) => (
            <SwiperSlide key={item.id} className="w-auto h-auto">
              <Link href={`/tv/${item.id}`} scroll={false}>
                <Image
                  width={255}
                  height={250}
                  className="rounded-md"
                  src={`${process.env.NEXT_PUBLIC_MOVIE_API_BASEIMG}/${item.backdrop_path}`}
                  alt={item.name}
                />
              </Link>
              <p className="text-white text-base p-1 ">
                {item.name.length > 20
                  ? item.name.substr(0, 20) + "..."
                  : item.name}
              </p>
              <div className="flex items-center justify-between w-full p-1  ">
                <p
                  className={` px-[2px] py-[ px] rounded-[0.1875rem] font-monstserrat text-sm text-slate-400 `}
                >
                  {item.first_air_date.substr(0, 4)}
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
                  <p className={` font-monstserrat text-sm text-slate-400 `}>
                    {item.vote_average.toFixed(1)}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

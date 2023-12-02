import axios from "axios";
import { Inter, Montserrat, Moul, Poppins } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
});

const moul = Moul({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-moul",
});

const monstserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-monstserrat",
});

const movieSidebaritem = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

const Sidebar = ({ items }: any) => {
  return (
    <>
      <div className="pt-[5rem] fixed w-[285px]  h-full">
        <div className="pb-[1rem] flex flex-col items ml-[3.44rem] hover:overflow-y-auto h-[calc(100vh-5rem)] scrollbar-rounded-lg scrollbar scrollbar-track-gray-700 scrollbar-thumb-gray-900">
          <h2
            className={`${monstserrat.variable} font-monstserrat text-white font-semibold text-[1.125rem]`}
          >
            Genre
          </h2>
          <ul
            className={`${monstserrat.variable} font-monstserrat font-semibold mt-[0.8rem] text-[#828486] `}
          >
            {items.map((genre: any) => (
              <li key={genre.id}>
                <Link
                  className={`hover:text-white mt-[0.75rem] text-[1rem]`}
                  href={`/genre/${genre.id}?name=${encodeURIComponent(
                    genre.name
                  )}`}
                  scroll={false}
                >
                  {genre.name}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-[1.56rem] text-white font-semibold text-[1.125rem]">
            Libary
          </h2>
          <ul>
            <li className="mt-[0.75rem] text-[#828486] text-[1rem]">Recent</li>
            <li className="mt-[0.75rem] text-[#828486] text-[1rem]">
              Top Rated
            </li>
            <li className="mt-[0.75rem] text-[#828486] text-[1rem]">Likes</li>
          </ul>
          <h2 className="mt-[1.81rem] text-white font-semibold text-[1.125rem]">
            General
          </h2>
          <ul>
            <li className="mt-[0.75rem] text-[#828486] text-[1rem]">Logout</li>
            <li className="mt-[0.75rem] text-[#828486] text-[1rem]">
              Dark Mode
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

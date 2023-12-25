"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Inter, Montserrat, Moul, Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

const Sidebar = ({ items }: any) => {
  const [DropDown, setDropDown] = useState(true);
  const { data: session, status }: { data: any; status: string } =
    useSession() || {};
  const pathname = usePathname();
  return (
    <>
      <nav className="pt-[5rem] fixed w-[250px] h-full hidden lg:block">
        <div className="pb-[1rem] flex flex-col items px-5 overflow-y-auto overflow-sidebar h-[calc(100vh-5rem)] scrollbar-rounded-lg scrollbar scrollbar-track-gray-700 scrollbar-thumb-gray-900 transition-all">
          <h2
            className={`text-white font-semibold text-base cursor-pointer flex items-center`}
          >
            Genre
            {DropDown ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                className="ml-[0.5rem] cursor-pointer transition-all"
                onClick={() => setDropDown(!DropDown)}
              >
                <path
                  d="M1 1L7 7L13 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                className="ml-[0.5rem] cursor-pointer transition-all"
                onClick={() => setDropDown(!DropDown)}
              >
                <path
                  d="M13 7L7 1L1 7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </h2>
          <ul
            className={`font-semibold mt-[0.8rem] text-[#828486] transition-all`}
          >
            {items.map((genre: any) => (
              <li
                key={genre.id}
                className={`border-l border-slate-800 ${
                  DropDown ? "" : "hidden"
                } transition-all duration-500 ease-out`}
              >
                <Link
                  className={`hover:text-white mt-[0.75rem] text-sm ml-3
                  }`}
                  href={
                    pathname?.includes("tv")
                      ? `/tv/genre/${genre.id}?name=${genre.name.replace(
                          /\s+/g,
                          "+"
                        )}`
                      : `/movies/genre/${genre.id}?name=${genre.name.replace(
                          /\s+/g,
                          "+"
                        )}`
                  }
                  scroll={false}
                >
                  {genre.name}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-[1.56rem] text-white font-semibold text-base">
            Libary
          </h2>
          <ul>
            <li
              className="mt-[0.75rem] text-[#828486] text-sm 
      "
            >
              Recent
            </li>
            <li
              className="mt-[0.75rem] text-[#828486]  text-sm
                  "
            >
              Top Rated
            </li>
            <li className="mt-[0.75rem] text-[#828486] text-sm">
              <Link href="/watchlist">
                Watchlist
              </Link>
            </li>
          </ul>
          <h2 className="mt-[1.81rem] text-white font-semibold text-base">
            General
          </h2>
          <ul>
            {status && status === "authenticated" ? (
              <button
                className="mt-[0.75rem] text-sky-500 text-semibold text-sm"
                onClick={() => signOut()}
              >
                Logout
              </button>
            ) : (
              <button
                className="mt-[0.75rem] text-blue-500 text-sm"
                onClick={() => signIn()}
              >
                Login
              </button>
            )}
            <li className="mt-[0.75rem] text-[#828486] text-sm">Dark Mode</li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;

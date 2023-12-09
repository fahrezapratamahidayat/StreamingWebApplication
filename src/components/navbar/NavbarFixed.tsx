"use client";
import { Inter, Montserrat, Moul, Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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

export default function NavbarFixed() {
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearchForm = (event: any) => {
    event.preventDefault();
    setSearchValue(event.target.value);

    router.push(`/search?query=${searchValue.replace(/\s+/g, "+")}`);
    setSearchValue("");
  };

  return (
    <>
      <div
        className="fixed z-40 w-full backdrop-blur flex-none 
          transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10
        dark:border-slate-50/[0.06]  supports-backdrop-blur:bg-white/60 bg-transparent"
      >
        <div className="flex items-center px-5 py-3 justify-between">
          <h1
            className={`font-bold text-white text-2xl`}
          >
            Santai
          </h1>
          <ul className="flex items-center gap-[1.62rem] ml-[11.5rem]">
            <li
              className={`${
                pathname === "/" ? "text-white" : "text-[#939393]"
              } font-bold text-base hover:text-white  cursor-pointer `}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className={`${
                pathname?.startsWith("/movies")
                  ? "text-white"
                  : "text-[#939393]"
              } font-bold text-base hover:text-white cursor-pointer `}
            >
              <Link href="/movies">Movies</Link>
            </li>
            <li
              className={`${
                pathname?.startsWith("/tv") ? "text-white" : "text-[#939393]"
              } font-bold text-base hover:text-white cursor-pointer`}
            >
              <Link href="/tv">Tv Shows</Link>
            </li>
            <li
              className={`${
                pathname === "/animes" ? "text-white" : "text-[#939393]"
              } font-bold text-base hover:text-white cursor-pointer`}
            >
              Animes
            </li>
          </ul>
          <div className="relative flex items-center">
            <form onSubmit={handleSearchForm}>
              <div className="relative w-full">
                <input
                  className="block p-2 w-[13rem] z-20 text-sm rounded-md border-[1px] focus:ring-blue-500  bg-gray-700 border-s-gray-700  border-gray-600 placeholder-gray-400 text-white focus:border-blue-500"
                  placeholder="Search Movie and tv"
                  value={searchValue}
                  type="text"
                  onChange={(event) => setSearchValue(event.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="absolute top-0 end-0 h-full p-2.5  text-sm font-medium text-white"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

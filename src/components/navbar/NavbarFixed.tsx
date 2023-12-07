"use client";
import { Inter, Montserrat, Moul, Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

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
export default function NavbarFixed() {
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearchForm = (event: any) => {
    event.preventDefault();
    setSearchValue(event.target.value);

    router.push(`/search?query=${searchValue.replace(/\s+/g, '+')}`);
    setSearchValue("");
  };
  return (
    <>
      <div
        className="fixed z-40 w-full backdrop-blur flex-none 
          transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10
        dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent"
      >
        <div className="flex items-center px-5 py-3 justify-between">
          <h1
            className={`${poppins.variable} font-moul font-bold text-white text-2xl`}
          >
            Santai
          </h1>
          <ul className="flex items-center gap-[1.62rem] ml-[11.5rem]">
            <li
              className={`${inter.variable} font-inter ${
                pathname === "/" ? "text-white" : "text-[#939393]"
              } font-bold text-base hover:text-white cursor-pointer `}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className={`${inter.variable} font-inter ${
                pathname?.startsWith("/movies") ? "text-white" : "text-[#939393]"
              } font-bold text-base hover:text-white cursor-pointer `}

            >
              <Link href="/movies">Movies</Link>
            </li>
            <li
              className={`${inter.variable} font-inter ${
                pathname?.startsWith("/tv") ? "text-white" : "text-[#939393]"
              } font-bold text-base hover:text-white cursor-pointer`}
            >
              <Link href="/tv">Tv Shows</Link>
            </li>
            <li
              className={`${inter.variable} font-inter ${
                pathname === "/animes" ? "text-white" : "text-[#939393]"
              } font-bold text-base hover:text-white cursor-pointer`}
            >
              Animes
            </li>
          </ul>
          <div className="">
            <form onSubmit={handleSearchForm}>
              <div className="relative w-full">
                <input
                  className="block p-2 w-[13rem] z-20 text-sm rounded-md text-gray-900 bg-gray-50  border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
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

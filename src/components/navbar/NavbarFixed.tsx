"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function NavbarFixed() {
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState("");
  const [toggleNav, setToggleNav] = useState(false);
  const router = useRouter();
  const overlay: any = useRef(null);

  const handleSearchForm = (event: any) => {
    event.preventDefault();
    setSearchValue(event.target.value);

    router.push(`/search?query=${searchValue.replace(/\s+/g, "+")}`);
    setSearchValue("");
  };

  const handleShowNav = () => {
    if(toggleNav === false ){
      setToggleNav(true)
      document.body.classList.add("modal-open");
    }else {
      setToggleNav(false)
      document.body.classList.remove("modal-open");
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setToggleNav(false)
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (overlay.current && overlay.current.contains(event.target)) {
        setToggleNav(false)
        document.body.classList.remove("modal-open");
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [toggleNav]);

  
  return (
    <>
      <div
        className="fixed z-40 w-full backdrop-blur flex-none 
          transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10
        dark:border-slate-50/[0.06] supports-backdrop-blur:bg-white/60 bg-transparent"
      >
        <div className="flex items-center px-5 py-3 justify-between">
          <h1 className={`font-bold text-white text-2xl`}>Santai</h1>
          <ul className="lg:flex hidden items-center gap-[1.62rem] ml-[11.5rem]">
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
          <div className="lg:flex hidden relative items-center">
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
          <div className="lg:hidden flex items-center ">
            <div className="relative">
              <button className="" onClick={handleShowNav}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 10H3"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 6H3"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 14H3"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 18H3"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
              ref={overlay}
                className={`${
                  toggleNav ? "block" : "hidden"
                } fixed top-[3.5rem] left-0  bg-black/50  h-[99rem] w-full `}
              >
                <nav className="absolute top-0 w-full left-1/2 bg-black rounded shadow-md">
                  <ul className="flex flex-col gap-[1.62rem] p-5">
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
                        pathname?.startsWith("/tv")
                          ? "text-white"
                          : "text-[#939393]"
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
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg> */
}

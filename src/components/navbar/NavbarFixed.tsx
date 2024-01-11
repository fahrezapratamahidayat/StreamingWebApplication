"use client";
import { movieSidebaritem, tvShowsSidebarItem } from "@/utils/data";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function NavbarFixed() {
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState("");
  const [toggleNav, setToggleNav] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const router = useRouter();
  const overlay: any = useRef(null);
  const overlaySidebar: any = useRef(null);
  const searchFormRef: any = useRef(null);
  const [DropDown, setDropDown] = useState(true);
  const { data: status }: { data: any; status: string } =
    useSession() || {};
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchForm = (event: any) => {
    event.preventDefault();
    setSearchValue(event.target.value);

    if (searchValue.length > 1) {
      router.push(`/search?query=${searchValue.replace(/\s+/g, "+")}`, {
        scroll: false,
      });
      setToggleSearch(false);
      setSearchValue("");
    } else {
      alert("Please enter at least 2 characters");
      setSearchValue("");
    }
  };

  const handleShowNav = () => {
    if (toggleNav === false) {
      setToggleNav(true);
      document.body.classList.add("overflow-scroll");
    } else {
      setToggleNav(false);
      document.body.classList.remove("overflow-scroll");
    }
  };

  const handleShowSidebar = () => {
    if (toggleSidebar === false) {
      setToggleSidebar(true);
      document.body.classList.add("modal-open");
    } else {
      setToggleSidebar(false);
      document.body.classList.remove("modal-open");
    }
  };

  const handleSearchBar = () => {
    if (toggleSearch === false) {
      document.body.classList.add("modal-open");
      setToggleSearch(true);
    } else {
      document.body.classList.remove("modal-open");
      setToggleSearch(false);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setToggleNav(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (overlay.current && overlay.current.contains(event.target)) {
        setToggleNav(false);
        document.body.classList.remove("overflow-scroll");
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [toggleNav]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setToggleNav(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        overlaySidebar.current &&
        !overlaySidebar.current.contains(event.target)
      ) {
        setToggleSidebar(false);
        document.body.classList.remove("modal-open");
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [toggleSidebar]);

  return (
    <>
      <div
        className="fixed z-40 w-full backdrop-blur flex-none 
          transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10
        dark:border-slate-50/[0.06]  bg-transparent"
      >
        <div className="flex items-center px-5 py-3 ">
          <h1 className={`font-bold text-white text-2xl`}>Santai</h1>
          <ul className="lg:flex hidden items-center gap-[1.62rem] ml-[28rem]">
            <li
              className={`${
                pathname === "/"
                  ? "text-white border-b border-blue-500"
                  : "text-[#939393]"
              } font-bold text-base hover:text-white hover:border-b border-blue-500 cursor-pointer `}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className={`${
                pathname?.startsWith("/movies")
                  ? "text-white border-b border-blue-500"
                  : "text-[#939393]"
              } font-bold text-base hover:text-white hover:border-b border-blue-500 cursor-pointer `}
            >
              <Link href="/movies">Movies</Link>
            </li>
            <li
              className={`${
                pathname?.startsWith("/tv")
                  ? "text-white border-b border-blue-500"
                  : "text-[#939393]"
              } font-bold text-base hover:text-white cursor-pointer hover:border-b border-blue-500`}
            >
              <Link href="/tv">Tv Shows</Link>
            </li>
            <li
              className={`${
                pathname === "/animes"
                  ? "text-white border-b border-blue-500"
                  : "text-[#939393]"
              } font-bold text-base hover:text-white hover:border-b border-blue-500 cursor-pointer`}
            >
              <Link href="/animes">Animes</Link>
            </li>
          </ul>
          <div className="lg:flex hidden relative items-center ml-auto">
            <form onSubmit={handleSearchForm}>
              <div className="relative w-full">
                <button
                  type="submit"
                  className="absolute top-0 left-0 end-0 h-full p-2.5  text-sm font-medium text-white peer"
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
                <input
                  className={`${
                    searchValue || isFocused ? "bg-gray-700" : "bg-transparent"
                  } block text-white p-2 pl-[2rem] rounded-md placeholder-shown:w-0 peer-hover:bg-gray-700 peer-hover:w-[13rem] transition-all text-sm placeholder:text-sm focus:w-[13rem] focus:text-white w-[13rem] peer-focus:bg-gray-700`}
                  placeholder="Search Movie and tv "
                  value={searchValue}
                  type="text"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(event) => setSearchValue(event.target.value)}
                  required
                />
              </div>
            </form>
          </div>
          <div className="lg:hidden flex items-center ml-auto pr-2">
            <div className="relative">
              <button onClick={handleSearchBar}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 26"
                  fill="none"
                >
                  <path
                    d="M11 19.5C15.4183 19.5 19 15.9183 19 11.5C19 7.08172 15.4183 3.5 11 3.5C6.58172 3.5 3 7.08172 3 11.5C3 15.9183 6.58172 19.5 11 19.5Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 21.4999L16.65 17.1499"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                className={`${
                  toggleSearch ? "block" : "hidden"
                } fixed top-0 left-0 backdrop-blur-sm bg-black/80 h-[99rem] w-full z-[99]`}
              >
                <div className=" absolute w-full mt-[25%]  rounded shadow-md px-2">
                  <form onSubmit={handleSearchForm} ref={searchFormRef}>
                    <div className="bg-gray-700 rounded-lg h-[3.5rem] w-full flex items-center px-5 ">
                      <button>
                        <svg
                          className=""
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                        >
                          <path
                            d="M11 19.5C15.4183 19.5 19 15.9183 19 11.5C19 7.08172 15.4183 3.5 11 3.5C6.58172 3.5 3 7.08172 3 11.5C3 15.9183 6.58172 19.5 11 19.5Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M21 21.4999L16.65 17.1499"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="sr-only">Navigation</span>
                      </button>
                      <input
                        type="text"
                        value={searchValue}
                        className="ml-3 bg-transparent w-full mr-5 text-white focus:outline-none text-sm"
                        placeholder="Search Movie and tv"
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                    </div>
                  </form>
                  <button
                    onClick={() => setToggleSearch(false)}
                    className="absolute top-4 right-5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                    >
                      <path
                        d="M18 6.5L6 18.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 6.5L18 18.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="sr-only">close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:hidden flex items-center justify-between">
            <div className="relative">
              {toggleNav ? (
                <button className="" onClick={handleShowNav}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M18 6.5L6 18.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 6.5L18 18.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ) : (
                <button className="" onClick={handleShowNav}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
              <div
                ref={overlay}
                className={`${
                  toggleNav ? "block" : "hidden"
                } fixed top-[3.5rem] left-0  bg-black/50  h-[99rem] w-full `}
              >
                <nav className="absolute top-0 w-full left-0 h-full bg-black rounded shadow-md">
                  <ul className="flex flex-col gap-[1.62rem] p-5 ">
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
                      <Link href="/animes">Animes</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            pathname === "/" || pathname?.startsWith("/search") ? "hidden" : ""
          } flex items-center lg:hidden p-4 border-b border-t border-slate-50/60`}
        >
          <button
            className="hover:text-slate-500 text-slate-400"
            onClick={handleShowSidebar}
          >
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
            <span className="sr-only">Navigation</span>
          </button>
          <ul className="ml-4 flex text-sm leading-6 whitespace-nowrap min-w-0">
            <li
              className={`${
                pathname === "/" ? "text-white inline-block" : "hidden "
              }`}
            >
              Home
            </li>
            <li
              className={`${
                pathname?.includes("/movies")
                  ? "text-white inline-block"
                  : "hidden "
              }`}
            >
              Movies
            </li>
            <li
              className={`${
                pathname?.includes("/tv") ? "text-white inline-block" : "hidden"
              }`}
            >
              Tv Shows
            </li>
          </ul>
          <div
            className={`${
              toggleSidebar ? "block" : "hidden"
            } fixed top-0 left-0  bg-black/50  h-[100rem] w-full `}
          >
            <aside
              className="absolute top-0 w-[80%]  bg-black rounded shadow-md"
              ref={overlaySidebar}
            >
              <div className="relative overflow-y-auto overflow-sidebar h-[calc(100vh)] ">
                <div className="pb-[1rem] flex flex-col items p-5 transition-all ">
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
                    {pathname?.startsWith("/tv")
                      ? tvShowsSidebarItem.map((genre: any, index: number) => (
                          <li
                            key={index}
                            className={`border-l border-slate-800 ${
                              DropDown ? "" : "hidden"
                            } transition-all duration-500 ease-out`}
                          >
                            <Link
                              className={`hover:text-white mt-[0.75rem] text-sm pl-3`}
                              href={`/tv/genre/${
                                genre.id
                              }?name=${genre.name.replace(/\s+/g, "+")}`}
                              scroll={false}
                            >
                              {genre.name}
                            </Link>
                          </li>
                        ))
                      : pathname?.startsWith("/movies")
                      ? movieSidebaritem.map((genre: any, index: number) => (
                          <li
                            key={index}
                            className={`border-l border-slate-800 ${
                              DropDown ? "" : "hidden"
                            } transition-all duration-500 ease-out`}
                          >
                            <Link
                              className={`hover:text-white mt-[0.75rem] text-sm pl-3`}
                              href={`/movies/genre/${
                                genre.id
                              }?name=${genre.name.replace(/\s+/g, "+")}`}
                              scroll={false}
                            >
                              {genre.name}
                            </Link>
                          </li>
                        ))
                      : null}
                  </ul>
                  <h2 className="mt-[1.56rem] text-white font-semibold text-base">
                    Libary
                  </h2>
                  <ul className="transition-all pl- py-2">
                    <li
                      className={`border-l border-slate-800 transition-all duration-500 ease-out`}
                    >
                      <Link
                        className={`hover:text-white mt-[0.75rem] text-sm pl-3 text-[#828486]
                  }`}
                        href="/mylist"
                        scroll={false}
                      >
                        My List
                      </Link>
                    </li>
                  </ul>
                  <h2 className="mt-[1.81rem] text-white font-semibold text-base">
                    General
                  </h2>
                  <ul className="transition-all pl- py-2">
                    <li
                      className={`border-l border-slate-800 transition-all duration-500 ease-out`}
                    >
                      {status && status === "authenticated" ? (
                        <button
                          className=" text-sky-500 text-semibold text-sm pl-3"
                          onClick={() => signOut()}
                        >
                          Logout
                        </button>
                      ) : (
                        <button
                          className=" text-blue-500 text-sm pl-3"
                          onClick={() => signIn()}
                        >
                          Login
                        </button>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

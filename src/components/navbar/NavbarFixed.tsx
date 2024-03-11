"use client";
import {
  animeSidebarItem,
  movieSidebaritem,
  tvShowsSidebarItem,
} from "@/utils/data";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function NavbarFixed({ title }: { title?: string }) {
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState("");
  const [toggleNav, setToggleNav] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const router = useRouter();
  const overlay: any = useRef(null);
  const overlaySidebar: any = useRef(null);
  const searchFormRef: any = useRef(null);
  const inputRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const [DropDown, setDropDown] = useState(true);
  const [history, setHistory] = useState([]);
  const { data: session, status }: { data: any; status: string } =
    useSession() || {};
  const [dataState, setDataState] = useState("false");
  const selectedRef: React.RefObject<HTMLDivElement> = useRef(null);

  const handleSearchForm = async (event: any) => {
    event.preventDefault();
    try {
      setSearchValue(event.target.value);

      if (searchValue.length > 1) {
        const searchHistory = localStorage.getItem("searchHistory");
        const searchItems = searchHistory ? JSON.parse(searchHistory) : [];
        const newSearchItem = {
          id: Date.now(),
          content: searchValue,
        };
        const updatedSearchItems = [newSearchItem, ...searchItems];
        localStorage.setItem(
          "searchHistory",
          JSON.stringify(updatedSearchItems)
        );

        router.push(`/search?query=${searchValue.replace(/\s+/g, "+")}`, {
          scroll: false,
        });
        setSearchValue("");
        setDataState("close");
      } else {
        alert("Please enter at least 2 characters");
        setSearchValue("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      document.body.classList.remove("overflow-scroll");
    }
    getSearchHistory();
  };

  const getSearchHistory = () => {
    try {
      const searchHistory = localStorage.getItem("searchHistory");
      setHistory(searchHistory ? JSON.parse(searchHistory) : []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchHistory = async (content: string) => {
    try {
      router.push(`/search?query=${content.replace(/\s+/g, "+")}`, {
        scroll: false,
      });
    } catch (error) {
      console.log(error);
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
    setDataState("open");
    if (inputRef.current) inputRef.current.focus();
    document.body.classList.add("overflow-scroll");
  };

  const handleCloseSearchBar = () => {
    setDataState("close");
    document.body.classList.remove("overflow-scroll");
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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchFormRef.current &&
        !searchFormRef.current.contains(event.target)
      ) {
        setDataState("close");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dataState]);

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

  useEffect(() => {
    getSearchHistory();
  }, []);

  return (
    <>
      {dataState === "open" ? (
        <div
          data-state={dataState}
          className={`fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 w-full h-full`}
        >
          <div
            ref={searchFormRef}
            className="fixed lg:w-1/4 left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 shadow-lg duration-200 sm:rounded-lg overflow-hidden p-0"
          >
            <div className="flex flex-col bg-zinc-900 rounded-lg">
              <div className="flex items-center w-full px-3 py-3 border-b">
                <button className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    className="w-4 h-4 shrink-0"
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
                  <span className="sr-only">Form</span>
                </button>
                <form onSubmit={handleSearchForm} className="w-full">
                  <input
                    ref={inputRef}
                    className="flex items-center bg-zinc-900 w-full outline-none text-white placeholder:text-zinc-500 placeholder:font-semibold placeholder:text-sm text-sm"
                    type="text"
                    name="search"
                    placeholder="Search movies and tv"
                    onChange={(e) => setSearchValue(e.target.value)}
                    required
                  />
                </form>
                <button
                  type="button"
                  onClick={handleCloseSearchBar}
                  className="ml-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    className="w-4 h-4 shrink-0"
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
              <div className="max-h-[250px] overflow-y-auto overflow-x-hidden">
                <div className="overflow-hidden p-1 px-3 py-3">
                  <p className="text-sm text-zinc-500 font-medium">History</p>
                  <div className="mt-3 space-3">
                    {history &&
                      history.map((item: { content: string; id: number }) => (
                        <div
                          ref={selectedRef}
                          onClick={() => handleSearchHistory(item.content)}
                          key={item.id}
                          className="relative flex cursor-default select-none p-2 items-center rounded-md text-sm outline-none hover:bg-zinc-600"
                        >
                          <h1 className="text-white text-base">
                            {item.content}
                          </h1>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <nav
        className="fixed z-40 w-full backdrop-blur flex-none 
          transition-colors duration-500 lg:z-40 lg:border-b lg:border-slate-900/10
         bg-transparent 90-zoom:px-[2rem] 80-zoom:px-[3rem] 75-zoom:px-[4rem] 67-zoom:px-[7rem] 50-zoom:px-[32rem] 33-zoom:px-[82rem] 25-zoom:px-[134rem]"
      >
        <div className="flex items-center lg:px-5 px-4 py-3 w-full">
          <div className="w-full flex items-center justify-between">
            <h1 className={`font-bold text-white text-2xl`}>Santai</h1>
            <ul className="lg:flex hidden items-center gap-[1.62rem]">
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
                  pathname.startsWith("/animes")
                    ? "text-white border-b border-blue-500"
                    : "text-[#939393]"
                } font-bold text-base hover:text-white hover:border-b border-blue-500 cursor-pointer`}
              >
                <Link href="/animes">Animes</Link>
              </li>
            </ul>
            <div className="lg:flex hidden">
              <button
                type="submit"
                className="h-full p-2.5  text-sm font-medium text-white"
                onClick={handleSearchBar}
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
          </div>
          <div className="lg:hidden flex items-center ml-auto pr-2">
            <div className="relative">
              <button onClick={handleSearchBar} type="button">
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
                <span className="sr-only">search</span>
              </button>
            </div>
          </div>
          <div className="lg:hidden flex items-center justify-between">
            <div className="relative">
              {toggleNav ? (
                <button className="" onClick={handleShowNav} type="button">
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
                  <span className="sr-only">Navigation</span>
                </button>
              ) : (
                <button className="" onClick={handleShowNav} type="button">
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
                  <span className="sr-only">NavClose</span>
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
                        pathname?.startsWith("/animes")
                          ? "text-white"
                          : "text-[#939393]"
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
            type="button"
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
              className={`${pathname === "/" ? "text-white flex" : "hidden "}`}
            >
              Home
            </li>
            <li
              className={`${
                pathname?.includes("/movies")
                  ? "text-white flex items-center"
                  : "hidden "
              }`}
            >
              <Link href={"/movies"} scroll={false}>
                Movies
              </Link>
              <div className="flex items-center ml-2 justify-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                <span className="">{title}</span>
              </div>
            </li>
            <li
              className={`${
                pathname?.includes("/tv")
                  ? "text-white flex items-center"
                  : "hidden"
              }`}
            >
              <Link href={"/tv"} scroll={false}>
                Tv Shows
              </Link>
              <div className="flex items-center ml-2 justify-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                <span className="">{title}</span>
              </div>
            </li>
            <li
              className={`${
                pathname?.includes("/animes")
                  ? "text-white flex items-center"
                  : "hidden"
              }`}
            >
              <Link href="/animes" scroll={false}>
                Animes
              </Link>
              <div className="flex items-center ml-2 justify-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                <span className="">{title}</span>
              </div>
            </li>
            <li
              className={`${
                pathname?.includes("/mylist")
                  ? "text-white inline-block"
                  : "hidden"
              }`}
            >
              My List
            </li>
          </ul>
          <div
            className={`${
              toggleSidebar ? "left-0 " : "-left-[450px] opacity-0"
            } fixed top-0 bg-black/50  h-[100rem] w-full transition-all ease-in-out lg:hidden sm:hidden`}
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="8"
                      viewBox="0 0 14 8"
                      fill="none"
                      className={`ml-[0.5rem] cursor-pointer transition-all ${
                        DropDown ? "rotate-0" : "rotate-180"
                      }`}
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
                              href={`/tv/genre?id=${
                                genre.id
                              }&name=${genre.name.replace(/\s+/g, "+")}`}
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
                              href={`/movies/genre?id=${
                                genre.id
                              }&name=${genre.name.replace(/\s+/g, "+")}`}
                              scroll={false}
                            >
                              {genre.name}
                            </Link>
                          </li>
                        ))
                      : pathname?.startsWith(`/animes`)
                      ? animeSidebarItem.map((genre: any, index: number) => (
                          <li
                            key={index}
                            className={`border-l border-slate-800 ${
                              DropDown ? "" : "hidden"
                            } transition-all duration-500 ease-out`}
                          >
                            <Link
                              className={`hover:text-white mt-[0.75rem] text-sm pl-3`}
                              href={`/animes/genre?id=${
                                genre.id
                              }&name=${genre.name.replace(/\s+/g, "+")}`}
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
                      {status === "authenticated" ? (
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
      </nav>
    </>
  );
}

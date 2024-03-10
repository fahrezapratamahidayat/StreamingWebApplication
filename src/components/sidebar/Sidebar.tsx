"use client";
import { NavbarContext } from "@/context/NavbarContext";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";

const Sidebar = ({ items, params, idParams }: any) => {
  const [DropDown, setDropDown] = useState(true);
  const { data: session, status }: { data: any; status: string } =
    useSession() || {};
  const pathname = usePathname();
  const navbarContext = useContext(NavbarContext);
  const { showNavbar, setShowNavbar } = navbarContext;
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const GenreId = idParams;
  const GenreIdInteger = parseInt(GenreId);

  const handleShowSidebar = () => {
    setShowNavbar(!showNavbar);
    localStorage.setItem("UiSidebar.State", String(!showNavbar));
  }
  return (
    <>
      <div
        className={`lg:block hidden fixed z-40 top-1/2 ${
          showNavbar ? "left-[16rem] ease-in" : "left-3 ease-out"
        } right-0 transition-all ease-in-out 90-zoom:px-[2rem] 80-zoom:hidden 75-zoom:hidden 67-zoom:hidden 50-zoom:hidden 33-zoom:hidden 25-zoom:hidden`}
      >
        <button
          className=""
          onClick={handleShowSidebar}
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className=""
          >
            <path
              d="M12 5L19 12L12 19"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <aside
        className={`lg:block hidden ${
          showNavbar ? "w-[250px]" : "fixed top-0 -left-[13rem]"
        } pt-[5rem] fixed h-full lg:block transition-all ease-in-out z-40`}
      >
        <div
          className={`sidebar pb-[1rem] flex flex-col items px-5 overflow-y-auto overflow-sidebar h-[calc(100vh-5rem)] scrollbar-rounded-lg scrollbar scrollbar-track-gray-700 scrollbar-thumb-gray-900 transition-all ease-in-out bg-black 80-zoom:bg-transparent`}
        >
          <h2
            className={`text-white font-semibold text-base cursor-pointer flex items-center`}
          >
            Genre
            {DropDown ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                className="ml-[0.5rem] mt-[0.3rem] cursor-pointer transition-all"
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
                width="10"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                className="ml-[0.5rem] mt-[0.3rem] cursor-pointer transition-all"
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
            className={`font-semibold ${
              DropDown ? "mt-[0.8rem]" : ""
            } text-[#828486] transition-all pl-2`}
          >
            {items.map((genre: any, index: number) => (
              <li
                key={index}
                className={`border-l border-slate-800 ${
                  DropDown ? "block" : "hidden"
                } transition-all ease-in-out`}
              >
                <Link
                  className={`hover:text-white mt-[0.75rem] text-sm pl-3 ${
                    params === genre.name || GenreIdInteger === genre.id
                      ? "text-white"
                      : ""
                  }
                  }`}
                  href={
                    pathname?.includes("/tv")
                      ? `/tv/genre?id=${genre.id}&name=${genre.name.replace(
                          /\s+/g,
                          "+"
                        )}`
                      : pathname?.includes("/movies")
                      ? `/movies/genre?id=${genre.id}&name=${genre.name.replace(
                          /\s+/g,
                          "+"
                        )}`
                      : pathname?.includes("/animes")
                      ? `/animes/genre?id=${genre.id}&name=${genre.name.replace(
                          /\s+/g,
                          "+"
                        )}`
                      : "#"
                  }
                  onClick={handleClick}
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
          <ul className="transition-all pl-2 py-2">
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
          <ul className="transition-all pl-2 py-2">
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
      </aside>
    </>
  );
};

export default Sidebar;

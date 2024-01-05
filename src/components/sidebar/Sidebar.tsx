"use client";
import { NavbarContext } from "@/context/NavbarContext";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";

const Sidebar = ({ items }: any) => {
  const [DropDown, setDropDown] = useState(true);
  const { data: session, status }: { data: any; status: string } =
    useSession() || {};
  const pathname = usePathname();
  const navbarContext = useContext(NavbarContext);
  const { showNavbar, setShowNavbar } = navbarContext;
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <div
        className={`lg:block hidden fixed z-50 top-1/2 ${
          showNavbar ? "left-[16rem] ease-in" : "left-3 ease-out"
        } right-0 transition-all ease-in-out`}
      >
        <button className="" onClick={() => setShowNavbar(!showNavbar)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
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
      <nav
        className={`lg:block hidden ${
          showNavbar ? "w-[250px]" : "fixed top-0 -left-[13rem]"
        } pt-[5rem] fixed h-full lg:block transition-all ease-in-out`}
      >
        <div
          className={`sidebar pb-[1rem] flex flex-col items px-5 overflow-y-auto overflow-sidebar h-[calc(100vh-5rem)] scrollbar-rounded-lg scrollbar scrollbar-track-gray-700 scrollbar-thumb-gray-900 transition-all ease-in-out`}
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
            className={`font-semibold ${DropDown ? "mt-[0.8rem]" : ""} text-[#828486] transition-all pl-2`}
          >
            {items.map((genre: any,index:number) => (
              <li
                key={genre.index}
                className={`border-l border-slate-800 ${
                  DropDown ? "" : "hidden"
                } transition-all duration-500 ease-out`}
              >
                <Link
                  className={`hover:text-white mt-[0.75rem] text-sm pl-3
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

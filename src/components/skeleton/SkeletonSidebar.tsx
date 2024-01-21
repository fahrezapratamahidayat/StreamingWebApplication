"use client";
import { NavbarContext } from "@/context/NavbarContext";
import { useContext } from "react";

export default function SkeletonSidebar() {
  const navbarContext = useContext(NavbarContext);
  const { showNavbar, setShowNavbar } = navbarContext;
  return (
    <>
      <aside
        className={`lg:block hidden ${
          showNavbar ? "w-[250px]" : "fixed top-0 -left-[13rem]"
        } pt-[5rem] fixed h-full lg:block transition-all ease-in-out animate-pulse`}
      >
        <div className={`bg-slate-800 h-4 w-20 ml-4`}></div>
        <div
          className={`sidebar pb-[1rem] flex flex-col items px-5 overflow-y-auto overflow-sidebar h-[calc(100vh-5rem)] scrollbar-rounded-lg scrollbar scrollbar-track-gray-700 scrollbar-thumb-gray-900 transition-all ease-in-out`}
        >
          <ul className={`font-semibold text-[#828486] transition-all pl-2`}>
            {Array.from({ length: 16 }).map((genre: any, index: number) => (
              <li
                key={index}
                className={`border-l border-slate-800  transition-all ease-in-out`}
              >
                <div
                  className={` mt-[0.75rem] text-sm pl-3 h-[17px] w-36 bg-slate-800
                  }`}
                ></div>
              </li>
            ))}
          </ul>
          <div className="mt-[1.56rem] bg-slate-800 h-4 w-20"></div>
          <ul className="transition-all pl-2 py-2">
            <li
              className={`border-l border-slate-800 transition-all duration-500 ease-out`}
            >
              <div
                className={`mt-[0.75rem] h-[17px] w-36 bg-slate-800
                  }`}
              >
              </div>
            </li>
          </ul>
          <h2 className="mt-[1.81rem] h-[17px] w-36 bg-slate-800">
          </h2>
          <ul className="transition-all  py-2">
            <li
              className={`transition-all duration-500 ease-out h-[17px] w-36 bg-slate-800`}
            >
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

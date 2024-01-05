"use client";
import { NavbarContext } from "@/context/NavbarContext";
import { useContext, useState } from "react";

interface CardLayoutsProps {
  children: React.ReactNode;
  title?: any;
  className?: string;
  options?: Array<{ value: string; label: string }>;
  selectedOption?: string; // Tambahkan prop selectedOption
  onSelectChange?: (selectedValue: string) => void; // Tambahkan prop onSelectChange
}

export default function CardLayouts({
  children,
  title,
  className,
  options,
  selectedOption,
  onSelectChange,
}: CardLayoutsProps) {
  const navbarContext = useContext(NavbarContext);
  const { showNavbar } = navbarContext;
  const [dropDown, setDropDown] = useState(false);

  return (
    <>
      <div
        className={`pb-[2.rem] lg:pb-[2rem] transition-all ${className} ${
          showNavbar ? "ease-in" : "ease-out"
        }`}
      >
        <div className="relative w-full flex items-center">
          <h2 className="text-white font-semibold text-2xl lg:ml-0 ml-4">
            {title}
          </h2>
          {options && (
            <button className="" onClick={() => setDropDown(!dropDown)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                className="ml-[0.5rem] mt-[0.3rem] cursor-pointer transition-all"
              >
                <path
                  d="M1 1L7 7L13 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="sr-only">Sort</span>
              <div
                className={`${
                  dropDown ? "block" : "hidden"
                } transition-all duration-75 absolute top-12 lg:left-0 left-4 bg-slate-800 rounded-md z-10 w-36 shadow-lg drop-shadow-2xl`}
              >
                <ul className="transition-all py-1">
                  {options &&
                    options.map((opt) => (
                      <li
                        key={opt.value}
                        className={`
                      } transition-all text-white text-sm hover:bg-slate-900 px-3 py-2 cursor-pointer`}
                      >
                        <button
                          onClick={() =>
                            onSelectChange && onSelectChange(opt.value)
                          }
                        >
                          {opt.label}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </button>
          )}
          {/* {options && (
            <select
              id="sort by"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={selectedOption} // value prop
              onChange={(e) => onSelectChange && onSelectChange(e.target.value)}
            >
              {options &&
                options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
            </select>
          )} */}
        </div>
        <div
          className={`grid ${
            showNavbar ? "lg:grid-cols-7" : "lg:grid-cols-9"
          } grid-cols-3 lg:mx-0 mx-2 gap-2 lg:gap-[26px] mt-[18px]`}
        >
          {children}
        </div>
      </div>
    </>
  );
}

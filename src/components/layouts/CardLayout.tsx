"use client";
import { NavbarContext } from "@/context/NavbarContext";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";

interface CardLayoutsProps {
  children: React.ReactNode;
  title?: any;
  className?: string;
  options?: Array<{ value: string; label: string; params: string }>;
  selectedOption?: string;
  onSelectChange?: (selectedValue: string) => void;
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
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div
        className={`pb-[2.rem] lg:pb-[2rem] transition-all ${className} ${
          showNavbar ? "ease-in" : "ease-out"
        }`}
      >
        <div className="relative w-full flex items-center">
          <h2 className="text-white font-semibold text-2xl lg:ml-0 ml-2">
            {title}
          </h2>
          <div
            className={`ml-[auto] lg:pr-0 pr-2 relative ${
              pathname?.startsWith("/tv/genre") ||
              pathname?.startsWith("/movie/genre")
                ? " hidden"
                : ""
            }`}
          >
            <button
              className="relative bg-[#3F3F46] flex items-center lg:w-60 w-52 h-[40px] justify-between p-3 rounded-lg text-sm text-white"
              onClick={() => setDropDown(!dropDown)}
            >
              <span className="pt-1">{label}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 25"
                fill="none"
                className={`${
                  dropDown ? "rotate-180" : "rotate-0"
                } transition-all absolute right-2`}
              >
                <path
                  d="M6 9.5L12 15.5L18 9.5"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <label
              htmlFor=""
              className={`absolute text-sm mt-1 ${
                label !== "" ? "scale-75 top-4 -translate-y-5" : ""
              } text-gray-500 dark:text-gray-400 duration-300 transform top-2 z-10 origin-[0] start-3 peer-focus:text-blue-500 peer-focus:dark:text-blue-500  peer-placeholder-shown:translate-y-0 rtl:peer-focus:left-auto`}
            >
              Sort by
            </label>
            <div
              className={`${
                dropDown ? "" : "hidden"
              } duration-75 absolute bg-[#18181B] top-14 bg- w-full z-50 rounded-lg`}
            >
              <ul className="p-2">
                {options &&
                  options.map((opt) => (
                    <li
                      key={opt.value}
                      role="option"
                      className={`hover:bg-[#3F3F46] cursor-pointer text-white text-sm p-2 rounded-lg flex items-center justify-between`}
                      onClick={() => {
                        onSelectChange && onSelectChange(opt.value);
                        setLabel(opt.label);
                        if (opt.label === "Now Playing") {
                          router.push("/movies");
                        } else {
                          const basePath =
                            pathname === "/movies" ? "/movies" : "/tv";
                          const queryParam = opt.params
                            ? `?sort=${opt.params}`
                            : "";
                          router.push(`${basePath}${queryParam}`);
                        }
                      }}
                    >
                      {(pathname === "/movies" &&
                        opt.label === "Now Playing") ||
                      (pathname === "/tv" && opt.label === "Popular")
                        ? opt.label + " : Default"
                        : opt.label}
                      {opt.label == label ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      ) : (
                        ""
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`lg:flex flex-wrap grid md:flex grid-cols-3 ${
            showNavbar ? "lg:gap-5" : "lg:gap-4"
          } md:gap-1 mt-[18px] min-[400px]:flex max-[767px]:flex min-[400px]:gap-1 max-[767px]:gap-1 min-[400px]:ml-4 lg:ml-0 ml-2`}
        >
          {children}
        </div>
      </div>
    </>
  );
}

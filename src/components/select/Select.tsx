"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Variants, motion } from "framer-motion";

interface SelectProps {
  options: Array<{ value: string; label: string }>;
  onSelectChange?: (selectedValue: string) => void;
  nameTv: string;
  slug: string;
  className?: string;
}

export default function Select({
  options,
  onSelectChange,
  nameTv,
  slug,
  className,
}: SelectProps) {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("");
  const router = useRouter();
  const selectRef: any = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropDown]);

  const variant = {
    open: {
      clipPath: "inset(0% 0% 0% 0% round 10px)",
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.7,
        delayChildren: 0.3,
        staggerChildren: 0.05,
      },
    },
    closed: {
      clipPath: "inset(10% 50% 90% 50% round 10px)",
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.3,
      },
    },
  };
  return (
    <>
      <motion.div
        initial={false}
        animate={dropDown ? "open" : "closed"}
        className={`lg:pr-0 pr-1.5 rounded-lg relative ${className}`}
      >
        <button
          className="relative bg-[#3F3F46] flex items-center lg:w-60 sm:w-52 w-full h-[40px] justify-between p-3 rounded-lg text-sm text-white"
          onClick={() => setDropDown(!dropDown)}
          id="test"
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
          htmlFor="dropdown"
          onClick={() => setDropDown(!dropDown)}
          className={`absolute text-sm mt-1 cursor-pointer ${
            label !== "" ? "scale-75 top-4 -translate-y-5" : ""
          } text-gray-500 dark:text-gray-400 duration-300 transform top-2 z-10 origin-[0] start-3 peer-focus:text-blue-500 peer-focus:dark:text-blue-500  peer-placeholder-shown:translate-y-0 rtl:peer-focus:left-auto`}
        >
          Select Seasons
        </label>
        <motion.ul
          animate={dropDown ? "open" : "closed"}
          variants={variant}
          className={`absolute bg-[#18181B] top-14 bg- w-full z-50 rounded-lg p-2`}
        >
          {options.map((opt, index: number) => (
            <motion.li
              ref={selectRef}
              animate={dropDown ? "open" : "closed"}
              variants={{
                open: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                    delay: index * 0.1,
                  },
                },
                closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
              }}
              key={opt.value}
              role="option"
              aria-selected
              className={`hover:bg-[#3F3F46] cursor-pointer text-white text-sm p-2 rounded-lg flex items-center justify-between`}
              onClick={() => {
                onSelectChange && onSelectChange(opt.value);
                setLabel(opt.label);
                setDropDown(false);
                router.push(
                  `/tv/${slug}/watch?q=${nameTv.replace(/\s+/g, "+")}&season=${
                    opt.value
                  }`
                );
              }}
            >
              {opt.label}{" "}
              {opt.label === label ? (
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                ""
              )}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </>
  );
}

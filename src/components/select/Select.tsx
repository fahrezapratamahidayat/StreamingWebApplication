"use client";
import { useState } from "react";

interface SelectProps {
    options: Array<{ value: string; label: string }>;
    onSelectChange: (selectedValue: string) => void;
}

export default function Select({options, onSelectChange}: SelectProps) {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("");
  return (
    <>
      <div className="ml-12 lg:ml-auto relative">
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
                  }}
                >
                  {opt.label === "Now Playing"
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
    </>
  );
}

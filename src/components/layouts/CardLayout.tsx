"use client";
import { NavbarContext } from "@/context/NavbarContext";
import { useContext, useState } from "react";

interface CardLayoutsProps {
  children: React.ReactNode;
  title?: any;
  className?: string;
  options?: Array<{ value: string; label: string }>;
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
            <select
              id="sort by"
              className="`"
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
          )}
        </div>
        <div
          className={`lg:flex flex-wrap grid md:flex grid-cols-3 ${showNavbar ? "lg:gap-5" : "lg:gap-4"} md:gap-1 mt-[18px] min-[400px]:flex max-[767px]:flex min-[400px]:gap-1 max-[767px]:gap-1 min-[400px]:ml-4 lg:ml-0`}
        >
          {children}
        </div>
      </div>
    </>
  );
}

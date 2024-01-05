"use client";
import { NavbarContext } from "@/context/NavbarContext";
import { useContext } from "react";

export default function CardShowMoreLayouts({
  children,
  title,
  className = "",
}: {
  children: any;
  title?: any;
  className?: string;
}) {
  const navbarContext = useContext(NavbarContext);
  const { showNavbar } = navbarContext;
  return (
    <>
      <div
        className={`pb-[2.rem] lg:pb-[2rem] transition-all ${className} ${
          showNavbar ? "ease-in" : "ease-out"
        }`}
      >
        <h2 className="text-white font-semibold text-2xl lg:mx-0 mx-2">
          {title}
        </h2>
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

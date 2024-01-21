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
        <div
          className={`lg:flex flex-wrap grid md:flex grid-cols-3  ${showNavbar ? "lg:gap-5" : "lg:gap-4"} md:gap-1 mt-[18px] min-[400px]:flex max-[767px]:flex min-[400px]:gap-1 max-[767px]:gap-1 min-[400px]:ml-4 lg:ml-0 `}
        >
          {children}
        </div>
      </div>
    </>
  );
}

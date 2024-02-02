"use client";
import { NavbarContext } from "@/context/NavbarContext";
import { useContext } from "react";

export default function CardShowMoreLayouts({
  children,
  className,
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
          className={`lg:flex flex-wrap grid md:flex sm:grid-cols-5 grid-cols-3 ${
            showNavbar ? "lg:gap-5" : "lg:gap-4"
          } md:gap-1 mt-[18px] gap-2 mx-2 lg:mx-0`}
        >
          {children}
        </div>
      </div>
    </>
  );
}

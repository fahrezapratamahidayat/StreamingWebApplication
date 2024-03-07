"use client";

import { NavbarContext } from "@/context/NavbarContext";
import { useContext } from "react";

export default function AnimeSynopsis({ synopsis }: { synopsis: string }) {
  const navbarContext = useContext(NavbarContext);
  const { showNavbar } = navbarContext;
  return (
    <p
      className={`transition-all overflow-y-auto overflow-overview  ${
        showNavbar
          ? "lg:w-auto lg:h-[17rem]"
          : "lg:w-auto lg:h-[17rem]"
      } w-auto lg:h-[17rem] h-[12rem] min-[440px]:h-[16rem] md:w-auto md:h-[35rem] sm:w-full sm:h-[35rem] flex-shrink-0 text-slate-300 text-sm font-semibold mt-[1.21rem] tracking-[-0.01em] text-justify `}
    >
      {synopsis}
    </p>
  );
}

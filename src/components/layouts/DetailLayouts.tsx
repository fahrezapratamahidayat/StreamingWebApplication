"use client";

import { NavbarContext } from "@/context/NavbarContext";
import { useContext } from "react";

export default function DetailLayouts({ children }: { children: React.ReactNode }) {
  const navbarContext = useContext(NavbarContext);
  const { showNavbar } = navbarContext;
  return (
    <>
      <div
        className={`flex flex-col ${
          showNavbar ? "lg:ml-[19rem]" : "lg:ml-[3rem]"
        } pb-[5rem] pt-[4rem] lg:pt-0 transition-all`}
      >
        <div className="mt-[5rem] ">
            {children}
        </div>
      </div>
    </>
  );
}

'use client'
import { NavbarContext } from "@/context/NavbarContext";
import {  useContext } from "react";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const navbarContext = useContext(NavbarContext);
  const { showNavbar } = navbarContext;
  return (
    <>
      <div
        className={`flex flex-col ${
          showNavbar
            ? "lg:ml-[19rem] transition-all ease-in"
            : "lg:ml-[3rem] transition-all ease-out"
        } pt-[4rem] lg:pt-0 lg:mr-5`}
      >
        <div className="mt-[5rem]">{children}</div>
      </div>
    </>
  );
}

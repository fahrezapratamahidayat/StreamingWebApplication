"use client";
import { NavbarContext } from "@/context/NavbarContext";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export default function PageLayout({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug?: string;
}) {
  const navbarContext = useContext(NavbarContext);
  const { showNavbar } = navbarContext;
  const pathname = usePathname();
  return (
    <>
      <div
        className={`flex flex-col ${
          showNavbar
            ? "lg:ml-[19rem] transition-all ease-in"
            : `${
                pathname === `/tv` || pathname === `/movies`
                  ? "lg:ml-[3rem]"
                  : "lg:ml-[1.2rem] "
              } transition-all ease-out`
        } pb-[5rem] pt-[4rem] lg:pt-0 lg:mr-5 `}
      >
        <div className="mt-[5rem]">{children}</div>
      </div>
    </>
  );
}

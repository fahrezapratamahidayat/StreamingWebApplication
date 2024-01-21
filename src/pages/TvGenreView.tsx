"use client";
import LoadMore from "@/components/button/LoadMore";
import CardPosterTvShows from "@/components/card/CardPosterTvShows";
import CardLayouts from "@/components/layouts/CardLayout";
import Sidebar from "@/components/Sidebar/Sidebar";
import { NavbarContext } from "@/context/NavbarContext";
import { FetchingData, fetchData} from "@/services/DataApi";
import { tvShowsSidebarItem } from "@/utils/data";
import { Children, useContext, useEffect, useState } from "react";

export default function TvGenreView({params, children} : {params: string, children: React.ReactNode} ) {
  const navbarContext = useContext(NavbarContext);
  const { showNavbar, setShowNavbar } = navbarContext;

  return (
    <>
      <Sidebar items={tvShowsSidebarItem} />
      <div className={`flex flex-col ${
          showNavbar
            ? "lg:ml-[19rem] transition-all ease-in"
            : "lg:ml-[4rem] transition-all ease-out"
        } pt-[4rem] lg:pt-0 lg:mr-5`}>
        <div className="mt-[5rem]">
          {children}
        </div>
      </div>
    </>
  );
}

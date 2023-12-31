"use client";
import CardPosterTvShows from "@/components/card/CardPosterTvShows";
import { NavbarContext } from "@/context/NavbarContext";
import { FetchingData, fetchData } from "@/services/DataApi";
import { useContext, useEffect, useState } from "react";

export default function TvShowsView({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState([]);
  const navbarContext = useContext(NavbarContext);
  const { showNavbar, setShowNavbar } = navbarContext;

  return (
    <>
      <div
        className={`flex flex-col ${
          showNavbar
            ? "lg:ml-[19rem] transition-all ease-in"
            : "lg:ml-[4rem] transition-all ease-out"
        } pt-[5rem] lg:pt-0`}
      >
        <div className="mt-[5rem]">{children}</div>
      </div>
    </>
  );
}

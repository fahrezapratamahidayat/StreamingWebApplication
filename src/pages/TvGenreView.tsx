"use client";
import LoadMore from "@/components/button/LoadMore";
import CardPosterTvShows from "@/components/card/CardPosterTvShows";
import CardLayouts from "@/components/layouts/CardLayout";
import Sidebar from "@/components/sidebar/Sidebar";
import { NavbarContext } from "@/context/NavbarContext";
import { FetchingData, fetchData} from "@/services/DataApi";
import { tvShowsSidebarItem } from "@/utils/data";
import { Children, useContext, useEffect, useState } from "react";

export default function TvGenreView({params, children} : {params: string, children: React.ReactNode} ) {
  const navbarContext = useContext(NavbarContext);
  const { showNavbar, setShowNavbar } = navbarContext;
  // const [movie, setMovies] = useState<any>([]);
  // const fetchDataAsync = async () => {
  //   const data = await fetchData(
  //     `discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${10759}`
  //   );
  //   console.log(data.results)
  // };

  // useEffect(() => {
  //   fetchDataAsync();
  // }, []);

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

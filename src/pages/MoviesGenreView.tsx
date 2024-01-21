"use client";
import CardPoster from "@/components/card/CardPosterMovies";
import Sidebar from "@/components/Sidebar/Sidebar";
import { movieSidebaritem } from "@/utils/data";
import { fetchData } from "@/services/DataApi";
import { useContext, useEffect, useState, } from "react";
import { NavbarContext } from "@/context/NavbarContext";

type Movies = {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
    original_title: string;
  };

export default function MoviesGenreView({params,children} : {params:string,children:React.ReactNode}) {
  const navbarContext = useContext(NavbarContext);
  const { showNavbar, setShowNavbar } = navbarContext;
  // const [movies,setMovies] = useState<any>([]);

  // const fetchDataAsync = async () => {
  //   const data = await fetchData(`discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${params}`);
  //   setMovies(data.results);
  // };

  // useEffect(() => {
  //   fetchDataAsync();
  // },[])

  let title;
  if (params === "28") {
    title = "Action";
  } else if (params === "16") {
    title = "Animation";
  } else if (params === "16") {
    title = "Animation";
  } else if (params === "35") {
    title = "Comedy";
  } else if (params === "80") {
    title = "Crime";
  } else if (params === "99") {
    title = "Documentary";
  } else if (params === "18") {
    title = "Drama";
  } else if (params === "10751") {
    title = "Family";
  } else if (params === "14") {
    title = "Fantasy";
  } else if (params === "36") {
    title = "History";
  } else if (params === "27") {
    title = "Horror";
  } else if (params === "10402") {
    title = "Music";
  } else if (params === "9648") {
    title = "Mystery";
  } else if (params === "1079") {
    title = "Romance";
  } else if (params === "878") {
    title = "Science Fiction";
  } else if (params === "53") {
    title = "Thriller";
  } else if (params === "10752") {
    title = "War";
  } else if (params === "37") {
    title = "Western";
  } else if (params === "12") {
    title = "Adventure";
  } else title = "";
  
  return (
    <>
      <Sidebar items={movieSidebaritem}/>
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

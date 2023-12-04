"use client";
import CardPoster from "@/components/card/CardPosterMovies";
import Sidebar from "@/components/sidebar/Sidebar";
import { MovieContext } from "@/context/DataMovies";
import { movieSidebaritem } from "@/utils/ItemSidebar";
import { fetchData } from "@/services/DataApi";
import axios from "axios";
import { useEffect, useState, useContext } from "react";

type genrePageProps = {
  params: {
    genre: string;
  };
};

type Movies = {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
    original_title: string;
  };

export default function GenrePage(props: genrePageProps) {
  const { params } = props;
  const [movies,setMovies] = useState<any>([]);

  const fetchDataAsync = async () => {
    const data = await fetchData(`discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${params.genre}`);
    setMovies(data.results);
  };

  useEffect(() => {
    fetchDataAsync();
  },[])

  let title;
  if (params.genre === "28") {
    title = "Action";
  } else if (params.genre === "16") {
    title = "Animation";
  } else if (params.genre === "16") {
    title = "Animation";
  } else if (params.genre === "35") {
    title = "Comedy";
  } else if (params.genre === "80") {
    title = "Crime";
  } else if (params.genre === "99") {
    title = "Documentary";
  } else if (params.genre === "18") {
    title = "Drama";
  } else if (params.genre === "10751") {
    title = "Family";
  } else if (params.genre === "14") {
    title = "Fantasy";
  } else if (params.genre === "36") {
    title = "History";
  } else if (params.genre === "27") {
    title = "Horror";
  } else if (params.genre === "10402") {
    title = "Music";
  } else if (params.genre === "9648") {
    title = "Mystery";
  } else if (params.genre === "1079") {
    title = "Romance";
  } else if (params.genre === "878") {
    title = "Science Fiction";
  } else if (params.genre === "53") {
    title = "Thriller";
  } else if (params.genre === "10752") {
    title = "War";
  } else if (params.genre === "37") {
    title = "Western";
  } else if (params.genre === "12") {
    title = "Adventure";
  } else title = "";
  

  
  return (
    <>
      <Sidebar items={movieSidebaritem}/>
      <div className="flex flex-col ml-[21rem] w-auto h-auto">
        <div className="mt-[5rem]">
        {movies && (
            <CardPoster data={movies} title={`Genre : ${title}`} />
        )}
        </div>
      </div>
    </>
  );
}

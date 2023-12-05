"use client"

import CardPosterTvShows from "@/components/card/CardPosterTvShows";
import Sidebar from "@/components/sidebar/Sidebar";
import { fetchData } from "@/services/DataApi";
import { tvShowsSidebarItem } from "@/utils/ItemSidebar";
import { useEffect, useState } from "react";

type tvGenrePageProps = {
  params: {
    genre: string;
  };
  genre: string;
};
export default function tvGenrePage(props: tvGenrePageProps) {
  const { params } = props;
  const [movie, setMovies] = useState<any>([]);

  const fetchDataAsync = async () => {
    const data = await fetchData(
      `discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${params.genre}`
    );
    setMovies(data.results);
  };

  useEffect(() => {
    fetchDataAsync();
  }, []);

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
      <Sidebar items={tvShowsSidebarItem} />
      <div className="ml-[21rem] mt-[5rem]">
        {movie && (
            <CardPosterTvShows title={`Genre : ${title}`} data={movie}/>
        )}
      </div>
    </>
  );
}

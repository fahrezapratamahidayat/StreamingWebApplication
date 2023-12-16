"use client";
import CardPosterTvShows from "@/components/card/CardPosterTvShows";
import Sidebar from "@/components/sidebar/Sidebar";
import { FetchingData} from "@/services/DataApi";
import { tvShowsSidebarItem } from "@/utils/ItemSidebar";
import { useEffect, useState } from "react";

export default function TvGenreView({params} : {params: string}) {
  const [movie, setMovies] = useState<any>([]);
  const fetchDataAsync = async () => {
    const data = await FetchingData(
      `discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${params}`
    );
    setMovies(data.results);
  };

  useEffect(() => {
    fetchDataAsync();
  }, []);

  let title;
  if (params === "10759") {
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
      <Sidebar items={tvShowsSidebarItem} />
      <div className="flex flex-col lg:ml-[20rem] lg:pt-0 pt-[4rem]">
        <div className="mt-[5rem]">
          {movie && (
            <CardPosterTvShows title={`Genre : ${title}`} data={movie} />
          )}
        </div>
      </div>
    </>
  );
}

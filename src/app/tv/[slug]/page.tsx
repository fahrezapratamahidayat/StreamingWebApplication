"use client";
import CardVideo from "@/components/card/cardVideo";
import ListDirector from "@/components/fragments/ListDirector";
import ListStaring from "@/components/fragments/ListStaring";
import Sidebar from "@/components/sidebar/Sidebar";
import TvShowDetailView from "@/pages/TvShowDetailView";
import { fetchData } from "@/services/DataApi";
import { tvShowsSidebarItem } from "@/utils/ItemSidebar";
import { useEffect, useState } from "react";

type TvShowDetailPageProps = {
  params: {
    slug: string;
  };
};

type TvShowProps = {
  id: number;
  original_name: string;
  name: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  popularity: number;
  first_air_date: string;
  episode_run_time: number[];
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  genres: { id: number; name: string }[];
  number_of_seasons: number;
  video: string;
  results: { id: string; name: string; key: string }[];
  cast: { id: number; name: string; job: string; character: string }[];
  crew: { id: number; name: string; job: string }[];
};
export default function TvShowDetailPage(props: TvShowDetailPageProps) {
  const [data, setData] = useState<TvShowProps | null>( null );
  const [dataVideos,setDataVideos] = useState<TvShowProps | null>(null)
  const [credits,setCredits] = useState<TvShowProps | null>(null)
  const { params } = props;

  const fetchDataAsync = async () => {
    const data = await fetchData(`tv/${params.slug}`);
    setData(data);
  };

  const fetchDataVideo = async () => {
    const data = await fetchData(`tv/${params.slug}/videos`);
    setDataVideos(data);
  }

  const fetchCredits = async () => {
    const data = await fetchData(`tv/${params.slug}/credits`);
    console.log(data);
    setCredits(data);
  };

  const videoList = dataVideos?.results.map((video) => (
    <CardVideo key={video.id} keyVideo={video.key} title={video.name} />
  ));

  const castList = credits?.cast
  .slice(0, 12)
  .map((cast, index) => (
    <ListStaring
      key={index}
      nameCast={cast.name}
      jobCast={cast.character}
    />
  ));

  const crewList = credits?.crew
  .filter(
    (actor) =>
      actor.job === "Novel" ||
      actor.job === "Director" ||
      actor.job === "Writer"
  )
  .map((actor, index) => (
    <ListDirector
      key={index}
      nameDirector={actor.name}
      jobDirector={actor.job}
    />
  ));



  useEffect(() => {
    fetchDataAsync();
    fetchDataVideo()
    fetchCredits();
  }, []);
  return (
    <>
      <Sidebar items={tvShowsSidebarItem} />
      {data && data.backdrop_path && data.poster_path ? (
        <TvShowDetailView
        backdrop_path={data?.backdrop_path}
        poster_path={data?.poster_path}
        original_name={data?.name}
        episode_run_time={data?.episode_run_time}
        overview={data?.overview}
        first_air_date={data?.first_air_date.substr(0, 4)}
        vote_average={data?.vote_average.toFixed(1)}
        vote_count={data?.vote_count}
        season_number={data?.number_of_seasons}
        video={videoList}
        crew={crewList}
        cast={castList}
        genres={data?.genres.map(
          (genre: { id: number; name: string }) => genre.name
        ).join(", ")}
        />
      ) : (
        <div className="">Objek kosong atau terjadi kesalahan</div>
      )}
    </>
  );
}
